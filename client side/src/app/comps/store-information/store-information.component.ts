import { Component, OnInit } from '@angular/core';
import { LoginAndRegistrationService } from 'src/app/services/login-and-registration.service';

@Component({
  selector: 'app-store-information',
  templateUrl: './store-information.component.html',
  styleUrls: ['./store-information.component.css']
})
export class StoreInformationComponent implements OnInit {

  totalOrders: number;
  totalProducts: number;
  isConect: boolean = false;
  isConectFirstTime: boolean = false;
  isConectWithOpenCart: boolean = false;
  CartDate: string;
  totalPrice: number;
  lastPurchaseDate: string;

  constructor(private loginRgusterService: LoginAndRegistrationService) {

  }

  ngOnInit() {

    this.loginRgusterService.userEm.subscribe(data => {
      
      if (!data.userCart.isOpen && !data.lastOrder) {

        this.isConectFirstTime = true;
        this.isConect = false;
        this.isConectWithOpenCart = false;

      }
      else {

        if (data.userCart.isOpen) {

          this.isConect = false;
          this.isConectFirstTime = false;
          this.isConectWithOpenCart = true;
          this.CartDate = data.userCart.date;
          this.totalPrice = data.userCart.totalPrice.toFixed(2);

        }
        else {

          if (data.lastOrder) {

            this.isConect = true;
            this.isConectFirstTime = false;
            this.isConectWithOpenCart = false;
            this.lastPurchaseDate = data.lastOrder;

          }
          else {

            this.isConectFirstTime = true;
            this.isConect = false;
            this.isConectWithOpenCart = false;

          }

        }

      }

    });

    this.loginRgusterService.getPorduct().subscribe(data => {

      this.totalProducts = data;

    });

    this.loginRgusterService.getOrders().subscribe(data => {

      this.totalOrders = data;

    });

  }

}
