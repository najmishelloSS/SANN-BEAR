import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-electric-details',
  templateUrl: './electric-details.page.html',
  styleUrls: ['./electric-details.page.scss'],
})
export class ElectricDetailsPage implements OnInit {

  tableData: Array<any> = [
    { registrationId: 1, userId: 'user1', name: 'John Doe', imagePath: '/images/user1.jpg', registrationDate: '2024-01-15', paymentStatus: 'Paid' },
    { registrationId: 2, userId: 'user2', name: 'Jane Smith', imagePath: '/images/user2.jpg', registrationDate: '2024-01-16', paymentStatus: 'Pending' },
    { registrationId: 3, userId: 'user3', name: 'Bob Johnson', imagePath: '/images/user3.jpg', registrationDate: '2024-01-17', paymentStatus: 'Paid' },
    // Add more data objects as needed
    { registrationId: 4, userId: 'user4', name: 'Alice Brown', imagePath: '/images/user4.jpg', registrationDate: '2024-01-18', paymentStatus: 'Pending' },
    { registrationId: 5, userId: 'user5', name: 'Charlie White', imagePath: '/images/user5.jpg', registrationDate: '2024-01-19', paymentStatus: 'Paid' },
    { registrationId: 6, userId: 'user6', name: 'Eva Green', imagePath: '/images/user6.jpg', registrationDate: '2024-01-20', paymentStatus: 'Pending' },
    { registrationId: 7, userId: 'user7', name: 'David Black', imagePath: '/images/user7.jpg', registrationDate: '2024-01-21', paymentStatus: 'Paid' },
    { registrationId: 8, userId: 'user8', name: 'Grace Grey', imagePath: '/images/user8.jpg', registrationDate: '2024-01-22', paymentStatus: 'Pending' },
    { registrationId: 9, userId: 'user9', name: 'Frank Red', imagePath: '/images/user9.jpg', registrationDate: '2024-01-23', paymentStatus: 'Paid' },
    { registrationId: 10, userId: 'user10', name: 'Helen Blue', imagePath: '/images/user10.jpg', registrationDate: '2024-01-24', paymentStatus: 'Pending' }
  ];

  constructor() {}

  approveDetails() {
    // Implement the logic to handle approval (e.g., update the database)
    console.log('Details approved!');
  }

  ngOnInit() {
  }

}