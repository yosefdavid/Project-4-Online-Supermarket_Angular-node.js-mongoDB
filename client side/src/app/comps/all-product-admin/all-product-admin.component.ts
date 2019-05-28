import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/categories.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-all-product-admin',
  templateUrl: './all-product-admin.component.html',
  styleUrls: ['./all-product-admin.component.css']
})
export class AllProductAdminComponent implements OnInit {

  allCategories: Categories[] = [];
  categoryToShow: string;
  productsToShow: any[] = [];
  isLodaProduct: boolean = true;
  searchMode: boolean = false;

  constructor(private adminService:AdminService) { 

  }

  ngOnInit() {

    this.adminService.getAllCategories().subscribe(data => {
      
      this.allCategories = data;
      this.categoryToShow = data[0]._id;
      this.getProducts();

    });

    this.adminService.searchProductEm.subscribe(data => {

      if (data) {

        this.productsToShow = data;
        this.searchMode = true;
        this.categoryToShow = "result";

      }
      else {

        this.adminService.getAllCategories().subscribe(data => {

          this.allCategories = data;
          this.categoryToShow = data[0]._id;
          this.getProducts();

        });

      }

    });

    this.adminService.refreshEm.subscribe(data => {

      this.getProducts();

    });

  }

  getProducts() {
    
    this.isLodaProduct = true;
    this.searchMode = false;

    this.adminService.getAllCategoryProducts(this.categoryToShow).subscribe(data => {
      
      if (this.isLodaProduct) {

        this.productsToShow = data;
        this.isLodaProduct = false;

      }

    });

  }

}
