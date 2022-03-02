import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CirclesModule } from './circles/circles.module';
import { EditComponent } from './routes/edit/edit.component';
import { PortfolioComponent } from './routes/portfolio/portfolio.component';

import { AboutMeComponent } from './components/about-me/about-me.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsComponent } from './components/skills/skills.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { AppRoutingModule } from './app-routing.module';
import { interceptorProvider } from './interceptors/interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRegisterComponent } from './auth/login/login.component';
import { NewPersonaComponent } from './new-persona/new-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    PortfolioComponent,
    LoginRegisterComponent,
    AboutMeComponent,
    EducationComponent,
    ExperienceComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    SkillsComponent,
    MyProjectsComponent,
    NewPersonaComponent    
  ],
  imports: [
    BrowserModule,
    CirclesModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
