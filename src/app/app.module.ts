import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppComponent } from './app.component';
import { EditComponent } from './routes/edit/edit.component';
import { PortfolioComponent } from './routes/portfolio/portfolio.component';

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
import { NewPersonaComponent } from './routes/new-persona/new-persona.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { IndexComponent } from './routes/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    PortfolioComponent,
    LoginRegisterComponent,    
    EducationComponent,
    ExperienceComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    SkillsComponent,
    MyProjectsComponent,
    NewPersonaComponent,
    NotFoundComponent,
    IndexComponent    
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RoundProgressModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
