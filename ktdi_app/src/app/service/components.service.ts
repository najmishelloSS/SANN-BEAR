import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {


  constructor(
    public route: ActivatedRoute,
    public dataservice:DataService,
    public router:Router,
    public navController:NavController,
    public loadingController:LoadingController,
    public http:HttpClient,
    public toastController:ToastController
  ) { }

  getAPI(link, formData, type){
    if(type == "get"){ //get API
      return this.http.get(link, formData)
    }else{ //post API
      return this.http.post(link, formData)
    }
  }

  emailValid(email){
    const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    const result: boolean = expression.test(email);
    return result
  }

  async toast(message){
    const toast = await this.toastController.create({
      message: message,
                duration: 2000,
                buttons: [
                  {
                  icon: "close",
                  role: 'dismiss',
                  }
                ]
    });
    toast.present();
  }

  navigate(route, data, direction){
    this.navController.setDirection(direction,false); //set navigation animation
    data.page = data.page + 1 // add 1 to page number eg home/1 -> profile/2
    this.dataservice.setData(data.page, data); //save data before navigating
    this.router.navigateByUrl(route+"/"+data.page); //navigate to page eg profile/2
  }

}
