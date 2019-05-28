import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-search-admin',
  templateUrl: './search-admin.component.html',
  styleUrls: ['./search-admin.component.css']
})
export class SearchAdminComponent implements OnInit {

  nameProduct: string;


  constructor(private adminService: AdminService) {

  }

  ngOnInit() {

  }

  searchProduct() {

    if (this.nameProduct) {

      this.adminService.searchProduct(this.nameProduct).subscribe(data => {

        this.adminService.searchProductEm.emit(data);

      });

    }
    else {

      this.adminService.searchProductEm.emit(this.nameProduct);

    }

  }

}
