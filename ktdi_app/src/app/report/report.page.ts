// report.page.ts

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  damageTypes: { label: string; checked: boolean }[] = [
    { label: 'Pipe Leakage', checked: false },
    { label: 'Fan', checked: false },
    { label: 'Lamp', checked: false },
    { label: 'Clogged Sink', checked: false },
    { label: 'Wall Plug', checked: false },
  ];

  damageDescription: string = '';
  submitted: boolean = false;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  chooseFile() {
    // Add your logic for choosing a file here
    console.log('File has been chosen');
  }

  submitReport() {
    // Add logic to handle the submission of the report
    console.log('Submitting Report');

    // Set submitted to true to show the confirmation message
    this.submitted = true;

    // Reset the form data
    this.resetForm();
  }

  resetForm() {
    // Reset form data
    this.damageTypes.forEach(type => type.checked = false);
    this.damageDescription = '';
  }

  backToHome() {
    // Navigate back to home
    this.navCtrl.navigateRoot('/home');
  }
}
