
import User from '@/models/database/User';

// Login user
export const loginUser = async (email: string, password: string) => {
  try {
    // In a real app, password should be hashed and compared
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'name', 'email', 'role'] 
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // For demo purposes, we'll just return the user
    // In production, verify password and generate JWT token
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register user
export const registerUser = async (name: string, email: string, password: string) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // In a real app, password should be hashed before storing
    const user = await User.create({
      name,
      email,
      password, // Should be hashed in production
      role: 'user',
    });
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
