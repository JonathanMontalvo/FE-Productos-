import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../interfaces/employee';
import { Product } from '../../interfaces/product';
import { OrderService } from '../../services/order/order.service';
import { PostOrder } from '../../interfaces/post-order';
import { PostOrdersProduct } from '../../interfaces/post-orders-product';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GetOrder } from '../../interfaces/get-order';

interface Emp {
  id: number;
  name: string;
}

@Component({
  selector: 'app-create-order',
  standalone: false,
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent implements OnInit {
  //Usamos ViewChild con ElementRef para detectar el contenedor y hacerle scroll después de agregar una fila.
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;
  id!: number;
  component!: string;
  employeesObjects!: Employee[];
  employees!: Emp[];
  products!: Product[];
  ordersProducts!: PostOrdersProduct[];
  postOrder!: PostOrder;
  order!: GetOrder;
  textButton!: string;
  loading: boolean = true;

  // FormArray para el manejo de la filas dinámicas
  formGroup!: FormGroup;

  constructor(
    private _orderService: OrderService,
    private form: FormBuilder,
    private _router: Router,
    private _aRoute: ActivatedRoute
  ) {
    //Obtnemos el id para saber si editamos o agregamos
    this.id = this.id = Number(this._aRoute.snapshot.paramMap.get('id'));

    // Inicializamos el formGroup con un FormArray
    this.formGroup = this.form.group({
      selectedEmployee: [null, Validators.required],
      items: this.form.array([]),
    });
  }

  ngOnInit(): void {
    this.getEmployeesProducts();
    if (this.id == 0) {
      this.loading = false;
      this.component = 'Agregar Orden';
      this.textButton = 'Generar Orden';
      this.addProductRow();
    } else {
      this.component = 'Editar Orden';
      this.textButton = 'Editar Orden';
      this.getOrder(this.id);
    }
  }

  private scrollToBottom(): void {
    //El setTimeout asegura que el DOM ya se actualizó cuando se ejecuta el scroll
    setTimeout(() => {
      this.scrollTarget?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  private getEmployeesProducts(): void {
    this._orderService.getEmployeesProducts().subscribe(
      (data) => {
        this.employeesObjects = data.employees;
        this.products = data.products;
        this.transformEmployees();
      },
      (error) => {
        alert('Error cargando datos: ' + error);
      }
    );
  }

  private transformEmployees(): void {
    this.employees = this.employeesObjects.map((employee) => ({
      id: employee.id ?? 0,
      name: `${employee.id} | ${employee.name} ${employee.lastname}`,
    }));
  }

  /** Getter para el FormArray de filas */
  get items(): FormArray {
    return this.formGroup.get('items') as FormArray;
  }

  // Creamos un FormGroup por fila y agregamos evaluación de los inputs
  private createItemGroup(): FormGroup {
    return this.form.group({
      product: [null, Validators.required],
      unitPrice: [{ value: null, disabled: true }],
      quantity: [null, [Validators.required, Validators.min(1)]],
      total: [{ value: null, disabled: true }],
      canDelete: [false],
    });
  }

  //Agregamos una nueva fila y habilitamos que se peuda borrar si no es la primer fila al inicio
  addProductRow(): void {
    this.items.push(this.createItemGroup());
    if (this.items.length > 1) {
      this.items
        .at(this.items.length - 1)
        .get('canDelete')!
        .setValue(true);
    }
    if (this.items.length == 2) {
      this.items.at(0).get('canDelete')!.setValue(true);
    }
    this.scrollToBottom();
  }

  removeProductRow(index: number): void {
    this.items.removeAt(index);

    //validamos que no pueda borra la primer fila si es la única
    if (this.items.length === 1) {
      this.items.at(0).get('canDelete')!.setValue(false);
    }
  }

  updateProductSelection(selected: Product, rowNumber: number): void {
    const grp = this.items.at(rowNumber);
    grp.get('unitPrice')!.setValue(selected.price);
    grp.get('quantity')!.setValue(1);
    grp.get('total')!.setValue(selected.price);
  }

  updateTotalSelection(rowNumber: number): void {
    const grp = this.items.at(rowNumber);
    const qty = grp.get('quantity')!.value;
    const price = grp.get('unitPrice')!.value;
    grp.get('total')!.setValue(qty * price);
  }

  /*
    Total daba undefined pasaba por que el total esta en disabled true y Angular excluye los valores de campos deshabilitados 
    al acceder a formGroup.value
    Para campos que esten deshabilitados, debemos utilizar getRawValue() para que incluya los valores de todos 
    los controles, incluso los deshabilitados
    */
  getTotalAmount(): number {
    return this.items
      .getRawValue()
      .reduce((acc: number, item: any) => acc + (item.total || 0), 0);
  }

  getOrder(id: number) {
    this._orderService.getOrder(id).subscribe((data) => {
      this.order = data;

      //limpiamos por que por buffer parece que luego se quedan
      this.items.clear();

      //console.log(this.order);

      this.formGroup.get('selectedEmployee')?.setValue({
        id: data.employee.id,
        name: `${data.employee.id} | ${data.employee.name} ${data.employee.lastname}`,
      });

      this.order.ordersProducts.forEach((orderProduct) => {
        const rowGroup = this.createItemGroup();
        rowGroup.get('product')!.setValue(orderProduct.product);
        rowGroup.get('unitPrice')!.setValue(orderProduct.product.price);
        rowGroup.get('quantity')!.setValue(orderProduct.quantity);
        const total = orderProduct.product.price * orderProduct.quantity;
        rowGroup.get('total')!.setValue(total);
        rowGroup.get('canDelete')!.setValue(true);
        this.items.push(rowGroup);
      });

      if (this.order.ordersProducts.length === 1) {
        this.items.at(0).get('canDelete')!.setValue(false);
      }
      this.loading = false;
      this.scrollToBottom();
    });
  }

  createOrder(postOrder: PostOrder) {
    this._orderService.addOrder(postOrder).subscribe(() => {
      Swal.fire({
        title: 'La orden fue creada con exito',
        icon: 'success',
      });
      this._router.navigate(['/verOrdenes']);
    });
  }

  editOrder(id: number, postOrder: PostOrder) {
    //console.log(postOrder);
    this._orderService.updateOrder(id, postOrder).subscribe(
      () => {
        Swal.fire({
          title: 'La orden se actualizo con exito',
          icon: 'success',
        });
        this._router.navigate(['/verOrdenes']);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
        });
      }
    );
  }

  submitOrder(): void {
    this.postOrder = {
      ...(this.id !== 0 && { id: this.id }), // con el operador spread solo lo agrega si se cumple sino, lo omite
      employeeId: this.formGroup.value.selectedEmployee.id,
      ordersProducts: this.items.getRawValue().map((itemProduct: any) => ({
        productId: itemProduct.product.id,
        quantity: itemProduct.quantity,
      })),
      total: this.getTotalAmount(),
    };

    if (this.component == 'Agregar Orden') {
      this.createOrder(this.postOrder);
    } else {
      this.editOrder(this.id, this.postOrder);
    }
  }
}
