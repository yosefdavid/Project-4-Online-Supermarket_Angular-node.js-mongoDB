import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAndRegistrationComponent } from './comps/login-and-registration/login-and-registration.component';
import { RegisterComponent } from './comps/register/register.component';
import { UserComponent } from './comps/user/user.component';
import { AdminComponent } from './comps/admin/admin.component';
import { OrderComponent } from './comps/order/order.component';

const routes: Routes = [
  { path: "", component: LoginAndRegistrationComponent, pathMatch: "full" },
  { path: "login", component: LoginAndRegistrationComponent },
  { path: "logout", component: LoginAndRegistrationComponent },
  { path: "register", component: RegisterComponent },
  { path: "the_market", component: UserComponent },
  { path: "order", component: OrderComponent },
  { path: "the_market_admin", component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
