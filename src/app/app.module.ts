import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { CreateEditProductComponent } from './components/create-edit-product/create-edit-product.component';
import { CreateEditEmployeeComponent } from './components/create-edit-employee/create-edit-employee.component';
import { CreateEditCategoryComponent } from './components/create-edit-category/create-edit-category.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    CreateOrderComponent,
    CreateEditProductComponent,
    CreateEditEmployeeComponent,
    CreateEditCategoryComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
