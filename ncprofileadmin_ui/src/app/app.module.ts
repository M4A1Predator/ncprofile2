import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageCheckerComponent } from './home/page-checker/page-checker.component';
import { WebSettingPageComponent } from './web-setting/web-setting-page/web-setting-page.component';
import { FieldsPageComponent } from './fields/fields-page/fields-page.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LoginPageComponent,
    HomePageComponent,
    MainLayoutComponent,
    FooterComponent,
    PageCheckerComponent,
    WebSettingPageComponent,
    FieldsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
