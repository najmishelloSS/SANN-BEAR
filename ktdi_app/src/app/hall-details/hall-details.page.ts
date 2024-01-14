import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentsService } from '../service/components.service';

@Component({
  selector: 'app-hall-details',
  templateUrl: './hall-details.page.html',
  styleUrls: ['./hall-details.page.scss'],
})
export class HallDetailsPage implements OnInit {
  data: any;
  hallDetails: any; // Property to store hall details

  constructor(
    public route: ActivatedRoute,
    public component: ComponentsService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.data = this.route.snapshot.data['special'];
    }

    // Call the method to get hall details
    this.getHallDetails();
  }

  // Method to retrieve hall details
  getHallDetails() {
    // Assuming that the selected hall index is available in this.data.selectedHallIndex
    const selectedHallIndex = this.data.selectedHallIndex;

    // Check if the selectedHallIndex is valid
    if (
      selectedHallIndex !== undefined &&
      selectedHallIndex >= 0 &&
      selectedHallIndex < this.data.hall.length
    ) {
      // Retrieve hall details based on the selected hall index
      this.hallDetails = this.data.hall[selectedHallIndex];
    } else {
      // Handle the case where the selectedHallIndex is invalid
      console.error('Invalid selected hall index.');
    }
  }
}