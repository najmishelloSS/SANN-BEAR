// report-status.page.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-status',
  templateUrl: './report-status.page.html',
  styleUrls: ['./report-status.page.scss'],
})
export class ReportStatusPage implements OnInit {

  selectedStatus: string = 'active';  // Initialize with a default value
  activeSectionVisible: boolean = true;  // Set initial visibility
  successSectionVisible: boolean = false;  // Set initial visibility

  constructor() { }

  ngOnInit() {
    // You can add any initialization logic here
  }

  // Function to handle changes in the selected status
  onStatusChange() {
    // Toggle the visibility of sections based on the selected status
    this.activeSectionVisible = this.selectedStatus === 'active';
    this.successSectionVisible = this.selectedStatus === 'success';
  }

}
