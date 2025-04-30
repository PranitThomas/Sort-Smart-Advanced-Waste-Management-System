import requests
import pandas as pd

def search_recycling_centers(location):
    """
    Search for recycling centers in a given location using SerpAPI.
    
    Args:
        location (str): The location to search for recycling centers
        
    Returns:
        dict: A dictionary containing the results and status
    """
    try:
        # Step 1: Prepare the query
        query = f"recycling centers in {location}"
        
        # Step 2: SerpAPI configuration
        api_key = "4923844b3957fd24eb44a7e4b69cf31b1bb3df227fd0797a5a8c84b7533201b9"
        params = {
            "engine": "google_maps",
            "q": query,
            "type": "search",
            "api_key": api_key
        }
        
        # Step 3: Send request and process response
        response = requests.get("https://serpapi.com/search", params=params)
        data = response.json()
        
        results = []
        for r in data.get("local_results", []):
            # Create Google Maps link using coordinates
            lat = r.get("gps_coordinates", {}).get("latitude")
            lon = r.get("gps_coordinates", {}).get("longitude")
            google_maps_link = f"https://www.google.com/maps?q={lat},{lon}" if lat and lon else None
            
            results.append({
                "name": r.get("title"),
                "address": r.get("address"),
                "rating": r.get("rating"),
                "lat": lat,
                "lon": lon,
                "maps_link": r.get("link"),
                "google_maps_link": google_maps_link
            })
        
        # Step 4: Create DataFrame and save to CSV
        df = pd.DataFrame(results)
        filename = f"recycling_centers_{location.replace(' ', '_').lower()}.csv"
        df.to_csv(filename, index=False)
        
        return {
            "status": "success",
            "results": results,
            "csv_file": filename
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        } 