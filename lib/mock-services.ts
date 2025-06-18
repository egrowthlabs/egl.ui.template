import { users, products, orders, maintenance, visits } from './mock-data';

// Simulated delay to mimic API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(userName: string, password: string) {
    await delay(800); // Simulate network delay
    
    const user = users.find(u => u.userName === userName && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const token = btoa(JSON.stringify({ userId: user.id, role: user.role }));
    return { token, user: { ...user, password: undefined } };
  },
  
  async getCurrentUser(token: string) {
    await delay(500);
    
    try {
      const decoded = JSON.parse(atob(token));
      const user = users.find(u => u.id === decoded.userId);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return { ...user, password: undefined };
    } catch {
      throw new Error('Invalid token');
    }
  }
};

export const productService = {
  async getProducts() {
    await delay(600);
    return products;
  },
  
  async getProduct(id: string) {
    await delay(300);
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  }
};

export const orderService = {
  async getOrders() {
    await delay(600);
    return orders;
  }
};

export const maintenanceService = {
  async getMaintenanceSchedule() {
    await delay(500);
    return maintenance;
  }
};

export const visitService = {
  async getVisits() {
    await delay(500);
    return visits;
  }
};