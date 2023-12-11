//////////////DEPENDENCIES///////////////////////
import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../service/components.service';
import { NavController } from '@ionic/angular';
//////////////DEPENDENCIES///////////////////////

@Component({
  selector: 'app-room-registration',
  templateUrl: './room-registration.page.html',
  styleUrls: ['./room-registration.page.scss'],
})


export class RoomRegistrationPage implements OnInit {

  constructor(
    public component: ComponentsService,
    private navCtrl: NavController
  ) 
  { 
  }

  navigateToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  async navigateModal(location, destination) { //close old modal and open new modal
    this.setOpen(false, location) //close old modal
    const loading = await this.component.loadingController.create({ //generate loading interface
      message: "Please wait"
    });
    loading.present();
    setTimeout(async ()=> { //delay action for 1 second
      this.setOpen(true, destination) //open new modal
      loading.dismiss(); //close loading interface
    }, 1000);
  }


  roomTypeModal = true; 

  // *** Single Room Component ****
  availableBlockModalSingle = false; 
  availableLevelModalSingle = false;
  availableRoomModalSingle = false;
  displayRoomModalSingle = false; 


  selectRoomType: string = 'default'; 
  selectedBlock: string = 'default'; 
  selectedLevel: string = 'default'; 
  selectedRoom: string = 'default'; 


  // *** Double Room Variable *****

  availableBlockModalDouble = false; 
  availableLevelModalDouble = false;
  availableRoomModalDouble = false;
  displayRoomModalDouble= false; 



  setOpen(isOpen: boolean, modalName: String) // open or close modal
  { 
    if(modalName == "roomTypeModal"){
      this.roomTypeModal = isOpen; 
    }

    // **** Single Room Component ****
    else if (modalName == "availableBlockModalSingle")
    {
      this.availableBlockModalSingle = isOpen; 
    }
    else if (modalName == "availableBlockModalSingle")
    {
      this.availableBlockModalSingle = isOpen; 
    }
    else if (modalName == "availableLevelModalSingle")
    {
      this.availableLevelModalSingle = isOpen; 
    }
    else if (modalName == "availableRoomModalSingle")
    {
      this.availableRoomModalSingle = isOpen; 
    }
    else if (modalName == "displayRoomModalSingle")
    {
      this.displayRoomModalSingle = isOpen; 
    }


    // ** Double Room Component **** 

    else if (modalName == "displayRoomModalDouble")
    {
      this.displayRoomModalDouble = isOpen; 
    }

  }


  selectedRoomType () 
  {
   if (this.selectRoomType === 'single')
   {
    this.navigateModal('roomTypeModal','availableBlockModalSingle')
   }
   else
   {
    this.navigateModal('roomTypeModal','availableBlockModalDouble')
   }
  }


  availableRooms = ['101', '102', '103', '104', '105']; // Example room numbers

  selectRoom(roomNumber: string) {
    // Implement your logic when a room is selected
    console.log(`Room ${roomNumber} selected`);
  }

  // Function to check if a room is selected
isRoomSelected(roomNumber: string): boolean {
  return this.selectedRoom === roomNumber;
}


  ngOnInit() {
  }

}
