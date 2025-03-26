export interface AdminUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'editor';
}

export interface UserCredentials {
  email: string;
  password: string;
  username: string;
  role: 'admin' | 'editor';
}