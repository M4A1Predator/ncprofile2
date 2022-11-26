import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { FieldsPageComponent } from './fields/fields-page/fields-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AuthGuard } from './services/auth-guard';
import { WebSettingPageComponent } from './web-setting/web-setting-page/web-setting-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'web-setting', component: WebSettingPageComponent },
  { path: 'fields', component: FieldsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
