import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name: any;

  constructor(
    private route:ActivatedRoute,
    public router : Router,
    public dataservice: DataService
  ) { }

  async ngOnInit() {
    if(this.route.snapshot.data['special']){
      this.name = this.route.snapshot.data['special'];
    }
    console.log(this.name)
  }

  click(){
    console.log(this.name)
  }

  navigate(){
    this.router.navigateByUrl("home");
  }

}
