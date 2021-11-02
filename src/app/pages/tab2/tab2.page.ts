import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo = false;

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }
  
  constructor( 
    private postsService: PostsService,
    private route: Router,
    private geolocation: Geolocation ) {} 

  async crearPost(){
    //console.log(this.post);
    const creado = await this.postsService.crearPost( this.post );

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };
    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo(){
    //console.log(this.post);
    if ( !this.post.posicion ) {
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;
    
    this.geolocation.getCurrentPosition().then((resp) => {
      
      this.cargandoGeo = false;

      const coords = `${ resp.coords.latitude }, ${ resp.coords.longitude }`;
      //console.log(coords);
      this.post.coords = coords;

    }).catch((error) => {
        console.log('Error al obtener la ubicación', error);
        this.cargandoGeo = false;
    });
     

  }





}
