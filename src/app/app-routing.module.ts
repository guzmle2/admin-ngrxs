import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminGuard} from './admin/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.routing').then(m => m.AuthRouting)
  },
  {
    path: 'in',
    loadChildren: () => import('src/app/admin/admin.routing').then(m => m.AdminRouting)
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
