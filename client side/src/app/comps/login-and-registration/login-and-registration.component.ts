import { Component, OnInit } from '@angular/core';
import { LoginAndRegistrationService } from 'src/app/services/login-and-registration.service';


@Component({
  selector: 'app-login-and-registration',
  templateUrl: './login-and-registration.component.html',
  styleUrls: ['./login-and-registration.component.css']
})
export class LoginAndRegistrationComponent implements OnInit {

  constructor(private loginRgusterService: LoginAndRegistrationService) {

  }

  ngOnInit() {

    this.loginRgusterService.checkLogin().subscribe(data => {
      
      if (data.status == "ok") {

        this.loginRgusterService.userEm.emit(data);

      }

    });

   

  }

}
