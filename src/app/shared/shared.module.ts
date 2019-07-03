import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './layout/footer/footer.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {OrderAdminPipe} from './order-admin.pipe';
import {ChartsModule} from 'ng2-charts';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    OrderAdminPipe
  ],
  exports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FormsModule,
    RouterModule,
    OrderAdminPipe,
    ChartsModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule,
    ChartsModule,
    AngularFireAuthModule,
  ]
})
export class SharedModule {
}
