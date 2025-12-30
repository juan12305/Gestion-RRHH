import apiClient from './client';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  is_superuser: boolean;
  is_staff: boolean;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await apiClient.post('/auth/login/', credentials);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get('/auth/user/');
  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout/');
};
