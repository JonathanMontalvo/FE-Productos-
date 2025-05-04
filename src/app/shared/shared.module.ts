import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


// Prime ng
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ButtonModule,
    OverlayPanelModule,
    MenuModule,
    HttpClientModule,
    DropdownModule,
    ReactiveFormsModule,
    InputNumberModule
  ],
  exports: [
    ButtonModule,
    TableModule,
    ButtonModule,
    OverlayPanelModule,
    MenuModule,
    HttpClientModule,
    DropdownModule,
    ReactiveFormsModule,
    InputNumberModule
  ],
})
export class SharedModule {}
