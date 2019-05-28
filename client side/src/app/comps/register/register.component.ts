import { Component, OnInit } from '@angular/core';
import { LoginAndRegistrationService } from 'src/app/services/login-and-registration.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  onStepOne: boolean = true;
  onStepTwo: boolean = false;
  msg: string;
  id: any;
  email: string;
  password: any;
  passwordConfirm: any;
  city: string;
  street: string;
  firstName: string;
  lastName: string;

  constructor(private loginRgusterService: LoginAndRegistrationService, private router: Router) {

  }

  ngOnInit() {

    this.city = "Jerusalem";

  }

  sendStepOne() {

    if (!this.id || !this.email || !this.password || !this.passwordConfirm) {

      this.msg = "Please fill all inputs fields!";

    }
    else {

      if (isNaN(this.id) || this.id.length != 9) {

        this.msg = "Please enter a valid and full ID!";

      }
      else {

        let email = this.email.split("@");

        if (!this.email.includes("@") || !email[0] || !email[1]) {

          this.msg = "Please enter a valid email!";

        }
        else {

          if (isNaN(this.password) || this.password.length < 5 || this.password.length > 8) {

            this.msg = "Please enter a password between 5 and 8 digits!";

          }
          else {

            if (this.password != this.passwordConfirm) {

              this.msg = "Passwords do not match - please check and try again!";

            }
            else {

              let objStepOne: object = {
                step: "one",
                newUser: {
                  userId: this.id,
                  username: this.email
                }
              };

              this.loginRgusterService.sendRegistrationForm(objStepOne).subscribe(data => {

                if (data.status == "error") {

                  this.msg = data.msg;

                }
                else {

                  this.msg = "";
                  this.onStepOne = false;
                  this.onStepTwo = true;

                }

              });

            }

          }

        }

      }

    }

  }

  backToStepOne() {

    this.msg = "";
    this.onStepOne = true;
    this.onStepTwo = false;

  }

  sendStepTow() {

    if (!this.city || !this.street || !this.firstName || !this.lastName) {

      this.msg = "Please fill all inputs fields!";

    }
    else {

      let user: User = {
        userId: this.id,
        username: this.email,
        password: this.password,
        city: this.city,
        street: this.street,
        firstName: this.firstName,
        lastName: this.lastName,
      };

      let objStepTwo: object = {
        step: "two",
        newUser: user
      };

      this.loginRgusterService.sendRegistrationForm(objStepTwo).subscribe(data => {

        this.msg = "";
        this.id = "";
        this.email = "";
        this.password = "";
        this.passwordConfirm = "";
        this.city = "Jerusalem";
        this.street = "";
        this.firstName = "";
        this.lastName = "";

        alert(data.msg);

        this.router.navigate(["/login"]);

      });

    }

  }

}
