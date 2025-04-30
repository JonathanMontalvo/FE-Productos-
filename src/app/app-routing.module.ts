import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableProductsComponent } from './components/table-products/table-products.component';

const routes: Routes = [
  { path: '', redirectTo: 'crearOrden', pathMatch: 'full' },
  { path: 'verProductos', component: TableProductsComponent },
  { path: '**', redirectTo: 'verProductos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
