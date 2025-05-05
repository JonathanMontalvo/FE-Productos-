import { PostOrdersProduct } from './post-orders-product';

export interface PostOrder {
  id?: number;
  employeeId: number;
  ordersProducts: PostOrdersProduct[];
  total: number;
}
