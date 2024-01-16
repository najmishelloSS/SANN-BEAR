// report-approval.page.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    // Toggle the visibility of sections based on the selected status
    if (this.selectedStatus === 'pending') {
      this.pendingReports = this.reportData.filter(report => report.status === 'pending');
      this.approvedReports = [];  // Clear approved reports when changing status
    } else if (this.selectedStatus === 'approved') {
      this.approvedReports = this.reportData.filter(report => report.status === 'approved');
      this.pendingReports = [];  // Clear pending reports when changing status
    }
  }

  // Function to fetch report data from the server
  fetchReportData() {
    const url = environment.ktdi_api +'get_status.php';

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

  // Function to update the report status
  updateReportStatus(reportId: number, newStatus: string) {
    const requestData = { reportId, newStatus };

    this.http.post<any>(environment.ktdi_api +'update_report_status.php', requestData)
      .subscribe(
        (response: any) => {
          if (response.success) {
            console.log(response.message);
            this.reportData = response.Reports;  // Update report data with the latest data
            this.onStatusChange();  // Refresh the categorized reports
          } else {
            console.error(response.message);
          }
        },
        (error) => {
          console.error('Error updating report status:', error);
          // Handle error or display a toast message
        }
      );
  }

  approveReport(report: any) {
    const reportId = report.id;
    const newStatus = 'approved';

    this.updateReportStatus(reportId, newStatus);
  }

  rejectReport(report: any) {
  const reportId = report.id;
  const newStatus = 'rejected';
  this.updateReportStatus(reportId, newStatus);
  }

  formatId(id: number): string {
    return '#' + ('00000' + id).slice(-5);
  }
}
