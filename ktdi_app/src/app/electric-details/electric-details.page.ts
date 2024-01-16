import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-electric-details',
  templateUrl: './electric-details.page.html',
  styleUrls: ['./electric-details.page.scss'],
})
export class ElectricDetailsPage implements OnInit {
  electricalList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchElectricalList();
  }
  
  fetchElectricalList() {
    const url = environment.ktdi_api +'get_list_electrical.php';

    this.http.get<any>(url)
      .subscribe(
        (data: any) => {
          console.log('Received data:', data);
          this.electricalList = data.electricalList || [];
        },
        error => {
          console.error('Error fetching electrical list:', error);
        }
      );
  }
}