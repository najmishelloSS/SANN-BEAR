import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  hallBookings: any[] = [];
  totalPendingReports: number = 0;
  totalFeedback: number = 0;
  totalHallBooking: number = 0;
  totalEmptySingleRooms: number = 0;
  totalEmptyDoubleRooms: number = 0;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {

    this.fetchTotalReports();

    this.fetchTotalFeedback();

    this.fetchTotalHallBooking();

    this.fetchTotalEmptySingleRooms();

    this.fetchTotalEmptyDoubleRooms();
  }

  navigate(route: string, direction: string) {
    console.log("Go " + direction + " to " + route);
    
    // Update this part to navigate to the specified route
    this.router.navigate([route]);
  }

  fetchTotalReports() {
    const url = environment.ktdi_api +'get_pending_report.php';

    this.http.get<any>(url)
      .subscribe(
        (data: any) => {
          console.log('Received data:', data);
          this.totalPendingReports = data.total_pending || 0;
        },
        async error => {
          console.error('Error fetching total reports:', error);
        }
      );
  }

  fetchTotalFeedback() {
    const url = environment.ktdi_api +'get_total_feedback.php';

    this.http.get<any>(url)
      .subscribe(
        (data: any) => {
          console.log('Received data:', data);
          this.totalFeedback = data.total_feedback || 0;
        },
        async error => {
          console.error('Error fetching total feedback:', error);
        }
      );
  }

  fetchTotalHallBooking() {
    const url = environment.ktdi_api +'get_total_hallbooking.php';

    this.http.get<any>(url)
      .subscribe(
        (data: any) => {
          console.log('Received data:', data);
          this.totalHallBooking = data.total_hallbooking || 0;
        },
        async error => {
          console.error('Error fetching total hall booking:', error);
        }
      );
  }

  fetchTotalEmptySingleRooms() {
    const url = environment.ktdi_api +'get_total_SingleRoom.php';

    this.http.get<any>(url)
      .subscribe(
        (data: any) => {
          console.log('Received data:', data);
          this.totalEmptySingleRooms = data.empty_room_count || 0;
        },
        async error => {
          console.error('Error fetching total empty SingleRooms:', error);
        }
      );
  }

  fetchTotalEmptyDoubleRooms() {
    const url = environment.ktdi_api +'get_total_DoubleRoom.php';

    this.http.get<any>(url)
      .subscribe(
        (data: any) => {
          console.log('Received data:', data);
          this.totalEmptyDoubleRooms = data.empty_room_count || 0;
        },
        async error => {
          console.error('Error fetching total empty SingleRooms:', error);
        }
      );
  }
}