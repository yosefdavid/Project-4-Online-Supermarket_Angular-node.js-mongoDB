import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CartProduct } from 'src/app/models/cartProduct.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  allProductCart: CartProduct[] = [];
  isCartEmpty: boolean = true;
  cartTotalPrice: number = 0;
  cartId: string;


  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {

    this.userService.userEm.subscribe(data => {

      if (data.userCart.productsCart) {

        this.allProductCart = data.userCart.productsCart;
        this.cartTotalPrice = data.userCart.totalPrice.toFixed(2);
        this.isCartEmpty = false;
        this.cartId = data.userCart.cartId;

      }
      else {

        this.allProductCart = [];
        this.isCartEmpty = true;
        this.cartTotalPrice = 0;
        this.cartId = null;

      }

    });

    this.userService.addProductModalEm.subscribe(data => {

      let currentProductCart = this.allProductCart.find(productCart => productCart.productId == data._id);

      this.userService.QuantityToAddEm.emit(currentProductCart);

    });

  }

  emptyCart() {

    this.userService.emptyCart().subscribe(data => {

      this.userService.cartEm.emit("cart change!");

    })


  }


  minimize() {

    this.userService.minimize.emit("minimize!");

  }

  goToOrder() {

    this.router.navigate(["order"]);

  }


}
