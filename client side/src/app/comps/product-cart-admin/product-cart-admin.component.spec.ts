import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartAdminComponent } from './product-cart-admin.component';

describe('ProductCartAdminComponent', () => {
  let component: ProductCartAdminComponent;
  let fixture: ComponentFixture<ProductCartAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCartAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCartAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
