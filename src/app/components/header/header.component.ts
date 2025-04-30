import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor() {}

  onAgregar(type: string) {
    console.log(`Agregar ${type}`);
  }

  onMostrar(type: string) {
    console.log(`Mostrar ${type}`);
  }
}
