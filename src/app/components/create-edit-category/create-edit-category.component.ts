import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-create-edit-category',
  standalone: false,
  templateUrl: './create-edit-category.component.html',
  styleUrl: './create-edit-category.component.css',
})
export class CreateEditCategoryComponent implements OnInit {
  formGroup!: FormGroup;
  id!: number;
  component!: string;
  category!: Category;
  buttonText!: string;
  loading: boolean = true;

  constructor(
    private _categoryService: CategoryService,
    private _formBuilder: FormBuilder,
    private _aRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.formGroup = this._formBuilder.group({
      name: ['', Validators.required],
    });
    this.id = Number(this._aRoute.snapshot.paramMap.get('id'));
    //console.log(this.id);
    if (this.id == 0) {
      this.loading = false;
      this.component = 'Agregar Categoria';
      this.buttonText = 'Agregar Categoria';
    } else {
      this.component = 'Editar Categoria';
      this.buttonText = 'Editar Categoria';
    }
  }

  ngOnInit(): void {
    if (this.component == 'Editar Categoria') {
      this.getCategorySelection(this.id);
    }
  }

  getCategorySelection(id: number) {
    this._categoryService.getCategory(id).subscribe((data) => {
      this.category = data;
      //console.log(this.category);
      this.formGroup.setValue({
        name: this.category.name,
      });
      this.loading = false;
    });
  }

  createEditCategory() {
    this.category = {
      ...(this.id !== 0 && { id: this.id }), // con el operador spread solo lo agrega si se cumple sino, lo omite
      name: this.formGroup.value.name,
    };
    if (this.component == 'Agregar Categoria') {
      this.createCategory(this.category);
    } else {
      this.editCategory(this.id, this.category);
    }
    //console.log(this.category);
  }

  createCategory(category: Category) {
    this._categoryService.addCategory(category).subscribe(
      () => {
        Swal.fire({
          title: 'La categoria fue agregada con exito',
          icon: 'success',
        });
        this._router.navigate(['/verCategorias']);
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

  editCategory(id: number, category: Category) {
    //console.log(category);
    this._categoryService.updateCategory(id, category).subscribe(
      () => {
        Swal.fire({
          title: 'La categoria fue editada con exito',
          icon: 'success',
        });
        this._router.navigate(['/verCategorias']);
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
}
