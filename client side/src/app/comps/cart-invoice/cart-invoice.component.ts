import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CartProduct } from 'src/app/models/cartProduct.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-invoice',
  templateUrl: './cart-invoice.component.html',
  styleUrls: ['./cart-invoice.component.css']
})
export class CartInvoiceComponent implements OnInit {

  allProductForInvioce: CartProduct[] = [];
  totalPriceInvioce: number;

  constructor(private userService: UserService, private router:Router) {


  }

  ngOnInit() {

    this.userService.orderEm.subscribe(data => {

      this.allProductForInvioce = data.userCart.productsCart;
      this.totalPriceInvioce = data.userCart.totalPrice.toFixed(2);

    });

  }

  backToMarket() {

    this.router.navigate(["the_market"]);

  }

}
