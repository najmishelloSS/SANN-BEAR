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
    { roomNumber: '101', level: '1', block: 'A', roomType: 'Single', status: 'Full' },
    { roomNumber: '102', level: '1', block: 'B', roomType: 'Double', status: 'Empty' },
    { roomNumber: '201', level: '2', block: 'A', roomType: 'Single', status: 'Full' },
    { roomNumber: '202', level: '2', block: 'B', roomType: 'Double', status: 'Empty' },
    { roomNumber: '301', level: '3', block: 'A', roomType: 'Single', status: 'Full' },
    { roomNumber: '302', level: '3', block: 'B', roomType: 'Double', status: 'Empty' },
    { roomNumber: '401', level: '4', block: 'A', roomType: 'Single', status: 'Full' },
    { roomNumber: '402', level: '4', block: 'B', roomType: 'Double', status: 'Empty' },
    { roomNumber: '501', level: '5', block: 'A', roomType: 'Single', status: 'Full' },
    { roomNumber: '502', level: '5', block: 'B', roomType: 'Double', status: 'Empty' },
  ];
}
