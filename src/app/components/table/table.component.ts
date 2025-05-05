import { Component, OnInit } from '@angular/core';
import { ColumnTable } from '../../interfaces/column-table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { Employee } from '../../interfaces/employee';
import { GetOrder } from '../../interfaces/get-order';
import { Category } from '../../interfaces/category';
import { OrdersProductService } from '../../services/orders-product/orders-product.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { ProductService } from '../../services/product/product.service';
import { CategoryService } from '../../services/category/category.service';
import { GetOrdersProduct } from '../../interfaces/get-orders-product';

//Alerta
import Swal, { SweetAlertIcon } from 'sweetalert2';

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
export class TableComponent implements OnInit {
  component: string;
  loading: boolean = true;
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
    private _categoryService: CategoryService,
    private _router: Router
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
        this.loading = false;
        //console.log(this.data);
      },
      (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
        });
      }
    );
  }

  getOrdersProducts(id: number) {
    this.cols = [
      { field: 'id', header: 'Id Orden Producto' },
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
        this.loading = false;
        //console.log(this.data);
      },
      (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
        });
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
        this.loading = false;
        //console.log(this.data);
      },
      (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
        });
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
        this.loading = false;
        //console.log(this.data);
      },
      (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
        });
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
        this.loading = false;
        //console.log(this.data);
      },
      (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
        });
      }
    );
  }

  deleteObject(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: '!No podrá revertir la acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Sí, borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteByType(id);
      }
    });
  }

  deleteByType(id: number) {
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
        console.error(`Unknown type: ${this.component}`);
        break;
    }
  }

  showDeleteAlert(
    alertTitle: string,
    message: string,
    alertIcon: SweetAlertIcon
  ) {
    Swal.fire({
      title: alertTitle,
      text: message,
      icon: alertIcon,
    });
  }

  deleteOrders(id: number) {
    this._orderService.deleteOrder(id).subscribe(() => {
      this.showDeleteAlert(
        '¡Eliminado!',
        'La orden ha sido eliminada correctamente.',
        'success'
      );
      this.getDTO();
    });
  }

  deleteCategories(id: number) {
    this._categoryService.deleteCategory(id).subscribe(() => {
      this.showDeleteAlert(
        '¡Eliminado!',
        'La categoría ha sido eliminada correctamente.',
        'success'
      );
      this.getDTO();
    });
  }

  deleteProducts(id: number) {
    this._productService.deleteProduct(id).subscribe(() => {
      this.showDeleteAlert(
        '¡Eliminado!',
        'El producto ha sido eliminado correctamente.',
        'success'
      );
      this.getDTO();
    });
  }

  deleteEmployees(id: number) {
    this._employeeService.deleteEmployee(id).subscribe(() => {
      this.showDeleteAlert(
        '¡Eliminado!',
        'El empleado ha sido eliminado correctamente.',
        'success'
      );
      this.getDTO();
    });
  }

  editObject(id: number) {
    switch (this.component) {
      case 'Productos':
        this._router.navigate(['/editarProducto', id]);
        break;
      case 'Categorias':
        this._router.navigate(['/editarCategoria', id]);
        break;
      case 'Ordenes':
        this._router.navigate(['/editarOrden', id]);
        break;
      case 'Empleados':
        this._router.navigate(['/editarEmpleado', id]);
        break;
      default:
        break;
    }
  }
}
