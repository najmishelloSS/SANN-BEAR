// feedback.page.ts

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage {
  collegeManagementRating: any = 0;
  accommodationRating: any = 0;
  facilitiesRating: any = 0;
  submitted: boolean = false;
  userRecommendation: string = '';

  constructor(private navCtrl: NavController, private http: HttpClient) {}

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

  submitReport() {

    console.log('Submitting Report');
    console.log('User Recommendation:', this.userRecommendation);

    let formData = new FormData();
    formData.append('college_management_rating', this.collegeManagementRating);
    formData.append('accommodation_rating', this.accommodationRating);
    formData.append('facilities_rating', this.facilitiesRating);
    formData.append('user_recommendation', this.userRecommendation);

    // const formData = {
    //   college_management_rating: this.collegeManagementRating,
    //   accommodation_rating: this.accommodationRating,
    //   facilities_rating: this.facilitiesRating,
    //   user_recommendation: this.userRecommendation,
    // };

    // Replace the URL with your actual PHP backend endpoint
    const feedbackEndpoint = 'http://ktdiapp.mooo.com/api/feedback.php';

    this.http.post(feedbackEndpoint, formData).subscribe(
      (data: any) => {
        console.log('Feedback submitted successfully:', data);
        this.submitted = true;
      },
      (error) => {
        console.error('Error submitting feedback:', error);
        // Handle errors
      }
    );
  }

  backToHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
