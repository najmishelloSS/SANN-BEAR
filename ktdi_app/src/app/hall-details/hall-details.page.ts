import { Component, OnInit } from '@angular/core';
import { HallBookingService } from './hall-booking.service';

@Component({
  selector: 'app-hall-details',
  templateUrl: './hall-details.page.html',
  styleUrls: ['./hall-details.page.scss'],
})
export class HallDetailsPage implements OnInit {
  hallDetails: any[] = [];
  bookhall: any[];

  constructor(private hallBookingService: HallBookingService) { }

  ngOnInit() {
    this.loadHallDetails();
  }

  loadHallDetails() {
    this.hallBookingService.getHallBookings().subscribe(
      data => {
        this.hallDetails = data;
      },
      error => {
        console.error('Error fetching hall details:', error);
      }
    );
  }

  approveBooking(bookingId: number) {
    // Implement the logic to approve the booking (you may need another service method)
    console.log('Booking Approved:', bookingId);
  }
}