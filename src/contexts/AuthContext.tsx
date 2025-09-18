import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  phone?: string;
  specialization?: string; // for doctors
  licenseNumber?: string; // for doctors
  isApproved?: boolean; // for doctors pending approval
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: string, additionalData?: any) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication - replace with Firebase
  useEffect(() => {
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Mock login logic - replace with Firebase Auth
    const mockUsers = [
      {
        id: '1',
        email: 'patient@test.com',
        name: 'John Patient',
        role: 'patient' as const,
        phone: '+1234567890'
      },
      {
        id: '2',
        email: 'doctor@test.com',
        name: 'Dr. Sarah Wilson',
        role: 'doctor' as const,
        phone: '+1987654321',
        specialization: 'Cardiology',
        licenseNumber: 'MD12345',
        isApproved: true
      },
      {
        id: '3',
        email: 'admin@test.com',
        name: 'Admin User',
        role: 'admin' as const
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('mockUser', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };

  const signup = async (email: string, password: string, role: string, additionalData?: any) => {
    setLoading(true);
    
    // Mock signup logic - replace with Firebase Auth
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: additionalData?.name || 'New User',
      role: role as 'patient' | 'doctor' | 'admin',
      ...additionalData
    };

    setUser(newUser);
    localStorage.setItem('mockUser', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    
    // Mock Google login - replace with Firebase Auth
    const googleUser: User = {
      id: 'google-' + Date.now(),
      email: 'google@example.com',
      name: 'Google User',
      role: 'patient'
    };

    setUser(googleUser);
    localStorage.setItem('mockUser', JSON.stringify(googleUser));
    setLoading(false);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    loginWithGoogle
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};