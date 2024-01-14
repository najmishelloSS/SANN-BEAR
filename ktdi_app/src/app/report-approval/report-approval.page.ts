// report-approval.page.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-approval',
  templateUrl: './report-approval.page.html',
  styleUrls: ['./report-approval.page.scss'],
})
export class ReportApprovalPage implements OnInit {

  selectedStatus: string = 'pending';
  reportData: any[] = [];
  pendingReports: any[] = [];
  approvedReports: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Fetch initial data when the component initializes
    this.fetchReportData();
  }

  // Function to handle changes in the selected status
  onStatusChange() {
    // Clear approved reports when changing status
    this.approvedReports = [];

    // Toggle the visibility of sections based on the selected status
    this.pendingReports = this.reportData.filter(report => report.status === 'pending');
    this.approvedReports = this.reportData.filter(report => report.status === 'approved');
  }

  // Function to fetch report data from the server
  fetchReportData() {
    const url = 'http://ktdiapp.mooo.com/api/get_status.php';

    // You might need to adjust the request parameters based on your server-side implementation
    const params = {};

    this.http.post<any[]>(url, params)
      .subscribe(
        (data: any) => {
          console.log('Received data:', data);
          this.reportData = data.Reports.map(report => ({ ...report, status: report.status || 'pending' }));
          this.onStatusChange(); // Initial categorization based on status
        },
        async error => {
          console.error('Error fetching report data:', error);
        }
      );
  }

  approveReport(report: any) {
    const reportId = report.id;

    this.http.post<any>('http://ktdiapp.mooo.com/api/approve_report.php', { reportId })
      .subscribe(
        (data: any) => {
          if (data.success) {
            console.log(data.message);
            // Check if the received data contains the updated reports
            console.log(data.Reports);
            this.reportData = data.Reports;
            this.onStatusChange();  // Refresh the categorized reports
          } else {
            console.error(data.message);
          }
        },
        (error) => {
          console.error('Error approving report:', error);
        }
      );
  }

  rejectReport(report: any) {
    const isConfirmed = confirm('Are you sure you want to reject this report?');

    if (isConfirmed) {
      report.status = 'rejected';

      this.pendingReports = this.pendingReports.filter((pendingReport) => pendingReport !== report);
    }
  }

  formatId(id: number): string {
    return '#' + ('00000' + id).slice(-5);
  }
}
