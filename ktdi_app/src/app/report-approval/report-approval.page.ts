import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-approval',
  templateUrl: './report-approval.page.html',
  styleUrls: ['./report-approval.page.scss'],
})
export class ReportApprovalPage implements OnInit {

  selectedStatus: string = 'active';
  activeSectionVisible: boolean = true;
  successSectionVisible: boolean = false;
  reportData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchReportData();
  }

  onStatusChange() {
    this.activeSectionVisible = this.selectedStatus === 'active';
    this.successSectionVisible = this.selectedStatus === 'success';
    if (this.selectedStatus === 'active') {
      // Fetch all reports and reset the status to "Submitted"
      this.fetchReportData();
    } else {
      // Fetch only the reports with "Success" status
      this.fetchReportData(this.selectedStatus);
    }
  }

  fetchReportData(status?: string) {
    const url = 'http://ktdiapp.mooo.com/api/submit-report.php';
    const params = {};

    this.http.post<any>(url, params)
      .subscribe(
        (data: any) => {
          console.log('Received data:', data);
          if (status) {
            // Filter the reports based on the selected status
            this.reportData = data.Reports
              .filter(report => report.status === status)
              .map((report: any) => {
                report.damage_type = report.damage_type ? [report.damage_type] : [];
                return report;
              });
          } else {
            // Reset the status to "Submitted" for all reports
            this.reportData = data.Reports.map((report: any) => {
              report.damage_type = report.damage_type ? [report.damage_type] : [];
              report.status = 'Submitted';
              return report;
            });
          }
          console.log(this.reportData);
        },
        async error => {
          console.error('Error fetching report data:', error);
        }
      );
  }

  formatId(id: number): string {
    return '#' + ('00000' + id).slice(-5);
  }

}
