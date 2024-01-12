import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  // hallBookings: any[] = [];
  
  reportData: any[] = [];
  selectedStatus: string = 'active';
  activeSectionVisible: boolean = true;
  successSectionVisible: boolean = false;
  
  constructor(private router: Router , private http: HttpClient) { }

  ngOnInit() {
  }
  navigate(route: string, direction: string) {
    console.log("Go " + direction + " to " + route);
    this.fetchReportData();
    
    this.router.navigate([route]);
  }

  onStatusChange() {
    // Toggle the visibility of sections based on the selected status
    this.activeSectionVisible = this.selectedStatus === 'active';
    this.successSectionVisible = this.selectedStatus === 'success';
  }

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
