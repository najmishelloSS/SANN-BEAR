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
  openRoomModal : string = 'roomModal'; 


  selectedBlock: string = 'default'; 
  selectedRoom: string = 'default'; 

  setOpen(isOpen: boolean, modalName: String) // open or close modal
  { 
    if(modalName == "blockModal"){
      this.blockModal = isOpen; 
    }
    else if (modalName == "roomModal")
    {
      this.roomModal = isOpen; 
    }

  }

  selectBlockType () 
  {
    this.setOpen(true, this.openRoomModal);
  }


  ngOnInit() {
  }

}
