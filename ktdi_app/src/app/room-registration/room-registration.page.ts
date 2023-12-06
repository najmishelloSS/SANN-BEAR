import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-registration',
  templateUrl: './room-registration.page.html',
  styleUrls: ['./room-registration.page.scss'],
})

//new coding


export class RoomRegistrationPage implements OnInit {

  constructor() { 
  }

  

  blockModal = false; 
  roomModal = false; 
  displayRoomModal = false; 

  selectedBlock: string = 'default'; 
  selectedRoom: string = 'default'; 
  generatedRoomNumber: string = '';

  setOpen(isOpen: boolean, modalName: String) // open or close modal
  { 
    if(modalName == "blockModal"){
      this.blockModal = isOpen; 
    }
    else if (modalName == "roomModal")
    {
      this.roomModal = isOpen; 
    }
    else if (modalName == 'displayRoomModal')
    {
      this.displayRoomModal = isOpen;
    }

  }

  selectBlockType () 
  {
    this.setOpen(true, 'roomModal');
  }

  // Function to generate a random floor and room number
generateRandomRoomNumber(): string {
  const floors = ['G', '1', '2', '3'];
  const randomFloor = floors[Math.floor(Math.random() * floors.length)];
  const randomRoom = Math.floor(Math.random() * 60) + 1; // Generates a random number between 1 and 60
  return `${randomFloor}${randomRoom}`;
}

  confirmClicked() {
    // Generate a random room number
    this.generatedRoomNumber = this.generateRandomRoomNumber();
  
    // Open the modal to display the room number
    this.setOpen(true, 'displayRoomModal');
  }

 

  ngOnInit() {
  }

}
