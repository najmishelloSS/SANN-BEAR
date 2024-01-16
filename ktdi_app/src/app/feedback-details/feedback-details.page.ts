import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.page.html',
  styleUrls: ['./feedback-details.page.scss'],
})
export class FeedbackDetailsPage implements OnInit {
  feedbackList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchFeedbackList();
  }
  
  fetchFeedbackList() {
    const url = environment.ktdi_api +'get_list_feedback.php'; // Replace with your actual API URL

    this.http.get<any>(url)
      .subscribe(
        (data: any) => {
          console.log('Received data:', data);
          this.feedbackList = data.feedbackList || [];
        },
        error => {
          console.error('Error fetching feedback list:', error);
        }
      );
  }
}
