import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-registration',
  templateUrl: './room-registration.page.html',
  styleUrls: ['./room-registration.page.scss'],
})
export class RoomRegistrationPage implements OnInit {

  constructor() { }

  bookingModal = false; 
  selectedSegment: string = 'default';

  setOpen(isOpen: boolean, modalName: String) // open or close modal
  {
    if(modalName == "bookingModal"){
      this.bookingModal = isOpen; 
    }

  }

  continueClicked() {
    // Access the selected value from the ion-segment
    console.log('Selected Segment:', this.selectedSegment)
    // Further logic based on the selected value
    // For example, navigate to another page or perform an action
  }

  BookRoom (){
    
  }

  ngOnInit() {
  }

}

