import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProduct.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  @Input() cartProduct: CartProduct;

  isRemoveLoad: boolean = false;
  UnitsOrKg: string;
  fixPrice: any;

  constructor(private userService: UserService) {

  }

  ngOnInit() {

    this.fixPrice = this.cartProduct.productTotalPrice.toFixed(2);
    
    if (this.cartProduct.categoryId == "5cdb470867602627d8c3da65") {

      this.UnitsOrKg = "Kg";

    }
    else {

      this.UnitsOrKg = "Units";

    }

  }

  removeProductCart() {

    this.isRemoveLoad = true;

    this.userService.removeProductCart(this.cartProduct.productCartId).subscribe(data => {

      this.userService.cartEm.emit("product removed!");

      this.isRemoveLoad = false;

    });

  }

}
