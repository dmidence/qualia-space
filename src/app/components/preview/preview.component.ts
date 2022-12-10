import { AlertsService } from './../../services/alerts.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

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
  userId: any;
  products: any[];
  shareds: any;
  currentProduct: any = {};

  constructor(private http: UserService, private alert: AlertsService) {}

  ngOnInit(): void {
    this.userId = window.location.pathname.split('/')[3];
    this.http
      .getTemplatesByStoreId(window.location.pathname.split('/')[2])
      .subscribe((res) => {
        this.pages = res;
        this.changePage(0);
      });
    this.http
      .getPoductsStore(window.location.pathname.split('/')[2])
      .subscribe((res: any) => {
        this.products = res;
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
      console.log('this.pages[i].html');
      console.log(this.pages[i].html);

      console.log('this.pages[i].css');
      console.log(this.pages[i].css);
      // this.isProductTemp = false;
    }
  }

  setCurrentProduct(product: any) {
    this.currentProduct = product;
  }

  executeBuy() {
    let data = {
      userId: this.userId,
      product: { ...this.currentProduct },
    };
    this.http.postBuyedProduct(data).subscribe(
      (res) => {
        this.alert.successAlert('Comprado', 'Producto comprado').then((res) => {
          location.reload();
        });
      },
      (err) => {
        this.alert.errorAlert(
          'Ocurrio un error',
          'Ocurrio un error al comprar el producto'
        );
      }
    );
  }
}
