import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any;

  fixPrice:number;


  constructor(private userService: UserService) { 
    
  }

  ngOnInit() {

    this.fixPrice = this.product.price.toFixed(2);
    
  }

  openAddModal(){

    this.userService.addProductModalEm.emit(this.product);
    
  }

}
