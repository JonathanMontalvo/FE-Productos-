import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', redirectTo: 'verEmpleados', pathMatch: 'full' },
  { path: 'verProductos', component: TableComponent },
  { path: 'verCategorias', component: TableComponent },
  { path: 'verEmpleados', component: TableComponent },
  { path: 'verOrdenes', component: TableComponent },
  { path: '**', redirectTo: 'verProductos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
