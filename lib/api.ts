import type { UpdateUserDto, CreateUserDto } from '@/lib/types';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5115';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

    const apiResponse = await response.json();

    if (!response.ok || !apiResponse.success) {
      throw new Error(apiResponse.message || 'Failed to fetch users');
    }

    return apiResponse.data;
  },

  async getUser(id: string) {
    const response = await fetch(
      `${API_URL}/api/Users/${id}`,
      { headers: await getAuthHeaders() }
    );

    const apiResponse = await response.json();

    if (!response.ok || !apiResponse.success) {
      throw new Error(apiResponse.message || 'Failed to fetch user');
    }

    return apiResponse.data;
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

    const apiResponse = await response.json();

    if (!response.ok || !apiResponse.success) {
      throw new Error(apiResponse.message || 'Failed to create user');
    }

    return apiResponse.message; // o simplemente return true;
  },

  async updateUser(id: string, data: UpdateUserDto) {
    const response = await fetch(`${API_URL}/api/Users/${id}`, {
      method: 'PUT',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data),
    });

    const apiResponse = await response.json();

    if (!response.ok || !apiResponse.success) {
      throw new Error(apiResponse.message || 'Failed to update user');
    }

    return apiResponse.message;
  },

  async deleteUser(id: string) {
    const response = await fetch(
      `${API_URL}/api/Users/${id}`,
      {
        method: 'DELETE',
        headers: await getAuthHeaders(),
      }
    );

    const apiResponse = await response.json();

    if (!response.ok || !apiResponse.success) {
      throw new Error(apiResponse.message || 'Failed to delete user');
    }

    return apiResponse.message;
  },

  async getRoles() {
    const response = await fetch(
      `${API_URL}/api/Roles`,
      { headers: await getAuthHeaders() }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch roles');
    }

    return response.json(); // tu endpoint de roles no cambió a ApiResponse
  },
};
