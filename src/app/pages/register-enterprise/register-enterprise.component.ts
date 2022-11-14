import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-register-enterprise',
  templateUrl: './register-enterprise.component.html',
  styleUrls: ['./register-enterprise.component.css'],
})
export class RegisterEnterpriseComponent implements OnInit {
  user: any = {
    enterprise: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    plan: '',
    owner: '',
    cardNum: '',
    csv: '',
    user_type: 'enterprise',
  };
  constructor(
    private http: UserService,
    private alert: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  Registere() {
    this.http.register(this.user).subscribe({
      next: (res) => {
        this.alert.successAlert(
          'Registro Exitoso',
          'Tus datos se han registrado exitosamente'
        );
        this.router.navigate(['/', 'login']);
      },
      error: (e) => {
        this.alert.errorAlert(
          'Ocurrio un error',
          'Verifica los Campos del Registro'
        );
      },
    });
  }
}
