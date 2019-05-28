import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoHelloComponent } from './comps/logo-hello/logo-hello.component';
import { LoginAndRegistrationComponent } from './comps/login-and-registration/login-and-registration.component';
import { LoginRegistrationComponent } from './comps/login-registration/login-registration.component';
import { AboutStoreComponent } from './comps/about-store/about-store.component';
import { StoreInformationComponent } from './comps/store-information/store-information.component';
import { RegisterComponent } from './comps/register/register.component';
import { CopyrightComponent } from './comps/copyright/copyright.component';
import { UserComponent } from './comps/user/user.component';
import { AdminComponent } from './comps/admin/admin.component';
import { SearchComponent } from './comps/search/search.component';
import { CartComponent } from './comps/cart/cart.component';
import { AllProductsComponent } from './comps/all-products/all-products.component';
import { ProductComponent } from './comps/product/product.component';
import { ProductCartComponent } from './comps/product-cart/product-cart.component';
import { OrderComponent } from './comps/order/order.component';
import { CartInvoiceComponent } from './comps/cart-invoice/cart-invoice.component';
import { ProductInvoiceComponent } from './comps/product-invoice/product-invoice.component';
import { OrderFormComponent } from './comps/order-form/order-form.component';
import { SearchInvoiceComponent } from './comps/search-invoice/search-invoice.component';
import { SearchAdminComponent } from './comps/search-admin/search-admin.component';
import { CartAdminComponent } from './comps/cart-admin/cart-admin.component';
import { AllProductAdminComponent } from './comps/all-product-admin/all-product-admin.component';
import { ProductAdminComponent } from './comps/product-admin/product-admin.component';
import { ProductCartAdminComponent } from './comps/product-cart-admin/product-cart-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LogoHelloComponent,
    LoginAndRegistrationComponent,
    LoginRegistrationComponent,
    AboutStoreComponent,
    StoreInformationComponent,
    RegisterComponent,
    CopyrightComponent,
    UserComponent,
    AdminComponent,
    SearchComponent,
    CartComponent,
    AllProductsComponent,
    ProductComponent,
    ProductCartComponent,
    OrderComponent,
    CartInvoiceComponent,
    ProductInvoiceComponent,
    OrderFormComponent,
    SearchInvoiceComponent,
    SearchAdminComponent,
    CartAdminComponent,
    AllProductAdminComponent,
    ProductAdminComponent,
    ProductCartAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
