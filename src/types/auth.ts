export interface User {
  id: string;
  username: string;
  email: string;
  role: string; // Changed from 'admin' to string to match AuthUser
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}