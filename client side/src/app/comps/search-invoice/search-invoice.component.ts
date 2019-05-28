import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-invoice',
  templateUrl: './search-invoice.component.html',
  styleUrls: ['./search-invoice.component.css']
})
export class SearchInvoiceComponent implements OnInit {

  nameProduct: string;
  totalResult: any;
  searchMode: boolean = false;

  constructor(private userService: UserService) {

  }

  ngOnInit() {


  }

  searchProduct() {

    this.userService.searchInvioceEm.emit(this.nameProduct);

    if (this.nameProduct) {

      this.searchMode = true;

      let totalSpansEl = document.getElementsByName("result-invoice");

      if (totalSpansEl.length > 0) {

        this.totalResult = totalSpansEl.length;

      }
      else {

        this.totalResult = 0;

      }

    }
    else {

      this.searchMode = false;

    }

  }

}
