import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  storeId: any;
  pages: any;
  tempManage: any;
  html: string = '';
  html2: string = '';
  // isProductTemp:boolean=""
  // products
  shareds: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: UserService
  ) {}

  ngOnInit(): void {
    this.http
      .getTemplatesByStoreId(window.location.pathname.split('/')[2])
      .subscribe((res) => {
        this.pages = res;
        this.changePage(0);
      });
  }

  changePage(i: any) {
    if (this.pages[i].html.indexOf('<products>') > -1) {
      // this.isProductTemp = true;
      this.tempManage = this.pages[i].html.split('<products>');
      this.html =
        `<head><style>${this.pages[i].css}</style></head>` + this.tempManage[0];
      this.html2 = this.tempManage[1];
      // this.isProductTemp = true;
    } else {
      this.html =
        `<head><style>${this.pages[i].css}</style></head>` + this.pages[i].html;
      this.html2 = '';
      // this.isProductTemp = false;
    }
    // console.log(this.products);
    //console.log(this.html)
    //console.log(this.html2)
  }
}
