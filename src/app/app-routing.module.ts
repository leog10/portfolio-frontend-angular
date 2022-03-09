import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './auth/login/login.component';
import { NewPersonaComponent } from './routes/new-persona/new-persona.component';
import { EditComponent } from './routes/edit/edit.component';
import { PortfolioComponent } from './routes/portfolio/portfolio.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: 'portfolio/:username', component: PortfolioComponent},
  {path: 'login', component: LoginRegisterComponent, canActivate: [LoginGuard]},
  {path: 'new', component: NewPersonaComponent},  
  {path: 'edit/:username', component: EditComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
