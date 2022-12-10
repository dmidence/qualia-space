import { AlertsService } from 'src/app/services/alerts.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeuser',
  templateUrl: './homeuser.component.html',
  styleUrls: ['./homeuser.component.css'],
})
export class HomeuserComponent implements OnInit {
  allstores: any[];
  userId;
  constructor(
    private http: UserService,
    private alert: AlertsService,
    private router: Router
  ) {
    this.userId = JSON.parse(
      sessionStorage.getItem('qspaceuser') || '{"dataUser":{"logged":false}}'
    ).dataUser._id;
  }

  ngOnInit(): void {
    this.getAllStores();
  }

  getAllStores() {
    this.http.getAllStores().subscribe((res: any) => {
      this.allstores = res;
      console.log(this.allstores);
    });
  }
}
