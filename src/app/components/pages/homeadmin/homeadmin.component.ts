import { AlertsService } from 'src/app/services/alerts.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
  styleUrls: ['./homeadmin.component.css'],
})
export class HomeadminComponent implements OnInit {
  allstores: any[];
  constructor(
    private http: UserService,
    private alert: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getAllStores() {
    console.log(this.allstores);
  }
}
