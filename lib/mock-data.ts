// Mock user data
export const users = [
  {
    id: '1',
    userName: 'admin',
    name: 'Admin User',
    role: 'Admin',
    password: 'admin123' // In a real app, passwords would be hashed
  },
  {
    id: '2',
    userName: 'user',
    name: 'Regular User',
    role: 'User',
    password: 'user123'
  }
];

// Mock products data
export const products = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description for product 1',
    price: 100,
    category: 'Category 1',
    brand: 'Brand 1',
    stock: 10
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description for product 2',
    price: 200,
    category: 'Category 2',
    brand: 'Brand 2',
    stock: 20
  }
];

// Mock orders data
export const orders = [
  {
    id: '1',
    userId: '2',
    products: [
      { productId: '1', quantity: 2 },
      { productId: '2', quantity: 1 }
    ],
    status: 'pending',
    total: 400,
    date: '2024-03-20'
  }
];

// Mock maintenance data
export const maintenance = [
  {
    id: '1',
    clientId: '1',
    description: 'Regular maintenance',
    status: 'scheduled',
    date: '2024-04-01'
  }
];

// Mock visits data
export const visits = [
  {
    id: '1',
    clientId: '1',
    userId: '2',
    purpose: 'Sales presentation',
    status: 'completed',
    date: '2024-03-15'
  }
];