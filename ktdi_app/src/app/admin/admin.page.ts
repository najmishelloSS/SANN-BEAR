import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  hallBookings: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(route: string, direction: string) {
    console.log("Go " + direction + " to " + route);
    
    // Update this part to navigate to the specified route
    this.router.navigate([route]);
  }
}