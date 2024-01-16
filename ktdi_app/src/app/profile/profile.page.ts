import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ComponentsService } from '../service/components.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name: any;
  data : any;
  language : any;
  

  constructor(
    private route:ActivatedRoute,
    public router : Router,
    public dataservice: DataService,
    public component: ComponentsService
  ) { }



/********************* Back End Section  *************************/ 
async ngOnInit() {
  if(this.route.snapshot.data['special']){
    this.data = this.route.snapshot.data['special'];
  }
  this.language = this.component.getLanguage(this.data.language) 
  if(this.data == undefined){
    this.data.page = 1;
    this.navigate("splashscreen", "back");
  }
  console.log(this.data)
}


/*****************************************************************/

  click(){
    console.log(this.name)
  }

  navigate(route, direction){
    this.component.navigate(route, this.data, direction);
  }

  inputValue = '';

  toggleInput() {
    if (!this.inputValue) {
      // Toggle only if there's no value in the input
      this.inputValue = '';
    }
  }

}
