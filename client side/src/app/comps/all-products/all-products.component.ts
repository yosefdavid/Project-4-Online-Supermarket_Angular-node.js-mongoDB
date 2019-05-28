import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Categories } from 'src/app/models/categories.model';



@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allCategories: Categories[] = [];
  categoryToShow: string;
  productsToShow: any[] = [];
  isLodaProduct: boolean = true;
  productIdToAdd: string;
  productNameToAdd: string;
  priceProductToAdd: string;
  productImgToAdd: string;
  productQuantityToAdd: number;
  searchMode: boolean = false;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    
    this.userService.getAllCategories().subscribe(data => {
      
      this.allCategories = data;
      this.categoryToShow = data[0]._id;
      this.getProducts();

    });

    this.userService.addProductModalEm.subscribe(data => {

      this.productIdToAdd = data._id;
      this.productNameToAdd = data.productName;
      this.priceProductToAdd = data.price;
      this.productImgToAdd = data.image;

    });

    this.userService.QuantityToAddEm.subscribe(data => {

      if (data) {

        this.productQuantityToAdd = data.quantity;

      }
      else {

        this.productQuantityToAdd = 1;

      }

    });

    this.userService.searchProductEm.subscribe(data => {

      if (data) {

        this.productsToShow = data;
        this.searchMode = true;
        this.categoryToShow = "result";

      }
      else {

        this.userService.getAllCategories().subscribe(data => {

          this.allCategories = data;
          this.categoryToShow = data[0]._id;
          this.getProducts();

        });

      }

    });

  }

  getProducts() {
    
    this.isLodaProduct = true;
    this.searchMode = false;

    this.userService.getAllCategoryProducts(this.categoryToShow).subscribe(data => {
      
      if (this.isLodaProduct) {

        this.productsToShow = data;
        this.isLodaProduct = false;

      }

    });

  }

  addProductModal() {

    if (this.productQuantityToAdd % 1 == 0) {

      let productToAdd: object = {
        productId: this.productIdToAdd,
        quantity: this.productQuantityToAdd
      }

      this.userService.addProductToCart(productToAdd).subscribe(data => {

        this.userService.cartEm.emit("cart product change!");

      });

    }

  }

}
