import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private _router: Router) {}

  onAgregar(type: string) {
    //console.log(`Agregar ${type}`);
    switch (type) {
      case 'orden':
        this._router.navigate(['/agregarOrden']);
        break;
      case 'categoria':
        this._router.navigate(['/agregarCategoria']);
        break;
      case 'producto':
        this._router.navigate(['/agregarProducto']);
        break;
      case 'empleado':
        this._router.navigate(['/agregarEmpleado']);
        break;
      default:
        break;
    }
  }

  onMostrar(type: string) {
    //console.log(`Mostrar ${type}`);
    switch (type) {
      case 'productos':
        this._router.navigate(['/verProductos']);
        break;
      case 'categorias':
        this._router.navigate(['/verCategorias']);
        break;
      case 'ordenes':
        this._router.navigate(['/verOrdenes']);
        break;
      case 'empleados':
        this._router.navigate(['/verEmpleados']);
        break;
      default:
        break;
    }
  }
}
