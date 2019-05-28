import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {

    let miniModeElement = document.getElementById("minimize-mode");
    miniModeElement.style.display = "none";

    this.checkUserDetails();

    this.userService.cartEm.subscribe(data => {
      
      this.checkUserDetails();

    });

    this.userService.minimize.subscribe(data => {

      let fullModeElement = document.getElementById("full-mode");
      let miniModeElement = document.getElementById("minimize-mode");

      fullModeElement.style.display = "none";
      miniModeElement.style.display = "block";

    });

  }

  checkUserDetails() {

    this.userService.checkLogin().subscribe(data => {
      
      if (data.status == "ok") {

        if (data.user.role == "user") {

          this.userService.userEm.emit(data);

        }
        else {

          this.router.navigate(["/the_market_admin"]);

        }

      }
      else {

        this.router.navigate(["/login"]);

      }

    });

  }

  fullMode() {

    let fullModeElement = document.getElementById("full-mode");
    let miniModeElement = document.getElementById("minimize-mode");

    fullModeElement.style.display = "block";
    miniModeElement.style.display = "none";

  }

}
