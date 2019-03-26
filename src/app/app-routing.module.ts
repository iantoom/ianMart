import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},

  // load children value format is '{path/to/modulefiles}#{NameOfModuleClass}'
  {path: 'login', component: LoginComponent},
  {path: 'login/:redirectUrl', component: LoginComponent},

  {
    path: 'manager',
    loadChildren: './manager/manager.module#ManagerModule',
    canLoad: [AuthGuardService]
  },

  {path: 'user', loadChildren: './user/user.module#UserModule'},
  {path: 'pos', loadChildren: './pos/pos.module#PosModule'},
  {path: 'inventory', loadChildren: './inventory/inventory.module#InventoryModule'},

  // make sure the path to error 404 is on the last array
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
