// feedback.page.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage {
  collegeManagementRating: number = 0;
  accommodationRating: number = 0;
  facilitiesRating: number = 0;

  constructor() {}

  rateCollegeManagement(rating: number): void {
    this.collegeManagementRating = this.collegeManagementRating === rating ? 0 : rating;
  }

  rateAccommodation(rating: number): void {
    this.accommodationRating = this.accommodationRating === rating ? 0 : rating;
  }

  rateFacilities(rating: number): void {
    this.facilitiesRating = this.facilitiesRating === rating ? 0 : rating;
  }
  handleFileInput(event: any): void {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile: File = fileList[0];
      // Handle the selected file, you can upload it to a server or process it as needed
      console.log('Selected File:', selectedFile);
    }
  }
}