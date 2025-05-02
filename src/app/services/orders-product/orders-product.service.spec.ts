import { TestBed } from '@angular/core/testing';

import { OrdersProductService } from './orders-product.service';

describe('OrdersProductService', () => {
  let service: OrdersProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
