export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}