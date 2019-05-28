import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInvoiceComponent } from './product-invoice.component';

describe('ProductInvoiceComponent', () => {
  let component: ProductInvoiceComponent;
  let fixture: ComponentFixture<ProductInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
