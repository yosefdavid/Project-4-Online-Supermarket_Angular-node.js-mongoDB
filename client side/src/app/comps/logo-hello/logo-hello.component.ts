import { Component, OnInit } from '@angular/core';
import { LoginAndRegistrationService } from 'src/app/services/login-and-registration.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-logo-hello',
  templateUrl: './logo-hello.component.html',
  styleUrls: ['./logo-hello.component.css']
})
export class LogoHelloComponent implements OnInit {

  clientfirstName: string = "guest";
  clientLastName: string = "";
  isConect: boolean = false;
  isAdmin: boolean = false;

  constructor(private loginRgusterService: LoginAndRegistrationService, private router: Router) {

  }

  ngOnInit() {

    this.loginRgusterService.userEm.subscribe(data => {

      this.clientfirstName = data.user.firstName;
      this.clientLastName = data.user.lastName;
      this.isConect = true;

      if (data.user.role == "admin") {
        this.isAdmin = true;
      }

    });

    this.loginRgusterService.checkLogin().subscribe(data => {

      if (data.status == "ok") {

        this.clientfirstName = data.user.firstName;
        this.clientLastName = data.user.lastName;
        this.isConect = true;

        if (data.user.role == "admin") {
          this.isAdmin = true;
        }

      }

    });

  }

  logout() {

    this.loginRgusterService.logout().subscribe(data => {

      this.clientfirstName = "guest";
      this.clientLastName = "";
      this.isConect = false;
      this.isAdmin = false;

      this.router.navigate(["/logout"]);

    });

  }

}
