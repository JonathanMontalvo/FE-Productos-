import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ColumnTable } from '../../interfaces/column-table';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { Employee } from '../../interfaces/employee';
import { GetOrder } from '../../interfaces/get-order';
import { Category } from '../../interfaces/category';
import { OrdersProductService } from '../../services/orders-product/orders-product.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { ProductService } from '../../services/product/product.service';
import { CategoryService } from '../../services/category/category.service';
import { GetOrdersProduct } from '../../interfaces/get-orders-product';

interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit, AfterViewInit {
  component: string;
  data!: Category[] | Product[] | Employee[] | GetOrder[] | GetOrdersProduct[];
  cols!: ColumnTable[];
  id!: number;
  totalGeneral: number = 0;

  constructor(
    private _aRoute: ActivatedRoute,
    private _orderService: OrderService,
    private _ordersProductService: OrdersProductService,
    private _employeeService: EmployeeService,
    private _productService: ProductService,
    private _categoryService: CategoryService
  ) {
    this.component = this._aRoute.snapshot.url[0].path.substring(3);
    this.id = Number(this._aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getDTO();
  }

  get formattedComponent(): string {
    return this.component === 'OrdenesProductos'
      ? 'Ordenes Productos'
      : this.component;
  }

  getDTO() {
    switch (this.component) {
      case 'Empleados':
        this.getEmployees();
        break;
      case 'Productos':
        this.getProducts();
        break;
      case 'Categorias':
        this.getCategories();
        break;
      case 'OrdenesProductos':
        this.getOrdersProducts(this.id);
        break;
      case 'Ordenes':
        this.getOrders();
        break;
      default:
        break;
    }
  }

  getOrders() {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'employee', header: 'Employee' },
      { field: 'total', header: 'Total' },
      { field: 'opciones', header: 'Opciones' },
    ];
    this._orderService.getOrders().subscribe(
      (data) => {
        this.data = data;
        //console.log(this.data);
      },
      (error) => {
        alert(error);
      }
    );
  }

  getOrdersProducts(id: number) {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'op.product', header: 'producto' },
      { field: 'op.price', header: 'Precio' },
      { field: 'quantity', header: 'Cantidad' },
      { field: 'op.total', header: 'Total Por Productos' },
    ];
    this._ordersProductService.getOrdersProductsByOrderId(id).subscribe(
      (data) => {
        this.data = data;
        this.totalGeneral = data.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        );
        //console.log(this.data);
      },
      (error) => {
        alert(error);
      }
    );
  }

  getEmployees() {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Nombre' },
      { field: 'lastname', header: 'Apellido Paterno' },
      { field: 'opciones', header: 'Opciones' },
    ];
    this._employeeService.getEmployees().subscribe(
      (data) => {
        this.data = data;
        //console.log(this.data);
      },
      (error) => {
        alert(error);
      }
    );
  }

  getProducts() {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Producto' },
      { field: 'price', header: 'Precio' },
      { field: 'category', header: 'Categoria' },
      { field: 'opciones', header: 'Opciones' },
    ];
    this._productService.getProducts().subscribe(
      (data) => {
        this.data = data;
        //console.log(this.data);
      },
      (error) => {
        alert(error);
      }
    );
  }

  getCategories() {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Categoria' },
      { field: 'opciones', header: 'Opciones' },
    ];
    this._categoryService.getCategories().subscribe(
      (data) => {
        this.data = data;
        //console.log(this.data);
      },
      (error) => {
        alert(error);
      }
    );
  }

  eliminarObjeto(id: number) {
    //sweetAlert

    switch (this.component) {
      case 'Empleados':
        this.deleteEmployees(id);
        break;
      case 'Productos':
        this.deleteProducts(id);
        break;
      case 'Categorias':
        this.deleteCategories(id);
        break;
      case 'Ordenes':
        this.deleteOrders(id);
        break;
      default:
        break;
    }
    console.log('eliminar:' + id);
  }
  deleteOrders(id: number) {
    throw new Error('Method not implemented.');
  }
  deleteCategories(id: number) {
    throw new Error('Method not implemented.');
  }
  deleteProducts(id: number) {
    throw new Error('Method not implemented.');
  }
  deleteEmployees(id: number) {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {}
}
