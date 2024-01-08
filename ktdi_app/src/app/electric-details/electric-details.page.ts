import { Component, OnInit } from '@angular/core';
import { ElectricDetailsService } from './electric-details.service';

@Component({
  selector: 'app-electric-details',
  templateUrl: './electric-details.page.html',
  styleUrls: ['./electric-details.page.scss'],
})
export class ElectricDetailsPage implements OnInit {

  electricDetails: any[] = [];

  constructor(private electricDetailsService: ElectricDetailsService) {
    // Fetch electric details from the service when the component initializes
    this.loadElectricDetails();
  }

  loadElectricDetails() {
    // Assuming ElectricDetailsService has a method to fetch electric details
    this.electricDetails = this.electricDetailsService.getElectricDetails();
  }

  approveDetails() {
    // Implement the logic to handle approval (e.g., update the database)
    console.log('Details approved!');
  }

  ngOnInit() {
  }

}
