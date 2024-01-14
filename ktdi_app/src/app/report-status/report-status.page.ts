// report-status.page.ts
import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-report-status',
  templateUrl: './report-status.page.html',
  styleUrls: ['./report-status.page.scss'],
})
export class ReportStatusPage {
  selectedStatus: string = 'active';
  activeSectionVisible: boolean = true;
  successSectionVisible: boolean = false;
  reportData: any[] = [];
  dataFetched: boolean = false;

  constructor(private http: HttpClient) {}

  ionViewWillEnter() {
    if (!this.dataFetched) {
      this.fetchReportData();
      this.dataFetched = true;
    }
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

    this.http.get<any[]>(url)
      .subscribe(
        (data: any) => {
          console.log('Received data:', data);
          this.reportData = data.Reports.map((report: any) => {
            report.damage_type = report.damage_type ? [report.damage_type] : [];
            return report;
          });
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
