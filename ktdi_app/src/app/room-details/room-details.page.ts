import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../service/components.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.page.html',
  styleUrls: ['./room-details.page.scss'],
})
export class RoomDetailsPage implements OnInit {

  emptySingleRooms : any;
  emptyDoubleRooms : any;

  constructor(
    public component: ComponentsService,
    private navCtrl: NavController,
    public dataservice:DataService,
    public alertController: AlertController,
    private http: HttpClient,
  ) {}


  ngOnInit() {
  }

  tableData = [
    { rooms: 101, type: 'Single', residentName: 'John Doe', email: 'john@example.com' },
    { rooms: 102, type: 'Double', residentName: 'Jane Doe', email: 'jane@example.com' },
    { rooms: 103, type: 'Suite', reidentName: 'Bob Smith', email: 'bob@example.com' },
    { rooms: 104, type: 'Single', residentName: 'Alice Johnson', email: 'alice@example.com' },
    { rooms: 105, type: 'Double', residentName: 'Charlie Brown', email: 'charlie@example.com' },
    { rooms: 106, type: 'Suite', residentName: 'Eva Davis', email: 'eva@example.com' },
    { rooms: 107, type: 'Single', residentName: 'Frank White', email: 'frank@example.com' },
    { rooms: 108, type: 'Double', residentName: 'Grace Lee', email: 'grace@example.com' },
    { rooms: 109, type: 'Suite', residentName: 'Harry Johnson', email: 'harry@example.com' },
    { rooms: 110, type: 'Single', residentName: 'Ivy Brown', email: 'ivy@example.com' },
    // Add more entries as needed
  ];

}
