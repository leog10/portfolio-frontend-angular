import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CirclesModule } from './circles/circles.module';
import { EditComponent } from './routes/edit/edit.component';
import { PortfolioComponent } from './routes/portfolio/portfolio.component';
import { LoginComponent } from './routes/login/login.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsComponent } from './components/skills/skills.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: PortfolioComponent, pathMatch: 'full'},
  {path: 'edit', component: EditComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    PortfolioComponent,
    LoginComponent,
    AboutMeComponent,
    EducationComponent,
    ExperienceComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    SkillsComponent,
    MyProjectsComponent,
  ],
  imports: [
    BrowserModule,
    CirclesModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
