import { Product } from './product';
//Se utiliza en el get de Order(sin orderId) y en el get de ordersProducts(con orderId)
export interface GetOrdersProduct {
  id: number;
  orderId?: number;
  product: Product;
  quantity: number;
}
