import { DEFAULT_STORE, DEFAULT_CATEGORIES, DEFAULT_PRODUCTS, DEFAULT_ORDERS } from './data.js';

const KEYS = {
  STORE: 'confeitaria_store',
  CATEGORIES: 'confeitaria_categories',
  PRODUCTS: 'confeitaria_products',
  ORDERS: 'confeitaria_orders',
  CART: 'confeitaria_cart'
};

// Helper genérico com try/catch
function getItem(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error(`Erro ao ler localStorage [${key}]:`, e);
    return defaultValue;
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Erro ao gravar localStorage [${key}]:`, e);
  }
}

export const Storage = {
  // Inicialização inteligente
  init() {
    if (!localStorage.getItem(KEYS.STORE)) {
      setItem(KEYS.STORE, DEFAULT_STORE);
    }
    if (!localStorage.getItem(KEYS.CATEGORIES)) {
      setItem(KEYS.CATEGORIES, DEFAULT_CATEGORIES);
    }
    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      setItem(KEYS.PRODUCTS, DEFAULT_PRODUCTS);
    }
    if (!localStorage.getItem(KEYS.ORDERS)) {
      setItem(KEYS.ORDERS, DEFAULT_ORDERS);
    }
    if (!localStorage.getItem(KEYS.CART)) {
      setItem(KEYS.CART, []);
    }
  },

  // Loja / Configurações
  getStore() {
    return getItem(KEYS.STORE, DEFAULT_STORE);
  },
  saveStore(storeData) {
    const updated = { ...this.getStore(), ...storeData };
    setItem(KEYS.STORE, updated);
    return updated;
  },

  // Categorias
  getCategories() {
    return getItem(KEYS.CATEGORIES, DEFAULT_CATEGORIES);
  },
  saveCategories(categories) {
    setItem(KEYS.CATEGORIES, categories);
  },

  // Produtos
  getProducts() {
    return getItem(KEYS.PRODUCTS, DEFAULT_PRODUCTS);
  },
  saveProducts(products) {
    setItem(KEYS.PRODUCTS, products);
  },

  // Pedidos
  getOrders() {
    return getItem(KEYS.ORDERS, DEFAULT_ORDERS);
  },
  saveOrders(orders) {
    setItem(KEYS.ORDERS, orders);
  },
  addOrder(newOrder) {
    const orders = this.getOrders();
    orders.unshift(newOrder); // Mais novos primeiro
    setItem(KEYS.ORDERS, orders);
    return orders;
  },

  // Carrinho
  getCart() {
    return getItem(KEYS.CART, []);
  },
  saveCart(cart) {
    setItem(KEYS.CART, cart);
  },
  clearCart() {
    setItem(KEYS.CART, []);
  },

  // Reset de Fábrica
  resetToFactory() {
    localStorage.clear();
    this.init();
  },

  // Backup Completo JSON
  exportData() {
    return {
      version: "1.0",
      exportDate: new Date().toISOString(),
      store: this.getStore(),
      categories: this.getCategories(),
      products: this.getProducts(),
      orders: this.getOrders()
    };
  },
  importData(jsonData) {
    if (!jsonData || !jsonData.store || !jsonData.products) {
      throw new Error("Arquivo JSON inválido ou incompatível.");
    }
    setItem(KEYS.STORE, jsonData.store);
    if (jsonData.categories) setItem(KEYS.CATEGORIES, jsonData.categories);
    if (jsonData.products) setItem(KEYS.PRODUCTS, jsonData.products);
    if (jsonData.orders) setItem(KEYS.ORDERS, jsonData.orders);
  }
};
