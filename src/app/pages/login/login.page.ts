import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    email: 'claudiorigo@gmail.com',
    password: '123456'
  };

  registerUser: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor( 
    private usuarioService: UsuarioService,
    private  navController: NavController,
    private uiService: UiServiceService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    //bloquear el slider login con el registro
    this.slides.lockSwipes( true );
  }

  async login( fLogin: NgForm ){
    if ( fLogin.invalid ) { return; }

    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
      //navegar al tabs
      this.navController.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      //mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos.');
    }
    
  }

  async registro( fRegistro: NgForm ){

    if ( fRegistro.invalid ) { return; }
    //console.log(fRegistro.valid);
    const valido = await this.usuarioService.registro( this.registerUser );
    if ( valido ) {
      //navegar al tabs
      this.navController.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      //mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Ese correo electronico ya existe.');
    }
  }

  mostrarRegistro(){
    this.slides.lockSwipes( false );
    this.slides.slideTo(0);
    this.slides.lockSwipes( true );
  }

  mostrarLogin(){
    this.slides.lockSwipes( false );
    this.slides.slideTo(1);
    this.slides.lockSwipes( true );
  }

}
