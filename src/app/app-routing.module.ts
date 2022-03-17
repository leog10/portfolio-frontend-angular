import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './auth/login/login.component';
import { NewPersonaComponent } from './routes/new-persona/new-persona.component';
import { EditComponent } from './routes/edit/edit.component';
import { PortfolioComponent } from './routes/portfolio/portfolio.component';
import { LoginGuard } from './guards/login.guard';
import { NewPersonaGuard } from './guards/new-persona.guard';
import { EditGuard } from './guards/portfolio.guard';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { IndexComponent } from './routes/index/index.component';
import { SendEmailComponent } from './changepassword/send-email/send-email.component';
import { ChangePasswordComponent } from './changepassword/change-password/change-password.component';

const routes: Routes = [  
  {path: 'login', component: LoginRegisterComponent, canActivate: [LoginGuard]},
  {path: 'new', component: NewPersonaComponent, canActivate: [NewPersonaGuard]},
  {path: 'portfolio/:username', component: PortfolioComponent, canActivate: [EditGuard]},
  {path: 'edit/:username', component: EditComponent, canActivate: [EditGuard]},
  {path: '404', component: NotFoundComponent},
  {path: 'inicio', component: IndexComponent},
  {path: 'recuperar-cuenta', component: SendEmailComponent},
  {path: 'cambiar-password/:tokenPassword', component: ChangePasswordComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '**', redirectTo: '404', pathMatch: 'full'}  
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }