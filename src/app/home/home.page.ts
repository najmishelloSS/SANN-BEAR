import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  name : any ;

  constructor(
    public router : Router,
    public dataservice : DataService
  ) {}

  submit(){
    this.dataservice.setData(1, this.name);
    this.router.navigateByUrl("profile/1");
  }

  navigate(){
    console.log("Test")
    this.router.navigateByUrl("profile/1");
  }

}
