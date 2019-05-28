import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from 'src/app/models/cartProduct.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-invoice',
  templateUrl: './product-invoice.component.html',
  styleUrls: ['./product-invoice.component.css']
})
export class ProductInvoiceComponent implements OnInit {

  @Input() productInvoice: CartProduct;
  fixPrice: any;
  UnitsOrKg: string;
  productName: string;

  constructor(private userService: UserService) {


  }

  ngOnInit() {

    this.productName = this.productInvoice.productName;

    this.fixPrice = this.productInvoice.productTotalPrice.toFixed(2);

    if (this.productInvoice.categoryId == "5cdb470867602627d8c3da65") {

      this.UnitsOrKg = "Kg";

    }
    else {

      this.UnitsOrKg = "Units";

    }

    this.userService.searchInvioceEm.subscribe(data => {

      let productNameEl = document.getElementById(this.productInvoice.productCartId);

      if (data) {

        let valueToSearch1 = data.toLowerCase();
        let valueToSearch2 = data.replace(data.charAt(0), data.charAt(0).toUpperCase());

        if (this.productName.includes(valueToSearch1) || this.productName.includes(valueToSearch2)) {

          if (this.productName.includes(valueToSearch1)) {

            let result = this.productName.replace(valueToSearch1, `<span name="result-invoice" class="result">${valueToSearch1}</span>`);
            productNameEl.innerHTML = result;

          }
          else {

            let result = this.productName.replace(valueToSearch2, `<span name="result-invoice" class="result">${valueToSearch2}</span>`);
            productNameEl.innerHTML = result;

          }

        }
        else {

          productNameEl.innerHTML = this.productName;

        }


      }
      else {

        productNameEl.innerHTML = this.productName;

      }

    });

  }

}
