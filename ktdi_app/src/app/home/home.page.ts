import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { ComponentsService } from '../service/components.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  contrustor(){}

  swiperSlides = [
    { id: 1, image: '../../assets/image/dewan.jpg', alt: 'Dewan Image', title: 'Dewan', description: 'Description for Dewan.' },
    { id: 2, image: '../../assets/image/ktdi.jpg', alt: 'KTDI Image', title: 'KTDI', description: 'Description for KTDI.' },
    { id: 3, image: '../../assets/image/utm.png', alt: 'UTM Image', title: 'UTM', description: 'Description for UTM.' }
  ];
  
 swiperSlideChanged(event: any) {
    // Your logic for handling slide change
    console.log('Swiper slide changed:', event);
  }

  data : any ;

  constructor(
    private route:ActivatedRoute,
    private toastController:ToastController,
    private loadingController:LoadingController,
    private dataservice:DataService,
    private router:Router,
    private navController:NavController,
    private component:ComponentsService
  ) {}

  ngOnInit() {
    if(this.route.snapshot.data['special']){
      this.data = this.route.snapshot.data['special'];
    }
    if(this.data == undefined){
      this.data.page = 1;
      this.navigate("splashscreen", "back");
    }
    console.log(this.data)
  }

  navigate(route, direction){
    this.component.navigate(route, this.data, direction)
  }

}
