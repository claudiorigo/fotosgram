import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, AfterViewInit {  

  @Input() coords: string;
  @ViewChild('mapa') mapa;
  //lat: number;
  //lng: number;

  constructor( private route: ActivatedRoute ) { }

  ionViewDidEnter(){
    
  }

  ngOnInit(){
    
    
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);
    
    console.log(lat,lng);
    
   
    

    
    
  }

  

  ionViewWillEnter() {
    //console.log(this.coords);

    

    
    
    
    
    
    

    
    

    
      
  }

  ngAfterViewInit(){
    
    /*

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2xhdWRpb3JpZ28iLCJhIjoiY2t2ZGI0azVoOWEyNTJ1b2Z2am84bXhoeCJ9.eEKOemrlqpJu4t36ie62fw';
    const map = new mapboxgl.Map({

      container: this.mapa.nativeElement,    
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lng, this.lat],
      zoom: 15

    });

    //map.addControl(new mapboxgl.NavigationControl());
    
    

    //-33.0578361     -71.624409
    
    const marker = new mapboxgl.Marker()
      .setLngLat( [ this.lng, this.lat ] )
      .addTo( map );
    */
    
  }

  

}
