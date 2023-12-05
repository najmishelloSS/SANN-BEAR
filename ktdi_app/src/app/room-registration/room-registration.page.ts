import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-registration',
  templateUrl: './room-registration.page.html',
  styleUrls: ['./room-registration.page.scss'],
})
export class RoomRegistrationPage implements OnInit {

  constructor() { 
     // Populate availableRooms with room numbers from 01 to 10
     for (let i = 1; i <= 10; i++) {
      const roomNumber = i < 10 ? `0${i}` : `${i}`;
      this.availableRooms.push({ number: roomNumber, isDisabled: false });
    }
  }

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
  availableRooms: { number: string; isDisabled?: boolean }[] = [];

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

  continueClicked() {
    if (this.selectedRoom) {
      // Display a message or perform actions with the selected room
      console.log(`Room ${this.selectedRoom} selected.`);
      // You can navigate to another page or perform any other actions here
    } else {
      // Handle the case when no room is selected
      console.log('Please select a room before continuing.');
    }
  }

  ngOnInit() {
  }

}

