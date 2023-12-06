import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { NavController } from '@ionic/angular';
import { ComponentsService } from '../service/components.service';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  data= {
    page:0,
    language: "english"
  };

  constructor(
    private dataService:DataService,
    private router:Router,
    private navController:NavController,
    private component: ComponentsService
  ) { }


  ngOnInit() {
    setTimeout(()=> {
      this.component.navigate("login", this.data, "forward")
    }, 3000);
  }

}
