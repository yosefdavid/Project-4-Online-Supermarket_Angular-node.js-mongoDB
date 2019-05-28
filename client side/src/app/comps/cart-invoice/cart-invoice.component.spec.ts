import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartInvoiceComponent } from './cart-invoice.component';

describe('CartInvoiceComponent', () => {
  let component: CartInvoiceComponent;
  let fixture: ComponentFixture<CartInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
