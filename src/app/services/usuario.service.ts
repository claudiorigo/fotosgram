import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};
  private _storage: Storage | null = null;

  constructor( 
    private http: HttpClient,
    private storage: Storage,
    private navController: NavController ) { 
      
    this.Init();
  }

  //Inicialización del app creando el storage
  async Init(){
    //crear mi storage
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //Login usuario
  login( email: string, password: string ) {
    const data = { email, password };
    return new Promise( resolve => {
      this.http.post(` ${ URL }/user/login `, data).subscribe( resp => {
        console.log(resp);
        if ( resp['ok'] ) {
          this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  //Registrar nuevo Usuario
  registro( usuario: Usuario ){
    return new Promise( resolve => {
      this.http.post( `${ URL }/user/create`, usuario ).subscribe( resp => {
        console.log(resp);
        if ( resp['ok'] ) {
          this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  //Enviar usuario para Actualizar
  getUsuario(){

    if ( !this.usuario._id ) {
      this.validaToken();
    }

    return { ...this.usuario };
  }

  //Guardar Token
  async guardarToken( token: string ){
    this.token = token;
    await this._storage.set('token', token);
  }

  //Cargar Token
  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

  //Valida Token
  async validaToken(){

    await this.cargarToken();
    
    if ( !this.token ) {
      this.navController.navigateRoot( '/login' );
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get( `${ URL }/user/`, { headers } ).subscribe( resp => {

        if ( resp['ok'] ){
          this.usuario = resp['usuario'];
          resolve(true);
        } else {
          this.navController.navigateRoot( '/login' );
          resolve(false);
        }
      });
    });
  }

  //Actualizar Usuario
  actualizarUsuario( usuario: Usuario ){
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    return new Promise( resolve => {
      this.http.post(`${ URL }/user/update`, usuario, { headers }).subscribe( resp => {  
        if ( resp['ok'] ) {
          this.guardarToken( resp['token'] );
          resolve(true);
          //enviar mensaje de exito
        } else {
          resolve(false);
          //enviar mensaje de error
        }  
      });
    });
  }

  
}
