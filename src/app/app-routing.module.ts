import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CreateEditProductComponent } from './components/create-edit-product/create-edit-product.component';
import { CreateEditEmployeeComponent } from './components/create-edit-employee/create-edit-employee.component';
import { CreateEditCategoryComponent } from './components/create-edit-category/create-edit-category.component';

const routes: Routes = [
  { path: '', redirectTo: 'verOrdenes', pathMatch: 'full' },
  { path: 'agregarOrden', component: CreateOrderComponent },
  { path: 'agregarCategoria', component: CreateEditCategoryComponent },
  { path: 'agregarProducto', component: CreateEditProductComponent },
  { path: 'agregarEmpleado', component: CreateEditEmployeeComponent },
  { path: 'editarOrden/:id', component: CreateOrderComponent },
  { path: 'editarCategoria/:id', component: CreateEditCategoryComponent },
  { path: 'editarProducto/:id', component: CreateEditProductComponent },
  { path: 'editarEmpleado/:id', component: CreateEditEmployeeComponent },
  { path: 'verProductos', component: TableComponent },
  { path: 'verCategorias', component: TableComponent },
  { path: 'verEmpleados', component: TableComponent },
  { path: 'verOrdenes', component: TableComponent },
  { path: 'verOrdenesProductos/:id', component: TableComponent },
  { path: '**', redirectTo: 'verOrdenes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
