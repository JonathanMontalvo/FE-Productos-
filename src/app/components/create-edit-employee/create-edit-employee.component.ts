import { Component, OnInit } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit-employee',
  standalone: false,
  templateUrl: './create-edit-employee.component.html',
  styleUrl: './create-edit-employee.component.css',
})
export class CreateEditEmployeeComponent implements OnInit {
  formGroup!: FormGroup;
  id!: number;
  component!: string;
  employee!: Employee;
  buttonText!: string;
  loading: boolean = true;

  constructor(
    private _employeeService: EmployeeService,
    private _formBuilder: FormBuilder,
    private _aRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.formGroup = this._formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
    });
    this.id = Number(this._aRoute.snapshot.paramMap.get('id'));
    //console.log(this.id);
    if (this.id == 0) {
      this.loading = false;
      this.component = 'Agregar Empleado';
      this.buttonText = 'Agregar Empleado';
    } else {
      this.component = 'Editar Empleado';
      this.buttonText = 'Editar Empleado';
    }
  }

  ngOnInit(): void {
    if (this.component == 'Editar Empleado') {
      this.getEmpledoSelection(this.id);
    }
  }

  getEmpledoSelection(id: number) {
    this._employeeService.getEmployee(id).subscribe((data) => {
      this.employee = data;
      //console.log(this.empleado);
      this.formGroup.setValue({
        name: this.employee.name,
        lastname: this.employee.lastname,
      });
      this.loading = false;
    });
  }

  createEditEmployee() {
    this.employee = {
      ...(this.id !== 0 && { id: this.id }), // con el operador spread solo lo agrega si se cumple sino, lo omite
      name: this.formGroup.value.name,
      lastname: this.formGroup.value.lastname,
    };
    if (this.component == 'Agregar Empleado') {
      this.createEmployee(this.employee);
    } else {
      this.editEmployee(this.id, this.employee);
    }
    //console.log(this.employee);
  }

  createEmployee(employee: Employee) {
    this._employeeService.addEmployee(employee).subscribe(() => {
      Swal.fire({
        title: 'El empleado fue agregado con exito',
        icon: 'success',
      });
      this._router.navigate(['/verEmpleados']);
    });
  }

  editEmployee(id: number, employee: Employee) {
    //console.log(employee);
    this._employeeService.updateEmployee(id, employee).subscribe(() => {
      Swal.fire({
        title: 'El empleado fue editado con exito',
        icon: 'success',
      });
      this._router.navigate(['/verEmpleados']);
    });
  }
}
