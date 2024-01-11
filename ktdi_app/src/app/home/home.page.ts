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
    { id: 1, image: '../../assets/image/dewan.jpg', alt: 'Dewan Image', title: 'Dewan', description: 'Welcome to Hall Dewan, a versatile and dynamic event space designed to cater to a wide array of functions and gatherings. Nestled within the vibrant campus of the Universiti Teknologi Malaysia (UTM), Hall Dewan boasts state-of-the-art facilities and a modern aesthetic that sets the stage for memorable events. Whether hosting academic conferences, cultural performances, or social gatherings, Hall Dewan provides a spacious and adaptable environment to suit diverse needs. With its contemporary design and technological amenities, it stands as a symbol of UTMs commitment to fostering a collaborative and engaging community.' },
    { id: 2, image: '../../assets/image/ktdi.jpg', alt: 'KTDI Image', title: 'KTDI', description: 'The Kolej Tun Dr. Ismail (KTDI) at Universiti Teknologi Malaysia (UTM) is more than just a residence; it is a vibrant and inclusive community where students forge lasting connections and experiences. KTDI Colleagues are individuals dedicated to fostering a supportive and enriching living environment within the college. These colleagues play a crucial role in creating a sense of belonging and facilitating a variety of activities that contribute to the holistic development of residents. With a focus on academic success, personal growth, and community engagement, KTDI Colleagues exemplify the spirit of camaraderie and collaboration that defines the UTM experience.' },
    { id: 3, image: '../../assets/image/utm.png', alt: 'UTM Image', title: 'UTM', description: 'The Universiti Teknologi Malaysia (UTM) stands as a beacon of academic excellence, innovation, and research in the heart of Malaysia. As a leading institution of higher learning, UTM is committed to shaping future leaders and contributing to the advancement of knowledge across various disciplines. With a diverse and vibrant campus community, UTM provides a nurturing environment for students to explore, learn, and thrive. The universitys commitment to research, education, and community engagement is reflected in its state-of-the-art facilities, dedicated faculty, and a rich tapestry of academic programs. At UTM, students are not just gaining an education; they are becoming part of a tradition of excellence that prepares them for success in the global arena.' }
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

  updateProfile() {
    // Add logic for updating profile
  }

  logout() {
    // Add logic for logging out
  }

}
