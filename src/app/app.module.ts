import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SubscribeFormComponent } from './layout/footer/subscribe-form/subscribe-form.component';
import { SocialButtonComponent } from './layout/footer/social-button/social-button.component';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './features/catalog/catalog.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, SideBarComponent, FooterComponent, SubscribeFormComponent, CatalogComponent, HttpClientModule, HeaderComponent],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
