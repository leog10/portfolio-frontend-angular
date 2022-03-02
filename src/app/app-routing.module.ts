import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './auth/login/login.component';
import { NewPersonaComponent } from './new-persona/new-persona.component';
import { EditComponent } from './routes/edit/edit.component';
import { PortfolioComponent } from './routes/portfolio/portfolio.component';

const routes: Routes = [
  {path: 'portfolio/:username', component: PortfolioComponent},
  {path: 'login', component: LoginRegisterComponent},
  {path: 'new', component: NewPersonaComponent},  
  {path: 'edit/:username', component: EditComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
