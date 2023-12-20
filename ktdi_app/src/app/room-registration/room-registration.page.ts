//////////////DEPENDENCIES///////////////////////
import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../service/components.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
//////////////DEPENDENCIES///////////////////////

@Injectable({
  providedIn: 'root',
})


@Component({
  selector: 'app-room-registration',
  templateUrl: './room-registration.page.html',
  styleUrls: ['./room-registration.page.scss'],
})


export class RoomRegistrationPage implements OnInit {

  emptyRooms : any;

  constructor(
    public component: ComponentsService,
    private navCtrl: NavController,
    public alertController: AlertController,
    private http: HttpClient,
  ) {}

  //****************************************** PHP SECTION *************************************************/

  ngOnInit() { //initialization
    this.getEmptyRoom()
  }

  async getEmptyRoom(){ //get all single room
    let formData = new FormData();

    this.component.getAPI('http://ktdiapp.mooo.com/api/single_room.php', formData, "get").subscribe( (response:any) => {
     console.log(response)
     this.emptyRooms = response.Room
    }, error => {
        console.log(error)
        this.component.toast("Something went wrong, please try again later")
    });
  }

  filterLevel(Level){
    let Block = this.selectedBlock
    let result
    for(let i = 0; i < this.emptyRooms.length ; i++){
      result = this.emptyRooms.filter(e => e["Block"] == Block) // filter out block != MA1
      result = result.filter(e => e["Level"] == Level) // filter out level != 1
    }
    console.log(result)
    return result.length // return count
  }

  filterBlock(Block){
    let result
    for(let i = 0; i < this.emptyRooms.length ; i++){
      result = this.emptyRooms.filter(e => e["Block"] == Block) // filter out block != MA1
    }
    console.log(result)
    return result.length // return array
  }

  filterRoom(Block,Level){
    let result = this.emptyRooms.filter(e => e["Block"] == Block) // filter out block != MA1
    result = result.filter(e => e["Level"] == Level) // filter out level != 1
    let roomNumbers = result.map(e => e["RoomNumber"]) // extract the RoomNumber property
    console.log (roomNumbers)
    return roomNumbers // return array of RoomNumber
  }

  
  //******************************************************************************************************/
 


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
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

    else if (modalName == "availableBlockModalDouble")
    {
      this.availableBlockModalDouble = isOpen; 
    }
    else if (modalName == "availableLevelModalDOuble")
    {
      this.availableLevelModalDouble = isOpen; 
    }
    else if (modalName == "availableRoomModalDouble")
    {
      this.availableRoomModalDouble = isOpen; 
    }

  }


  selectedRoomType () 
  {
   if (this.selectRoomType === 'single')
   {
    this.navigateModal('roomTypeModal','availableBlockModalSingle')
   }
   else if (this.selectRoomType === 'double')
   {
    this.navigateModal('roomTypeModal','availableBlockModalDouble')
   }
   else 
   {
    // Example usage:
    this.presentAlert('Please choose your room type!');
   }
  }


  selectedValue(location, destination) {
    switch (location) {
      case 'roomTypeModal':
        if (this.selectRoomType === 'single') {
          this.navigateModal('roomTypeModal', 'availableBlockModalSingle');
        } else if (this.selectRoomType === 'double') {
          this.navigateModal('roomTypeModal', 'availableBlockModalDouble');
        } else {
          this.presentAlert('Please choose your room type!');
        }
        break;
  
      case 'availableBlockModalSingle':
        if (this.selectedBlock === 'default') {
          this.presentAlert('Please choose your block!');
        } else {
          this.navigateModal(location, destination);
        }
        break;
  
      case 'availableLevelModalSingle':
        if (this.selectedLevel === 'default') {
          this.presentAlert('Please choose your level!');
        } else {
          this.navigateModal(location, destination);
        }
        break;
  
      // Double room 
  
      case 'availableBlockModalDouble':
        if (this.selectedBlock === 'default') {
          this.presentAlert('Please choose your block!');
        } else {
          this.navigateModal(location, destination);
        }
        break;
  
      case 'availableLevelModalDouble':
        if (this.selectedLevel === 'default') {
          this.presentAlert('Please choose your level!');
        } else {
          this.navigateModal(location, destination);
        }
        break;
      
  
      default:
        // Handle unexpected location value
        break;
    }
  }
  



  availableRooms = ['101','102']
  selectRoom(roomNumber: string) {
    // Implement your logic when a room is selected
    console.log(`Room ${roomNumber} selected`);
  }

  // Function to check if a room is selected
isRoomSelected(roomNumber: string): boolean {
  return this.selectedRoom === roomNumber;
}








}
