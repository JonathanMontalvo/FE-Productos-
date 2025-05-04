import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'agregarOrden', pathMatch: 'full' },
  { path: 'agregarOrden', component: CreateOrderComponent },
  { path: 'agregarCategoria', component: CreateOrderComponent },
  { path: 'agregarProducto', component: CreateOrderComponent },
  { path: 'agregarEmpleado', component: CreateOrderComponent },
  { path: 'editarOrden', component: CreateOrderComponent },
  { path: 'editarCategoria', component: CreateOrderComponent },
  { path: 'editarProducto', component: CreateOrderComponent },
  { path: 'editarEmpleado', component: CreateOrderComponent },
  { path: 'verProductos', component: TableComponent },
  { path: 'verCategorias', component: TableComponent },
  { path: 'verEmpleados', component: TableComponent },
  { path: 'verOrdenes', component: TableComponent },
  { path: 'verOrdenesProductos/:id', component: TableComponent },
  { path: '**', redirectTo: 'verProductos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
