import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit-product',
  standalone: false,
  templateUrl: './create-edit-product.component.html',
  styleUrl: './create-edit-product.component.css',
})
export class CreateEditProductComponent implements OnInit {
  categoriesArray!: Category[];
  formGroup!: FormGroup;
  id!: number;
  component!: string;
  product!: Product;
  buttonText!: string;
  loading: boolean = true;

  validatorPrice = Validators.compose([Validators.required, Validators.min(0)]);

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _formBuilder: FormBuilder,
    private _aRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.formGroup = this._formBuilder.group({
      name: ['', Validators.required],
      price: [null, this.validatorPrice],
      selectedCategory: [null, Validators.required],
    });
    this.id = Number(this._aRoute.snapshot.paramMap.get('id'));
    //console.log(this.id);
    if (this.id == 0) {
      this.loading = false;
      this.component = 'Agregar Producto';
      this.buttonText = 'Agregar Producto';
    } else {
      this.component = 'Editar Producto';
      this.buttonText = 'Editar Producto';
    }
  }

  ngOnInit(): void {
    this.getCategories();
    if (this.component == 'Editar Producto') {
      this.getProductSelection();
    }
  }

  getCategories() {
    this._categoryService.getCategories().subscribe((data) => {
      this.categoriesArray = data;
    });
  }

  getProductSelection() {
    this._productService.getProduct(this.id).subscribe((data) => {
      this.product = data;
      //console.log(this.product);
      this.formGroup.setValue({
        name: this.product.name,
        price: this.product.price,
        selectedCategory: this.product.category,
      });
      //console.log(this.formGroup);
      this.loading = false;
    });
  }

  createEditCategory() {
    this.product = {
      ...(this.id !== 0 && { id: this.id }), // con el operador spread solo lo agrega si se cumple sino, lo omite
      name: this.formGroup.value.name,
      price: this.formGroup.value.price,
      categoryId: this.formGroup.value.selectedCategory.id,
    };
    if (this.component == 'Agregar Producto') {
      this.createCategory(this.product);
    } else {
      this.editCategory(this.id, this.product);
    }
  }

  createCategory(product: Product) {
    this._productService.addProduct(product).subscribe(() => {
      Swal.fire({
        title: 'El producto fue agregado con exito',
        icon: 'success',
      });
      this._router.navigate(['/verProductos']);
    });
  }
  editCategory(id: number, product: Product) {
    //console.log(product);

    this._productService.updateProduct(id, product).subscribe(() => {
      Swal.fire({
        title: 'El producto fue editado con exito',
        icon: 'success',
      });
      this._router.navigate(['/verProductos']);
    });
  }
}
