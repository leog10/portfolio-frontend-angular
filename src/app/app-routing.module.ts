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

const routes: Routes = [  
  {path: 'login', component: LoginRegisterComponent, canActivate: [LoginGuard]},
  {path: 'new', component: NewPersonaComponent, canActivate: [NewPersonaGuard]},
  {path: 'portfolio/:username', component: PortfolioComponent, canActivate: [EditGuard]},
  {path: 'edit/:username', component: EditComponent, canActivate: [EditGuard]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
  //{path: '**', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }