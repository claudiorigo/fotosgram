import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { ComponentsModule } from 'src/app/components/components.module';

import { LoginPage } from './login.page';


const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    //ComponentsModule
  ],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
