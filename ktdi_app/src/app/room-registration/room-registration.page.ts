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

  

  roomTypeModal = false; 
  availableBlockModal = false; 

  selectRoomType: string = 'default'; 
  selectedBlock: string = 'default'; 
  generatedRoomNumber: string = '';

  setOpen(isOpen: boolean, modalName: String) // open or close modal
  { 
    if(modalName == "roomTypeModal"){
      this.roomTypeModal = isOpen; 
    }
    else if (modalName == "availableBlockModal")
    {
      this.availableBlockModal = isOpen; 
    }

  }

  selectedRoomType () 
  {
    this.setOpen(true, 'availableBlockModal');
  }



  // Function to generate a random floor and room number

 

  ngOnInit() {
  }

}
