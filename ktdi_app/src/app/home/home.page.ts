import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { ComponentsService } from '../service/components.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

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
