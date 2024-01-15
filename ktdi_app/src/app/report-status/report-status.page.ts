// report-status.page.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-status',
  templateUrl: './report-status.page.html',
  styleUrls: ['./report-status.page.scss'],
})
export class ReportStatusPage implements OnInit {

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
      this.fetchReportData();
    } else {
      this.fetchReportData(this.selectedStatus);
    }
  }

  fetchReportData(status?: string) {
    const url = 'http://ktdiapp.mooo.com/api/get_status.php';

    // Use a GET request for fetching data
    this.http.get<any>(url)
      .subscribe(
        (data: any) => {
          this.handleReportData(data, status);
        },
        error => {
          console.error('Error fetching report data:', error);
        }
      );
  }

  private handleReportData(data: any, status?: string) {
    console.log('Received data:', data);

    if (status) {
      this.reportData = data.Reports
        .filter(report => report.status === status)
        .map((report: any) => {
          report.damage_type = report.damage_type ? [report.damage_type] : [];
          return report;
        });
    } else {
      this.reportData = data.Reports.map((report: any) => {
        report.damage_type = report.damage_type ? [report.damage_type] : [];
        report.status = 'Submitted';
        return report;
      });
    }

    console.log(this.reportData);
  }

  formatId(id: number): string {
    return '' + ('00000' + id).slice(-5);
  }
}
