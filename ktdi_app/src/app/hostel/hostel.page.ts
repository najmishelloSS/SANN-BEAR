import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ComponentsService } from '../service/components.service';
import { DataService } from '../service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hostel',
  templateUrl: './hostel.page.html',
  styleUrls: ['./hostel.page.scss'],
})
export class HostelPage implements OnInit {

  selectedSegment: string = 'double';
  emptyDoubleRooms : any;
  emptySingleRooms : any// Assuming you have arrays like doubleRooms and singleRooms
  filteredDoubleRooms: any;


  filteredSingleRooms: any;


  constructor(
    public component: ComponentsService,
    private navCtrl: NavController,
    public dataservice:DataService,
    public alertController: AlertController,
    private http: HttpClient,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getEmptyDoubleRoom(); 
    this.getEmptySingleRoom();
  }

  segmentChanged(event: any) {
    console.log('Segment changed', event.detail.value);
    // You can add additional logic here based on the selected segment
    // this.filterSingleRoom(); 
    // this.filterDoubleRoom(); 
  }

  async getEmptyDoubleRoom(){ //get all single room
    let formData = new FormData();

    this.component.getAPI(environment.ktdi_api +' double_room.php', formData, "get").subscribe( (response:any) => {
     console.log(response)
     this.emptyDoubleRooms = response.Room
     // Create an array of objects with all the room properties
     this.filteredDoubleRooms = this.emptyDoubleRooms.map(room => ({
      roomNumber: room["RoomNo"],
      block: room["Block"],
      status: room["Status"]
    }));
    }, error => {
        console.log(error)
        this.component.toast("Something went wrong, please try again later")
    });
  }

  async getEmptySingleRoom(){ //get all single room
    let formData = new FormData();
  
    this.component.getAPI(environment.ktdi_api +'single_room.php', formData, "get").subscribe( (response:any) => {
      console.log(response)
      this.emptySingleRooms = response.Room
  
      // Create an array of objects with all the room properties
      this.filteredSingleRooms = this.emptySingleRooms.map(room => ({
        roomNumber: room["RoomNumber"],
        block: room["Block"],
        status: room["Status"]
      }));
    }, error => {
      console.log(error)
      this.component.toast("Something went wrong, please try again later")
    });
  }

}
