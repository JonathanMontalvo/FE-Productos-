import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../interfaces/employee';
import { Product } from '../../interfaces/product';
import { OrderService } from '../../services/order/order.service';
import { PostOrder } from '../../interfaces/post-order';
import { PostOrdersProduct } from '../../interfaces/post-orders-product';
import { Router } from '@angular/router';

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
  employeesObjects!: Employee[];
  employees!: Emp[];
  products!: Product[];
  ordersProducts!: PostOrdersProduct[];
  postOrder!: PostOrder;

  // FormArray para el manejo de la filas dinámicas
  formGroup!: FormGroup;

  constructor(
    private _orderService: OrderService,
    private form: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployeesProducts();
    // Inicializamos el formGroup con un FormArray
    this.formGroup = this.form.group({
      selectedEmployee: [null, Validators.required],
      items: this.form.array([]),
    });
    
    this.addProductRow();
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

  submitOrder(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.postOrder = {
      employeeId: this.formGroup.value.selectedEmployee.id,
      ordersProducts: this.items.getRawValue().map((itemProduct: any) => ({
        productId: itemProduct.product.id,
        quantity: itemProduct.quantity,
      })),
      total: this.getTotalAmount(),
    };

    //console.log(this.postOrder);
    this._orderService.addOrder(this.postOrder).subscribe((data) => {
      //mostrar mensaje de exito
      this._router.navigate(['/verOrdenes']);
    });
  }
}
