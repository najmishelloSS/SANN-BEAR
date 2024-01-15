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
    this.onStatusChange();
  }

  onStatusChange() {
    this.activeSectionVisible = this.selectedStatus === 'active';
    this.successSectionVisible = this.selectedStatus === 'success';

    if (this.selectedStatus === 'active') {
      this.fetchReportData('pending'); // Set status to 'pending' for the 'active' section
    } else {
      this.fetchReportData('approved');
    }
  }

  fetchReportData(status?: string) {
    const url = status === 'approved'
      ? 'http://ktdiapp.mooo.com/api/get_approved_reports.php'
      : 'http://ktdiapp.mooo.com/api/get_status.php';

    this.http.get(url).subscribe(
      (data: any) => {
        if (data.Code === '200' && data.Reports) {
          this.reportData = data.Reports.filter((report: any) => report.status === status);
        } else {
          console.error(`Error fetching ${status ? status + ' ' : ''}report data:`, data.Message);
        }
      },
      error => {
        console.error(`Error fetching ${status ? status + ' ' : ''}report data:`, error);
      }
    );
  }

  formatId(id: number): string {
    return '' + ('00000' + id).slice(-5);
  }
}
