export interface User {
  id: string;
  userName: string;
  email: string;
  fullName?: string;
  roles: string[];
}

export interface CreateUserDto {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UpdateUserDto {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}