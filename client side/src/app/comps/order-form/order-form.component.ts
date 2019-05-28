import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartProduct } from 'src/app/models/cartProduct.model';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  dateToday: string;
  msg: string;
  dateErrorMsg: string;
  orderId: string;
  allProduct: CartProduct[] = [];
  cartTotalPrice: number;
  creditCardErrordMsg: string;

  orderForm = new FormGroup({
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    deliveryDate: new FormControl('', Validators.required),
    creditCard: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {

    let today = new Date().toLocaleDateString();
    let todayArry = today.split(".");

    if (todayArry[1].length == 1) {
      todayArry[1] = `0${todayArry[1]}`;
    }

    if (todayArry[0].length == 1) {
      todayArry[0] = `0${todayArry[1]}`;
    }

    let fixDate = `${todayArry[2]}-${todayArry[1]}-${todayArry[0]}`;
    this.dateToday = fixDate;

    this.userService.orderEm.subscribe(data => {

      this.orderForm.controls.city.setValue(data.user.city);
      this.orderForm.controls.street.setValue(data.user.street);

      let newAllproduct = data.userCart.productsCart.map(product => {

        return {
          cartId: product.cartId,
          categoryId: product.categoryId,
          productCartId: product.productCartId,
          productId: product.productId,
          productImg: product.productImg,
          productName: product.productName,
          productTotalPrice: product.productTotalPrice.toFixed(2),
          quantity: product.quantity
        }

      })

      this.allProduct = newAllproduct;
      this.cartTotalPrice = data.userCart.totalPrice.toFixed(2);

    });

  }

  checkDeliveryDate() {

    this.userService.checkDeliveryDate(this.orderForm.controls.deliveryDate.value).subscribe(data => {

      if (!data.deliveryDate) {

        let dateArry = this.orderForm.controls.deliveryDate.value.split("-");
        let fixDate = `${dateArry[2]}/${dateArry[1]}/${dateArry[0]}`;

        this.dateErrorMsg = `on ${fixDate} all shipments are taken - please choose another day!`;
        this.orderForm.controls.deliveryDate.setValue("");

      }
      else {

        this.dateErrorMsg = "";

      }

    });

  }

  checkCreditCard() {

    let creditCardValue = this.orderForm.controls.creditCard.value[this.orderForm.controls.creditCard.value.length - 1];

    if (isNaN(creditCardValue)) {
      creditCardValue = this.orderForm.controls.creditCard.value.slice(0, this.orderForm.controls.creditCard.value.length - 1);
      this.orderForm.controls.creditCard.setValue(creditCardValue);
      this.creditCardErrordMsg = "Credit card should be only numbers - 16 digits!";
    }
    else {
      this.creditCardErrordMsg = "";
    }

  }

  sendOrderForm() {

    if (!this.orderForm.controls.city.valid || !this.orderForm.controls.street.valid || !this.orderForm.controls.deliveryDate.valid) {

      this.msg = "Please fill all inputs fields!";

    }
    else {

      if (!this.orderForm.controls.creditCard.valid) {

        this.msg = "Invalid credit card - enter 16 valid digits!";

      }
      else {

        this.msg = "";

        this.userService.sendOrder(this.orderForm.value).subscribe(data => {

          let modal = document.getElementById("orderModal");
          modal.style.display = "block";

          this.orderId = data.orderId;

        });

      }

    }

  }

  getInvoice() {

    let TextInvioce:string ="";
    let today = new Date();

    TextInvioce += `The Market Invioce  ${today.toLocaleDateString()} ${today.toLocaleTimeString()} \r\n\r\n`;

    for (let i = 0; i < this.allProduct.length; i++) {
      
      TextInvioce += `${this.allProduct[i].productName}  X${this.allProduct[i].quantity}  Price: ${this.allProduct[i].productTotalPrice}$ \r\n\r\n`;

    }

    TextInvioce += `Total price: ${this.cartTotalPrice}$\r\n\r\n`;

    TextInvioce += `Order ID: ${this.orderId}\r\n\r\n`;

    TextInvioce += "Thank you for your purchase and hope to see you again!";

    var blob = new Blob([TextInvioce], { type: "text/plain;charset=utf-8" });
    
    saveAs(blob, "The Market Invioce.txt");

  }

  goToLoginPage() {

    this.router.navigate(["/login"]);

  }

}
