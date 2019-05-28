import { Component, OnInit } from '@angular/core';
import { LoginAndRegistrationService } from 'src/app/services/login-and-registration.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {

  isConect: boolean = false;
  isDisconect: boolean = true;
  btnText: string = "Start shopping";
  userRole: boolean = false;
  username: string;
  password: number;
  msg: string;
  btnNotLoad: boolean = true;

  constructor(private loginRgusterService: LoginAndRegistrationService, private router: Router) {

  }

  ngOnInit() {

    this.loginRgusterService.userEm.subscribe(data => {

      this.isConect = true;
      this.isDisconect = false;

      if (data.user.role == "user") {

        if (data.userCart.isOpen) {
          this.btnText = "Continue shopping";
        }

      }
      else {

        this.router.navigate(["the_market_admin"]);

      }

    });

  }

  login() {

    this.btnNotLoad = false;

    if (!this.username || !this.password) {

      this.btnNotLoad = true;

      this.msg = "Please fill all inputs fields";

    }
    else {

      let ObjToSend: object = {
        username: this.username,
        password: this.password
      }

      this.loginRgusterService.login(ObjToSend).subscribe(data => {

        if (data.status == "error") {

          this.btnNotLoad = true;

          this.msg = data.msg;

        }
        else {
          
          this.btnNotLoad = true;
          this.isConect = true;
          this.isDisconect = false;
          this.loginRgusterService.userEm.emit(data);

          if (data.user.role == "user") {

            if (data.userCart.isOpen) {
              this.btnText = "Continue shopping";
            }

            this.router.navigate(["/login"]);

          }
          else {

            this.router.navigate(["the_market_admin"]);

          }

        }

      });

    }

  }

  goToMarket() {

    this.router.navigate(["the_market"]);

  }

}
