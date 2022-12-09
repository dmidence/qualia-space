import { SafehtmlPipe } from './pipes/safehtml.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { QuillModule } from 'ngx-quill';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LandingNavbarComponent } from './components/shared/landing-navbar/landing-navbar.component';
import { LandingFooterComponent } from './components/shared/landing-footer/landing-footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterEnterpriseComponent } from './pages/register-enterprise/register-enterprise.component';
import { HomeuserComponent } from './pages/homeuser/homeuser.component';
import { HomeenterpriseComponent } from './pages/homeenterprise/homeenterprise.component';
import { StoreComponent } from './pages/store/store.component';
import { PreviewComponent } from './components/preview/preview.component';
import { SafeHtml } from '@angular/platform-browser';
import { HomeadminComponent } from './components/pages/homeadmin/homeadmin.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LandingNavbarComponent,
    LandingFooterComponent,
    LoginComponent,
    RegisterUserComponent,
    RegisterEnterpriseComponent,
    HomeuserComponent,
    HomeenterpriseComponent,
    StoreComponent,
    PreviewComponent,
    SafehtmlPipe,
    HomeadminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxEditorModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
