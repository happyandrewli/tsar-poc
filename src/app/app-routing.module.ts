import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesPageComponent } from './series/series-page/series-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SeriesPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
