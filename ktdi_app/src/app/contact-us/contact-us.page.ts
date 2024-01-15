import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Contact {
  name: string;
  contact: string;
  position: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  contactList: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchContactData();
  }

  navigate(route: string, direction: string) {
    console.log('Go ' + direction + ' to ' + route);
    // Update this part to navigate to the specified route
    this.router.navigate([route]);
  }

  fetchContactData() {
    // Update the URL with the correct path to your PHP script
    const url = 'http://ktdiapp.mooo.com/api/contact.php';

    this.http.get<any>(url).subscribe(
      (data: any) => {
        this.contactList = data.contactList || [];
        console.log('Contact List:', this.contactList);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
