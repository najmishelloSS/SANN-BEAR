import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.page.html',
  styleUrls: ['./feedback-details.page.scss'],
})
export class FeedbackDetailsPage implements OnInit {

  tableData = [
    { user_id: '1', feedback_id: '101', college_management_rating: '4', accommodation_rating: '5', facilities_rating: '4', user_recommendation: 'Yes', submission_date: '2022-01-15', file_name: 'feedback1.pdf' },
    { user_id: '2', feedback_id: '102', college_management_rating: '3', accommodation_rating: '4', facilities_rating: '3', user_recommendation: 'No', submission_date: '2022-01-16', file_name: 'feedback2.pdf' },
    { user_id: '3', feedback_id: '103', college_management_rating: '5', accommodation_rating: '4', facilities_rating: '5', user_recommendation: 'Yes', submission_date: '2022-01-17', file_name: 'feedback3.pdf' },
    { user_id: '4', feedback_id: '104', college_management_rating: '2', accommodation_rating: '3', facilities_rating: '2', user_recommendation: 'No', submission_date: '2022-01-18', file_name: 'feedback4.pdf' },
    { user_id: '5', feedback_id: '105', college_management_rating: '4', accommodation_rating: '5', facilities_rating: '4', user_recommendation: 'Yes', submission_date: '2022-01-19', file_name: 'feedback5.pdf' },
    { user_id: '6', feedback_id: '106', college_management_rating: '3', accommodation_rating: '4', facilities_rating: '3', user_recommendation: 'No', submission_date: '2022-01-20', file_name: 'feedback6.pdf' },
    { user_id: '7', feedback_id: '107', college_management_rating: '5', accommodation_rating: '4', facilities_rating: '5', user_recommendation: 'Yes', submission_date: '2022-01-21', file_name: 'feedback7.pdf' },
    { user_id: '8', feedback_id: '108', college_management_rating: '2', accommodation_rating: '3', facilities_rating: '2', user_recommendation: 'No', submission_date: '2022-01-22', file_name: 'feedback8.pdf' },
    { user_id: '9', feedback_id: '109', college_management_rating: '4', accommodation_rating: '5', facilities_rating: '4', user_recommendation: 'Yes', submission_date: '2022-01-23', file_name: 'feedback9.pdf' },
    { user_id: '10', feedback_id: '110', college_management_rating: '3', accommodation_rating: '4', facilities_rating: '3', user_recommendation: 'No', submission_date: '2022-01-24', file_name: 'feedback10.pdf' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
