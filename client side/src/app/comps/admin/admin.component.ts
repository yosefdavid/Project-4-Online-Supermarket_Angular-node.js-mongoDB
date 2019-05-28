import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) {

  }

  ngOnInit() {

    this.adminService.checkLogin().subscribe(data => {

      if (data.status == "ok") {

        if (data.user.role != "admin") {

          this.router.navigate(["/login"]);

        }

      }
      else {

        this.router.navigate(["/login"]);

      }

    });

  }

}
