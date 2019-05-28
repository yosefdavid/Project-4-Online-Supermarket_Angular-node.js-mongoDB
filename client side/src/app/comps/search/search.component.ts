import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  nameProduct: string;

  constructor(private userService: UserService) {

  }

  ngOnInit() {

  }

  searchProduct() {

    if (this.nameProduct) {

      this.userService.searchProduct(this.nameProduct).subscribe(data => {
        
        this.userService.searchProductEm.emit(data);

      });

    }
    else {
      
      this.userService.searchProductEm.emit(this.nameProduct);

    }

  }

}
