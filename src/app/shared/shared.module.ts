import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Prime ng
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';

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
  ],
  exports: [
    ButtonModule,
    TableModule,
    ButtonModule,
    OverlayPanelModule,
    MenuModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
