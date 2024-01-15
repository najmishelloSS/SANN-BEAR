import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  navigate(route: string, direction: string) {
    console.log("Go " + direction + " to " + route);
    
    // Update this part to navigate to the specified route
    this.router.navigate([route]);
  }

}
