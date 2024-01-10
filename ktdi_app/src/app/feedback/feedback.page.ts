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
  file: any;
  constructor(private navCtrl: NavController, private http: HttpClient) {}

  selectedFile(event){
    this.file = event.target.files[0];
  }


  rateCollegeManagement(rating: number): void {
    this.collegeManagementRating = this.collegeManagementRating === rating ? 0 : rating;
  }
  
  rateAccommodation(rating: number): void {
    this.accommodationRating = this.accommodationRating === rating ? 0 : rating;
  }

  rateFacilities(rating: number): void {
    this.facilitiesRating = this.facilitiesRating === rating ? 0 : rating;
  }

  submitReport() {

    console.log('Submitting Report');
    console.log('User Recommendation:', this.userRecommendation);

    let formData = new FormData();
    formData.append('college_management_rating', this.collegeManagementRating);
    formData.append('accommodation_rating', this.accommodationRating);
    formData.append('facilities_rating', this.facilitiesRating);
    formData.append('user_recommendation', this.userRecommendation);
    formData.append('file', this.file);

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
