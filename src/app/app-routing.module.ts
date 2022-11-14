import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterEnterpriseComponent } from './pages/register-enterprise/register-enterprise.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { HomeuserComponent } from './pages/homeuser/homeuser.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeenterpriseComponent } from './pages/homeenterprise/homeenterprise.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registeru', component: RegisterUserComponent },
  { path: 'registere', component: RegisterEnterpriseComponent },
  { path: 'homeu', component: HomeuserComponent, canActivate: [AuthGuard] },
  {
    path: 'homee',
    component: HomeenterpriseComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
