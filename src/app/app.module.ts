import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthService } from './services/auth.service';
import { ChatComponent } from './componentes/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { PhotoService } from './services/photo.service';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ListadoJuegosComponent } from './componentes/listado-juegos/listado-juegos.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    QuienSoyComponent,
    RegistroComponent,
    ChatComponent,
    EncuestaComponent,
    ListadoJuegosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }