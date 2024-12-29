export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  oldPrice: number;
  calories: string;
  weight: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  subtitle: string;
}

export interface Filter {
  id: number;
  name: string;
  imageUrl: any;
}
