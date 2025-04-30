from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from PIL import Image
import io
from torchvision import transforms, models, datasets
import json
import os
from recycling_centers import search_recycling_centers

app = Flask(__name__)
CORS(app)

# Initialize the model architecture with correct number of classes
model = None
try:
    print("Starting model initialization...")
    # Create a GoogleNet with 52 output classes and aux_logits=False
    model = models.googlenet(pretrained=False, aux_logits=False, num_classes=52)
    print("Model architecture created successfully")
    
    # Load the state dictionary
    model_path = 'googlenet_trained2.pth'
    if not os.path.exists(model_path):
        print(f"Error: Model file not found at {model_path}")
        raise FileNotFoundError(f"Model file not found at {model_path}")
        
    print(f"Loading model weights from {model_path}")
    state_dict = torch.load(model_path, map_location=torch.device('cpu'))
    model.load_state_dict(state_dict)
    print("State dictionary applied to model")
    
    model.eval()
    print("Model set to evaluation mode")
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    print(f"Error type: {type(e)}")
    import traceback
    print(f"Traceback: {traceback.format_exc()}")
    model = None

# Load dataset to get correct class names
try:
    print("Loading dataset to get class names...")
    dataset_path = r"C:\Users\deep0\OneDrive\Desktop\UPES\Project\WASTE DATASET"
    dataset = datasets.ImageFolder(root=dataset_path)  # No transform needed
    class_names = dataset.classes
    class_to_idx = dataset.class_to_idx
    idx_to_class = {v: k for k, v in class_to_idx.items()}
    print("✅ Available class indices:", idx_to_class)
    print("Dataset loaded successfully!")
except Exception as e:
    print(f"Error loading dataset: {str(e)}")
    print(f"Error type: {type(e)}")
    import traceback
    print(f"Traceback: {traceback.format_exc()}")
    # Fallback to hardcoded class labels if dataset loading fails
    class_labels = [
        "BT", "GE", "ME", "OW", "PE", "PP", "SN", "aerosol_cans", "aluminum_food_cans", "aluminum_soda_cans",
        "Battery", "cardboard_boxes", "cardboard_packaging", "clothing", "coffee_grounds", "disposable_plastic_cutlery",
        "eggshells", "food_waste", "Gauze", "glass_beverage_bottles", "glass_cosmetic_containers", "glass_food_jars",
        "Gloves", "Keyboard", "magazines", "Mask", "Microwave", "Mobile", "Mouse", "newspaper", "office_paper",
        "paper_cups", "PCB", "plastic_cup_lids", "plastic_detergent_bottles", "plastic_food_containers",
        "plastic_shopping_bags", "plastic_soda_bottles", "plastic_straws", "plastic_trash_bags", "plastic_water_bottles",
        "Player", "Printer", "shoes", "steel_food_cans", "styrofoam_cups", "styrofoam_food_containers", "Syringe",
        "tea_bags", "Television", "Tweezers", "Washing Machine"
    ]
    idx_to_class = {i: label for i, label in enumerate(class_labels)}
    print("Using fallback class labels")

# Define image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                        std=[0.229, 0.224, 0.225])
])

# Load recycling guidelines
guidelines_data = None
try:
    guidelines_path = 'recycling_guidelines.json'
    if not os.path.exists(guidelines_path):
        print(f"Error: Guidelines file not found at {guidelines_path}")
        raise FileNotFoundError(f"Guidelines file not found at {guidelines_path}")
        
    with open(guidelines_path, 'r') as f:
        guidelines_data = json.load(f)
    print("Guidelines loaded successfully!")
except Exception as e:
    print(f"Error loading guidelines: {str(e)}")
    print(f"Error type: {type(e)}")
    import traceback
    print(f"Traceback: {traceback.format_exc()}")
    guidelines_data = None

@app.route('/test', methods=['GET'])
def test():
    return jsonify({
        'status': 'success',
        'message': 'Backend is running!',
        'model_loaded': model is not None,
        'guidelines_loaded': guidelines_data is not None,
        'model_path_exists': os.path.exists('googlenet_trained2.pth'),
        'guidelines_path_exists': os.path.exists('recycling_guidelines.json')
    })

@app.route('/classify', methods=['POST'])
def classify_image():
    if model is None:
        return jsonify({'error': 'Model not loaded. Check server logs for details.'}), 500

    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    try:
        # Get image from request
        image_file = request.files['image']
        image = Image.open(io.BytesIO(image_file.read())).convert("RGB")
        
        # Preprocess image
        image_tensor = transform(image).unsqueeze(0)
        
        # Get prediction
        with torch.no_grad():
            device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            model.to(device)
            image_tensor = image_tensor.to(device)
            
            output = model(image_tensor)
            predicted_class_idx = output.argmax(dim=1).item()
            confidence = torch.nn.functional.softmax(output, dim=1)[0][predicted_class_idx] * 100
        
        # Get class name
        predicted_class_name = idx_to_class.get(predicted_class_idx, f"Unknown Class {predicted_class_idx}")
        
        return jsonify({
            'class': predicted_class_name,
            'confidence': float(confidence)
        })
        
    except Exception as e:
        print(f"Error during classification: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500

@app.route('/guidelines/<class_name>', methods=['GET'])
def get_guidelines(class_name):
    if guidelines_data is None:
        return jsonify({'error': 'Guidelines not loaded. Check server logs for details.'}), 500
    
    try:
        # Convert class name to match guidelines format
        formatted_class_name = class_name.lower()
        
        # Get guidelines for the class
        guidelines = guidelines_data['guidelines'].get(formatted_class_name)
        
        if guidelines is None:
            # If not found, try to find a matching category
            for key in guidelines_data['guidelines']:
                if key.lower() == formatted_class_name:
                    guidelines = guidelines_data['guidelines'][key]
                    break
        
        if guidelines is None:
            # If still not found, return default guidelines
            guidelines = {
                'title': f'Guidelines for {formatted_class_name}',
                'steps': ['Please check local recycling guidelines for this item.'],
                'tips': 'Contact your local recycling center for specific instructions.'
            }
        
        return jsonify(guidelines)
        
    except Exception as e:
        print(f"Error getting guidelines: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/all-guidelines', methods=['GET'])
def get_all_guidelines():
    if guidelines_data is None:
        return jsonify({'error': 'Guidelines not loaded. Check server logs for details.'}), 500
    
    try:
        return jsonify(guidelines_data['guidelines'])
    except Exception as e:
        print(f"Error getting all guidelines: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/recycling-centers', methods=['POST'])
def find_recycling_centers():
    try:
        data = request.get_json()
        location = data.get('location', '').strip()
        
        if not location:
            return jsonify({'error': 'Location is required'}), 400
            
        result = search_recycling_centers(location)
        
        if result['status'] == 'error':
            return jsonify({'error': result['message']}), 500
            
        return jsonify(result)
        
    except Exception as e:
        print(f"Error finding recycling centers: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Check if model and guidelines files exist
    if not os.path.exists('googlenet_trained2.pth'):
        print("Warning: Model file not found!")
    if not os.path.exists('recycling_guidelines.json'):
        print("Warning: Guidelines file not found!")
    
    app.run(debug=True, port=5000) 