import { PostOrdersProduct } from './post-orders-product';

export interface PostOrder {
  employeeId: number;
  ordersProducts: PostOrdersProduct[];
  total: number;
}
