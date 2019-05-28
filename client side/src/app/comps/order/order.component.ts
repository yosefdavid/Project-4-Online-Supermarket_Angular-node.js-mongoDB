import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {

    this.userService.checkLogin().subscribe(data => {

      if (data.status == "error") {

        this.router.navigate(["login"]);

      }
      else {

        if (data.user.role == "admin") {

          this.router.navigate(["the_market_admin"]);

        }
        else {

          if (!data.userCart.isOpen) {

            this.router.navigate(["the_market"]);

          }
          else {

            this.userService.orderEm.emit(data);

          }

        }

      }

    });

  }

}
