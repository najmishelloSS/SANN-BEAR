import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-approval-report',
  templateUrl: './approval-report.page.html',
  styleUrls: ['./approval-report.page.scss'],
})
export class ApprovalReportPage implements OnInit {

  selectedStatus: string = 'active';
  activeSectionVisible: boolean = true;
  successSectionVisible: boolean = false;

  // Assuming the structure of your data is like this
  reportData: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Fetch initial data when the component initializes
    this.fetchReportData();
  }

  // Function to handle changes in the selected status
  onStatusChange() {
    // Toggle the visibility of sections based on the selected status
    this.activeSectionVisible = this.selectedStatus === 'active';
    this.successSectionVisible = this.selectedStatus === 'success';
  }

  // Function to fetch report data from the server
  fetchReportData() {
    const url = 'http://ktdiapp.mooo.com/api/submit-report.php';

    // You might need to adjust the request parameters based on your server-side implementation
    const params = {};

    this.http.post<any[]>(url, params)
      .subscribe(
        (data:any) => {
          console.log('Received data:', data); // Log the data received
          // data.Reports.forEach( async item => { // to manipulate each data individually
          //   console.log(item)
          // });
          this.reportData = data.Reports;
          console.log(this.reportData)
        },
        async error => {
          console.error('Error fetching report data:', error);
        }
      );
  }
}
