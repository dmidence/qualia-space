import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-buys',
  templateUrl: './buys.component.html',
  styleUrls: ['./buys.component.css'],
})
export class BuysComponent implements OnInit {
  buys: any[] = [];
  constructor(private http: UserService) {
    this.http
      .getBuyedsProducts(window.location.pathname.split('/')[2])
      .subscribe((res: any) => {
        this.buys = res;
        console.log(res);
      });
  }

  ngOnInit(): void {}
}
