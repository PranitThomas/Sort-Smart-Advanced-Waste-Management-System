// Function to initialize user storage
const initializeUserStorage = () => {
    try {
        console.log('Initializing user storage...');
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
            console.log('User storage initialized');
        }
        return true;
    } catch (error) {
        console.error('Error initializing user storage:', error);
        return false;
    }
};

// Function to read users from storage
const readUsers = () => {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        console.log('Found users:', users);
        return users;
    } catch (error) {
        console.error('Error reading users:', error);
        return [];
    }
};

// Function to write user to storage
const writeUser = (userData) => {
    try {
        console.log('Writing new user:', userData);
        const users = readUsers();
        const newUser = {
            ...userData,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('User added successfully:', newUser);
        return true;
    } catch (error) {
        console.error('Error writing user:', error);
        return false;
    }
};

// Function to check if user exists
const checkUserExists = (email) => {
    const users = readUsers();
    const exists = users.some(user => user.email === email);
    console.log('Checking if user exists:', { email, exists });
    return exists;
};

// Function to validate user credentials
const validateUser = (email, password) => {
    const users = readUsers();
    const user = users.find(user => user.email === email && user.password === password);
    console.log('Validating user:', { email, found: !!user });
    return user;
};

export {
    initializeUserStorage as initializeExcelFile,
    readUsers,
    writeUser,
    checkUserExists,
    validateUser
}; 