import { AlertsService } from 'src/app/services/alerts.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

import * as ace from 'ace-builds';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
  styleUrls: ['./homeadmin.component.css'],
})
export class HomeadminComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
