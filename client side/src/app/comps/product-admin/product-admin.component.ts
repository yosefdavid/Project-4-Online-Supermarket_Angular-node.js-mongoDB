import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {

  @Input() product: any;

  fixPrice:number;

  constructor(private adminService:AdminService) {
    
   }

  ngOnInit() {

    this.fixPrice = this.product.price.toFixed(2);

  }

  editProduct(){
    
    this.adminService.editProductEm.emit(this.product);

  }

}
