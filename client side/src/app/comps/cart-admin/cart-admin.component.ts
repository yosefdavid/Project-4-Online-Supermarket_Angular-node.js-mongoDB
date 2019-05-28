import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Categories } from 'src/app/models/categories.model';

@Component({
  selector: 'app-cart-admin',
  templateUrl: './cart-admin.component.html',
  styleUrls: ['./cart-admin.component.css']
})
export class CartAdminComponent implements OnInit {

  productsToEdit: object[] = [];
  productName: string;
  allCategories: Categories[] = [];
  isCartEmpty: boolean = true;

  constructor(private adminService: AdminService) {

  }

  ngOnInit() {

    this.adminService.getAllCategories().subscribe(data => {

      this.allCategories = data;

    });

    this.adminService.editProductEm.subscribe(data => {

      this.isCartEmpty = false;
      this.productsToEdit = [];
      this.productsToEdit.push(data);
      this.productName = data.productName;

    });

    this.adminService.refreshEm.subscribe(data => {

      this.productsToEdit = [];
      this.productName = "";
      this.isCartEmpty = true;

    });

  }

  addNewProduct() {

    this.isCartEmpty = false;
    this.productsToEdit = [];
    this.productName = "New product";
    this.productsToEdit.push({
      _id: "-------",
      productName: "",
      price: 0,
      image: "",
      categoryId: this.allCategories[0]._id
    });

  }

}
