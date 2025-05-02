import { Employee } from './employee';
import { GetOrdersProduct } from './get-orders-product';

export interface GetOrder {
  id: number;
  employee: Employee;
  ordersProducts: GetOrdersProduct[];
  total: number;
}
