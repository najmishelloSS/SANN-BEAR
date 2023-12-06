import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { ComponentsService } from '../service/components.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-bookhall',
  templateUrl: './bookhall.page.html',
  styleUrls: ['./bookhall.page.scss'],
})
export class BookhallPage implements OnInit {

  data : any ;
  date = new Date()
  language : any //language library

  constructor(
    public route:ActivatedRoute,
    public toastController:ToastController,
    public loadingController:LoadingController,
    public dataservice:DataService,
    public router:Router,
    public navController:NavController,
    public http:HttpClient,
    public component:ComponentsService
  ) { }

  ngOnInit() {
    if(this.route.snapshot.data['special']){
      this.data = this.route.snapshot.data['special'];
    }
    this.language = this.component.getLanguage(this.data.language) 
    console.log(this.language['Dewan Sri Resak'])
    if(this.data == undefined){
      this.data.page = 1;
      // this.navigate("splashscreen", this.data, "back") 
    }
    console.log(this.data)
  }

  navigate(route, direction){
    this.component.navigate(route, this.data, direction);
  }

  book(venue, price){
    console.log(venue, price)
  }

}
