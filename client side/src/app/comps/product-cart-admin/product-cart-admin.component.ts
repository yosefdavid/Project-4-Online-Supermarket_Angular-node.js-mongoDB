import { Component, OnInit, Input } from '@angular/core';
import { Categories } from 'src/app/models/categories.model';
import { Product } from 'src/app/models/products.model';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-product-cart-admin',
  templateUrl: './product-cart-admin.component.html',
  styleUrls: ['./product-cart-admin.component.css']
})
export class ProductCartAdminComponent implements OnInit {

  @Input() cartProduct: any;
  @Input() allCategories: Categories[];
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string
  categoryId: string;
  msg: string;

  constructor(private adminService: AdminService) {

  }

  ngOnInit() {

    this.productId = this.cartProduct._id;
    this.productName = this.cartProduct.productName;
    this.productPrice = this.cartProduct.price.toFixed(2);
    this.productImage = this.cartProduct.image;
    this.categoryId = this.cartProduct.categoryId;

  }

  SaveEdit() {

    if (!this.productName || !this.productImage) {

      this.msg = "Please fill all inputs fields";

    }
    else {

      if (isNaN(this.productPrice) || !this.productPrice) {

        this.msg = "Price should be only numbers!"

      }
      else {

        let newProduct = new Product(this.productName, this.categoryId, this.productPrice, this.productImage);

        if (this.productId == "-------") {

          this.adminService.addNewProduct(newProduct).subscribe(data => {

            alert(data.msg);

            this.adminService.refreshEm.emit("refres product");

          });

        }
        else {

          let objToSend: object = {
            _id: this.productId,
            newProduct: newProduct
          }

          this.adminService.editProduct(objToSend).subscribe(data => {

            alert(data.msg);

            this.adminService.refreshEm.emit("refres product");

          });

        }

      }

    }

  }

}
