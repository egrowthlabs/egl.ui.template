import type { UpdateUserDto, CreateUserDto } from '@/lib/types';


// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5115';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://egl-cyrlab-webapp-efb9ac2e4a5a.herokuapp.com';

async function getAuthHeaders() {
  const token = localStorage.getItem('cyrlab-token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export const api = {
  async getUsers(page = 1, pageSize = 10, search = '') {
    const response = await fetch(
      `${API_URL}/api/Users?pageNumber=${page}&pageSize=${pageSize}&searchTerm=${search}`,
      { headers: await getAuthHeaders() }
    );
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getUser(id: string) {
    const response = await fetch(
      `${API_URL}/api/Users/${id}`,
      { headers: await getAuthHeaders() }
    );
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  async createUser(data: CreateUserDto) {
    const response = await fetch(
      `${API_URL}/api/Users`,
      {
        method: 'POST',
        headers: await getAuthHeaders(),
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  async updateUser(id: string, data: UpdateUserDto) {
    const response = await fetch(
      `${API_URL}/api/Users/${id}`,
      {
        method: 'PUT',
        headers: await getAuthHeaders(),
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  async deleteUser(id: string) {
    const response = await fetch(
      `${API_URL}/api/Users/${id}`,
      {
        method: 'DELETE',
        headers: await getAuthHeaders(),
      }
    );
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  },

  async getRoles() {
    const response = await fetch(
      `${API_URL}/api/Roles`,
      { headers: await getAuthHeaders() }
    );
    if (!response.ok) throw new Error('Failed to fetch roles');
    return response.json();
  },
};