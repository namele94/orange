import {makeAutoObservable} from 'mobx';
import {Filter, Product} from '../types';
import {filterData, products as mockProducts} from '../data/mockData';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem extends Product {
  quantity: number;
}

class ProductStore {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  activeFilter: Filter = filterData[0];
  cart: CartItem[] = [];
  error: string | null = null;
  selectedItem: {
    image: string;
    price: number;
    name: string;
    id: string;
    category: string;
  } = {category: '', id: '', image: '', name: '', price: 0};
  loyaltyList: {date: string}[] = [];
  search: string = '';

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'ProductStore',
      properties: ['loyaltyList'],
      storage: AsyncStorage,
    });
  }

  loadProducts = () => {
    try {
      this.products = mockProducts;
      this.filteredProducts = mockProducts;
      this.applyFilter();
    } catch (error: any) {}
  };

  setFilter = (filter: Filter) => {
    this.activeFilter = filter;
    this.applyFilter();
  };

  setSelectedItem = (item: Product) => {
    this.selectedItem = item;
  };

  private applyFilter = () => {
    this.search = '';
    this.filteredProducts = mockProducts.filter(
      product =>
        product.category.toLowerCase() === this.activeFilter.name.toLowerCase(),
    );
  };

  searchItems = (text: string) => {
    this.search = text;
    this.filteredProducts = mockProducts
      .filter(
        product =>
          product.category.toLowerCase() ===
          this.activeFilter.name.toLowerCase(),
      )
      .filter(product =>
        product.name.toLowerCase().includes(this.search.toLowerCase()),
      );
  };

  setSearch = (text: string) => {
    this.search = text;
  };

  handlePlus = (product: Product) => {
    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cart = [...this.cart];
    } else {
      this.cart.push({...product, quantity: 1});
    }
  };

  handleMinus = (productId: string) => {
    const existingItem = this.cart.find(item => item.id === productId);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        this.cart = [...this.cart];
      } else {
        this.removeFromCart(productId);
      }
    }
  };

  removeFromCart = (productId: string) => {
    this.cart = this.cart.filter(item => item.id !== productId);
  };

  addLoyalty = (code: string) => {
    if (code === 'orange') {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
      })} | ${now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;

      this.loyaltyList.push({
        date: formattedDate,
      });
      this.error = null;
      return true;
    } else {
      this.error = 'Invalid code';
    }
    return undefined;
  };

  clearLoyalty = () => {
    this.loyaltyList = [];
  };

  clearCart = () => {
    this.cart = [];
  };

  get cartTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getItemQuantity = (productId: string): number => {
    const item = this.cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  get totalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

export default ProductStore;
