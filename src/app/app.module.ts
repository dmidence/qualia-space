import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LandingNavbarComponent } from './components/shared/landing-navbar/landing-navbar.component';
import { LandingFooterComponent } from './components/shared/landing-footer/landing-footer.component';

@NgModule({
  declarations: [AppComponent, LandingComponent, LandingNavbarComponent, LandingFooterComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
