import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './auth/login/login.component';
import { NewPersonaComponent } from './routes/new-persona/new-persona.component';
import { EditComponent } from './routes/edit/edit.component';
import { PortfolioComponent } from './routes/portfolio/portfolio.component';
import { LoginGuard } from './guards/login.guard';
import { NewPersonaGuard } from './guards/new-persona.guard';
import { EditGuard } from './guards/portfolio.guard';

const routes: Routes = [  
  {path: 'login', component: LoginRegisterComponent, canActivate: [LoginGuard]},
  {path: 'new', component: NewPersonaComponent, canActivate: [NewPersonaGuard]},
  {path: 'portfolio/:username', component: PortfolioComponent, canActivate: [EditGuard]},
  {path: 'edit/:username', component: EditComponent, canActivate: [EditGuard]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
