import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = { email: '', password: '' };

  constructor(
    private http: UserService,
    private alert: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  Login() {
    this.http.login(this.user).subscribe({
      next: (res) => {
        sessionStorage.setItem('qspaceuser', JSON.stringify(res));
        this.router.navigate(['/', 'homeu']);
      },
      error: (e) => {
        this.alert.errorAlert(
          'Ocurrio un error',
          'Verifica tus credenciales de acceso'
        );
      },
    });
  }
}
