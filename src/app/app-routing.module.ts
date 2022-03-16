import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CreateAnagraficaComponent } from './components/create-anagrafica/create-anagrafica.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {  path: 'lista', component: HomepageComponent, canActivate: [AuthGuard]  },
  { path: 'create', component: CreateAnagraficaComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
