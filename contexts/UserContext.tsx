import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto';

export interface UserData {
  id?: string;
  nationalIdOrPassport: string;
  fullName: string;
  mobileNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  email: string;
  passwordHash?: string; // Store hashed password
  whereDidYouHearAboutUs: string;
  profileImage?: string;
  memberSince?: string;
  isLoggedIn: boolean;
}

interface UserContextType {
  userData: UserData | null;
  saveUserData: (data: Omit<UserData, 'passwordHash'> & { password: string }) => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  clearUserData: () => Promise<void>;
  verifyPassword: (password: string) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = '@user_data';

// Function to hash password
const hashPassword = async (password: string): Promise<string> => {
  try {
    // Add salt to make the hash more secure
    const salt = 'YourAppSecretSalt2024'; // In production, use a more complex salt
    const saltedPassword = password + salt;
    const hashedPassword = await digestStringAsync(
      CryptoDigestAlgorithm.SHA256,
      saltedPassword
    );
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on app start
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        console.log('User data loaded successfully');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserData = async (data: Omit<UserData, 'passwordHash'> & { password: string }) => {
    try {
      // Hash the password before saving
      const hashedPassword = await hashPassword(data.password);
      
      const dataToSave: UserData = {
        ...data,
        passwordHash: hashedPassword,
        id: data.id || Date.now().toString(),
        memberSince: data.memberSince || new Date().toISOString(),
        isLoggedIn: true,
      };

      // Remove the plain password from the object
      const { password, ...dataWithoutPassword } = data;
      const finalData = { ...dataWithoutPassword, ...dataToSave };
      
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(finalData));
      setUserData(finalData);
      console.log('User data saved successfully with hashed password');
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  };

  const updateUserData = async (data: Partial<UserData>) => {
    try {
      if (!userData) return;
      
      const updatedData = { ...userData, ...data };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedData));
      setUserData(updatedData);
      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  const verifyPassword = async (password: string): Promise<boolean> => {
    try {
      if (!userData?.passwordHash) {
        return false;
      }
      
      const hashedInputPassword = await hashPassword(password);
      return hashedInputPassword === userData.passwordHash;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      if (!userData) {
        return false;
      }
      
      // Verify old password first
      const isOldPasswordCorrect = await verifyPassword(oldPassword);
      if (!isOldPasswordCorrect) {
        return false;
      }
      
      // Hash new password and update
      const newHashedPassword = await hashPassword(newPassword);
      await updateUserData({ passwordHash: newHashedPassword });
      
      console.log('Password changed successfully');
      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      return false;
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUserData(null);
      console.log('User data cleared successfully');
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{
      userData,
      saveUserData,
      updateUserData,
      clearUserData,
      verifyPassword,
      changePassword,
      isLoading,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};