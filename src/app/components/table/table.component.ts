import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ColumnTable } from '../../interfaces/column-table';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { Employee } from '../../interfaces/employee';
import { GetOrder } from '../../interfaces/get-order';
import { Category } from '../../interfaces/category';

interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit, AfterViewInit {
  component: string;
  data!: Category[] | Product[] | Employee[] | GetOrder[];
  cols!: ColumnTable[];

  constructor(
    private _aRoute: ActivatedRoute,
    private _orderService: OrderService
  ) {
    this.component = this._aRoute.snapshot.url[0].path.substring(3);
  }

  getOrders() {
    this._orderService.getOrders().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        alert(error);
      }
    );
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'employee', header: 'Employee' },
      { field: 'total', header: 'Total' },
      { field: 'opciones', header: 'Opciones' },
    ];
    this.getOrders();

    /*this.products = [
      {
        id: 1,
        code: 'f230fh0g3',
        name: 'Bamboo',
        price: 65,
        category: 'Accessories',
        quantity: 24,
      },
      {
        id: 2,
        code: 'a104tk9m2',
        name: 'Leather Wallet',
        price: 45,
        category: 'Accessories',
        quantity: 50,
      },
      {
        id: 3,
        code: 'b893jh5d7',
        name: 'Sunglasses',
        price: 80,
        category: 'Accessories',
        quantity: 30,
      },
      {
        id: 4,
        code: 'c785mh2x1',
        name: 'Wristwatch',
        price: 150,
        category: 'Accessories',
        quantity: 20,
      },
      {
        id: 5,
        code: 'd342pl6v8',
        name: 'Backpack',
        price: 120,
        category: 'Accessories',
        quantity: 15,
      },
      {
        id: 6,
        code: 'e657qk3y5',
        name: 'Hat',
        price: 35,
        category: 'Accessories',
        quantity: 40,
      },
      {
        id: 7,
        code: 'f963hn7s4',
        name: 'Scarf',
        price: 25,
        category: 'Accessories',
        quantity: 60,
      },
      {
        id: 8,
        code: 'g213yl9m6',
        name: 'Gloves',
        price: 30,
        category: 'Accessories',
        quantity: 35,
      },
      {
        id: 9,
        code: 'h409vk2j3',
        name: 'Belt',
        price: 50,
        category: 'Accessories',
        quantity: 25,
      },
    ];*/
  }

  ngAfterViewInit(): void {}
}
