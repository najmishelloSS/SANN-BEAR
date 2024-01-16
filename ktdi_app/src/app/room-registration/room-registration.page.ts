//////////////DEPENDENCIES///////////////////////
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ComponentsService } from '../service/components.service';
import { DataService } from '../service/data.service';
import { environment } from 'src/environments/environment';
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

  emptySingleRooms : any;
  emptyDoubleRooms : any;
  data: any;
  dataFromPreviousPage: any;
  validateSingleRooms : any;
  validateDoubleRooms : any; 

  constructor(
    public component: ComponentsService,
    private navCtrl: NavController,
    public dataservice:DataService,
    public alertController: AlertController,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  //****************************************** PHP SECTION *************************************************/
ngOnInit() { //initialization
    this.getEmptySingleRoom() 
    this.getEmptyDoubleRoom()
    this.fetchPreviousPageData()
  }



  // ******************************** Fetch data from Homepage *****************

async  fetchPreviousPageData() {
    if(this.route.snapshot.data['special']){
      this.data = this.route.snapshot.data['special'];
    }
  
    if(this.data == undefined){
      this.data.page = 1;
      this.navigateToHome();
    }
    console.log(this.data)
    this.checkSingleRoomForUser(this.data.login.user_id)
    this.checkDoubleRoomForUser(this.data.login.user_id)
    }

// ******************************** Evaluate if user already registered room *****************


// Function to check if the user has a room in Single Room
async checkSingleRoomForUser(id: number) {
  let formData = new FormData();
  let user_id = id.toString ();
  this.component.getAPI(environment.ktdi_api +'single_room.php', formData, "get").subscribe( (response:any) => {
     console.log(response)
     this.validateSingleRooms = response.Room
     let result = this.validateSingleRooms.filter(e => e["user_id"] == user_id)
     if (result.length > 0) {
      // User has a room
      let roomNumbers = result.map(e => e["RoomNumber"]) // extract the RoomNumber property
      this.selectedRoom = roomNumbers; 
      console.log(this.selectedRoom);
      this.navigateToDisplayRoomModal('displayRoomModalSingle')
      // Now you can use result.RoomNumber as needed
    } else {
      // User does not have a room
      console.log('User does not have a single room');
    }
    }, error => {
        console.log(error)
        this.component.toast("Something went wrong, please try again later")
    });
}

// Function to check if the user has a room in double Room
async checkDoubleRoomForUser(id: number) {
  let formData = new FormData();
  let user_id = id.toString ();
  this.component.getAPI(environment.ktdi_api +'double_room.php', formData, "get").subscribe( (response:any) => {
     console.log(response)
     this.validateDoubleRooms = response.Room
     let result = this.validateDoubleRooms.filter(e => e["user_id"] == user_id)
     if (result.length > 0) {
      // User has a room
      let roomNumbers = result.map(e => e["RoomNo"]) // extract the RoomNumber property
      this.selectedRoom = roomNumbers; 
      console.log(this.selectedRoom);
      this.navigateToDisplayRoomModal('displayRoomModalDouble')
      // Now you can use result.RoomNumber as needed
    } else {
      // User does not have a room
      console.log('User does not have a double room');
    }
    }, error => {
        console.log(error)
        this.component.toast("Something went wrong, please try again later")
    });
}


  // ********************************* Single Room *********************

  

  async getEmptySingleRoom(){ //get all single room
    let formData = new FormData();

    this.component.getAPI(environment.ktdi_api +'single_room.php', formData, "get").subscribe( (response:any) => {
     console.log(response)
     this.emptySingleRooms = response.Room
    }, error => {
        console.log(error)
        this.component.toast("Something went wrong, please try again later")
    });
  }




  filterSingleLevel(Level){
    let Status = "Empty"
    let Block = this.selectedBlock
    let result
    for(let i = 0; i < this.emptySingleRooms.length ; i++){
      result = this.emptySingleRooms.filter(e => e["Block"] == Block) // filter out block != MA1
      result = result.filter(e => e["Level"] == Level) // filter out level != 1
      result = result.filter(e => e["Status"] == Status) // filter out status = "Empty"
    }
    console.log(result)
    return result.length // return count
  }

  filterSingleBlock(Block){
    let Status = "Empty"
    let result
    for(let i = 0; i < this.emptySingleRooms.length ; i++){
      result = this.emptySingleRooms.filter(e => e["Block"] == Block) // filter out block != MA1
      result = result.filter(e => e["Status"] == Status) // filter out status = "Empty"
    }
    console.log(result)
    return result.length // return array
  }

  filterSingleRoom(Block,Level){
    console.log (this.selectedLevel); 
    console.log(this.selectedBlock);
    let Status = "Empty"
    let result = this.emptySingleRooms.filter(e => e["Block"] == Block) // filter out block != MA1
    result = result.filter(e => e["Level"] == Level) // filter out level != 1
    result = result.filter(e => e["Status"] == Status) // filter out status = "Empty"
    let roomNumbers = result.map(e => e["RoomNumber"]) // extract the RoomNumber property
    console.log (roomNumbers)
    return roomNumbers // return array of RoomNumber
  }


  // ******************************* UPDATE SINGLE ROOM ********************

  async updateSingleRoom(block: string, level: string, roomNumber: string, status: string, user_id: number){ //get all single room
    // var headers = new Headers();
    //   headers.append("Accept", 'application/json');
    //   headers.append('Content-Type', 'application/json');
    let requestData = { Block: block, Level: level, RoomNumber: roomNumber, Status : status, User_id: user_id };
    this.component.getAPI(environment.ktdi_api +'update_single_room.php', requestData, "POST").subscribe( (response:any) => {
     console.log(response)
    }, error => {
        console.log(error)
        this.component.toast("Something went wrong, please try again later")
    });
  }

  updateSingleRoomStatus ()
  {
    let block = this.selectedBlock
    let level = this.selectedLevel
    let room = this.selectedRoom
    let status = 'Full'
    let user_id = this.data.login.user_id;
    console.log(this.selectedBlock)
    console.log(this.selectedLevel)
    console.log(this.selectedRoom)
    console.log(user_id)
    this.updateSingleRoom(block,level,room,status,user_id)
  }


    // ******************************* UPDATE DOUBLE ROOM ********************

    async updateDoubleRoom(block: string, level: string, roomNumber: string, status: string, user_id: number){ //get all single room
      // var headers = new Headers();
      //   headers.append("Accept", 'application/json');
      //   headers.append('Content-Type', 'application/json');
      let requestData = { Block: block, Level: level, RoomNumber: roomNumber, Status : status, User_id: user_id };
      this.component.getAPI(environment.ktdi_api +'update_double_room.php', requestData, "POST").subscribe( (response:any) => {
       console.log(response)
      }, error => {
          console.log(error)
          this.component.toast("Something went wrong, please try again later")
      });
    }
  
    updateDoubleRoomStatus ()
    {
      let block = this.selectedBlock
      let level = this.selectedLevel
      let room = this.selectedRoom
      let user_id = this.data.login.user_id;
      let status1 = "Half"
      let status2 = "Full"
      console.log(this.selectedBlock)
      console.log(this.selectedLevel)
      console.log(this.selectedRoom)
      console.log(user_id)

      if (this.doubleRoomStatus == "Half")
      {
        this.updateDoubleRoom(block,level,room,status2,user_id)
      }
      else
      {
        this.updateDoubleRoom(block,level,room,status1,user_id)
      }

    }


  // ******************************* DOUBLE ROOM ****************************

  
  async getEmptyDoubleRoom(){ //get all single room
    let formData = new FormData();

    this.component.getAPI(environment.ktdi_api +'double_room.php', formData, "get").subscribe( (response:any) => {
     console.log(response)
     this.emptyDoubleRooms = response.Room
    }, error => {
        console.log(error)
        this.component.toast("Something went wrong, please try again later")
    });
  }

  filterDoubleLevel(Level){
    let Status1 = "Empty"
    let Status2 = "Half"
    let Block = this.selectedBlock
    let result
    for(let i = 0; i < this.emptyDoubleRooms.length ; i++){
      result = this.emptyDoubleRooms.filter(e => e["Block"] == Block) // filter out block != MA1
      result = result.filter(e => e["Level"] == Level) // filter out level != 1
      result = result.filter(
        (e) => e["Status"] == Status1 || e["Status"] == Status2
      );
    }
    console.log(result)
    return result.length // return count
  }

  filterDoubleBlock(Block){
    let Status1 = "Empty"
    let Status2 = "Half"
    let result
    for(let i = 0; i < this.emptyDoubleRooms.length ; i++){
      result = this.emptyDoubleRooms.filter(e => e["Block"] == Block) // filter out block != MA1
      result = result.filter(
        (e) => e["Status"] == Status1 || e["Status"] == Status2
      );
    }
    console.log(result)
    return result.length // return array
  }

  filterDoubleRoom(Block,Level){
    console.log (this.selectedLevel); 
    console.log(this.selectedBlock);
    let Status1 = "Empty"
    let Status2 = "Half"
    let result = this.emptyDoubleRooms.filter(e => e["Block"] == Block) // filter out block != MA1
    result = result.filter(e => e["Level"] == Level) // filter out level != 1
    result = result.filter(
      (e) => e["Status"] == Status1 || e["Status"] == Status2
    );
    let roomNumbers = result.map(e => e["RoomNo"]) // extract the RoomNumber property
    console.log (roomNumbers)
    return roomNumbers // return array of RoomNumber
  }

  getDoubleRoomStatus(Block,Level,Room){
    console.log (this.selectedLevel); 
    console.log(this.selectedBlock);
    console.log(this.selectRoom);
    
    let result = this.emptyDoubleRooms.filter(e => e["Block"] == Block) // filter out block != MA1
    result = result.filter(e => e["Level"] == Level) // filter out level != 1
    result = result.filter((e) => e["RoomNo"] == Room)
    let roomNumbers = result.map(e => e["Status"]) // extract the RoomNumber property
    this.doubleRoomStatus = roomNumbers
    console.log(this.doubleRoomStatus)
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

  navigate(route, direction){
    this.component.navigate(route, this.data, direction);
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

  async navigateToDisplayRoomModal(destination) {
    this.roomTypeModal = false;
    const loading = await this.component.loadingController.create({
      message: "Please wait"
    });
  
    loading.present();
  
    setTimeout(async () => {
      this.setOpen(true,destination)
      loading.dismiss();
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
  doubleRoomStatus: string ;

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
    else if (modalName == "availableLevelModalDouble")
    {
      this.availableLevelModalDouble = isOpen; 
    }
    else if (modalName == "availableRoomModalDouble")
    {
      this.availableRoomModalDouble = isOpen; 
    }
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

        case 'availableRoomModalSingle':
          if (this.selectedRoom === 'default') {
            this.presentAlert('Please choose your room number!');
          } else {
            this.updateSingleRoomStatus ();
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

        case 'availableRoomModalDouble':
          if (this.selectedRoom === 'default') {
            this.presentAlert('Please choose your room number!');
          } else {
            this.getDoubleRoomStatus(this.selectedBlock,this.selectedLevel,this.selectedRoom);
            this.updateDoubleRoomStatus();
            this.navigateModal(location, destination);
          }
          break;
  
      default:
        // Handle unexpected location value
        break;
    }
  }
  



  selectRoom(roomNumber: string) {
    // Implement your logic when a room is selected
    this.selectedRoom = roomNumber;
    console.log(`Room ${roomNumber} selected`);
  }



  // Function to check if a room is selected
isRoomSelected(roomNumber: string): boolean {
  return this.selectedRoom === roomNumber;
}








}
