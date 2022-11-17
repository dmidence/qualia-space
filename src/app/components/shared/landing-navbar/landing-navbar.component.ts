import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-navbar',
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.css'],
})
export class LandingNavbarComponent implements OnInit {
  currentUser = JSON.parse(
    sessionStorage.getItem('qspaceuser') || '{"dataUser":{"logged":false}}'
  ).dataUser;
  constructor(private router: Router) {
    console.log(this.currentUser);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {}
}
