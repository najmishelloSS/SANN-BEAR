import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  data= {
    page:0,
  };

  constructor(
    private dataService:DataService,
    private router:Router
  ) { }


  ngOnInit() {
    setTimeout(()=> {
      this.data.page = this.data.page + 1
      this.dataService.setData(this.data.page, this.data);
      this.router.navigateByUrl('login/'+this.data.page);
    }, 3000);
  }

}
