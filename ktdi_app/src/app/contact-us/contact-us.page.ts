import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { ComponentsService } from '../service/components.service';

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
  data;
  language;

  constructor(
              private http: HttpClient,
              private route:ActivatedRoute,
              private component:ComponentsService
            ) {}

  ngOnInit() {
    if(this.route.snapshot.data['special']){
      this.data = this.route.snapshot.data['special'];
    }
    this.language = this.component.getLanguage(this.data.language) 
    if(this.data == undefined){
      this.data.page = 1;
      this.navigate("splashscreen", "back");
    }
    console.log(this.data)
    this.fetchContactData();
  }

  navigate(route: string, direction: string) {
    console.log('Go ' + direction + ' to ' + route);
    // Update this part to navigate to the specified route
    this.component.navigate(route, this.data, direction)
  }

  fetchContactData() {
    // Update the URL with the correct path to your PHP script
    const url = environment.ktdi_api +'contact.php';

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
