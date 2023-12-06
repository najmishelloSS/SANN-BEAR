import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-registration',
  templateUrl: './room-registration.page.html',
  styleUrls: ['./room-registration.page.scss'],
})
export class RoomRegistrationPage implements OnInit {

  constructor() { }

  bookingModal = false; 

  // double Room
  doubleBlockModal = false;
  doubleLevelModal = false;
  doubleRoomModal = false;


  // Single Room 
  singleBlockModal = false;
  singleLevelModal = false;
  singleRoomModal = false;
  showRoomModal = false;

  selectedSegment: string = 'default';
  selectedLevel: string = 'default';
  selectedRoom: string = 'default';

  setOpen(isOpen: boolean, modalName: String) // open or close modal
  {
    if(modalName == "bookingModal"){
      this.bookingModal = isOpen; 
    }
    else if(modalName == "doubleBlockModal"){
      this.doubleBlockModal = isOpen; 
    }
    else if(modalName == "singleBlockModal"){
      this.singleBlockModal = isOpen; 
    }
    else if(modalName == "singleLevelModal"){
      this.singleLevelModal = isOpen; 
    }
    else if(modalName == "doubleLevelModal"){
      this.doubleLevelModal = isOpen; 
    }
    else if(modalName == "singleRoomModal"){
      this.singleRoomModal = isOpen; 
    }
    else if(modalName == "doubleRoomModal"){
      this.doubleRoomModal = isOpen; 
    }
    
    

  }

  selectBlock() {
    // Access the selected value from the ion-segment
    this.setOpen(true, this.selectedSegment);
  }

  selectLevel() {
    // Access the selected value from the ion-segment
    this.setOpen(true, this.selectedLevel);
  }

  selectRoom() {
    // Access the selected value from the ion-segment
    this.setOpen(true, this.selectedRoom);
  }

  ngOnInit() {
  }

}

