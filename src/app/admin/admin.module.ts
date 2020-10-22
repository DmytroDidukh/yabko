import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';

import {AdminLayoutComponent} from './shared/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AddPageComponent} from './add-page/add-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {OrdersPageComponent} from './orders-page/orders-page.component';
import {CanActivateGuard} from '../shared/can-activate.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {
            path: '', redirectTo: '/admin/login', pathMatch: 'full'
          },
          {
            path: 'login', component: LoginPageComponent
          },
          {
            path: 'dashboard', component: DashboardPageComponent, canActivate: [CanActivateGuard]
          },
          {
            path: 'add', component: AddPageComponent, canActivate: [CanActivateGuard]
          },
          {
            path: 'orders', component: OrdersPageComponent, canActivate: [CanActivateGuard]
          },
          {
            path: 'product/:id/edit', component: EditPageComponent, canActivate: [CanActivateGuard]
          },
        ]
      }
    ])
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    OrdersPageComponent
  ]
})

export class AdminModule {

}
