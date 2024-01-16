import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentsService } from '../service/components.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage {

  damageTypes: { label: string; checked: boolean }[] = [
    { label: 'Pipe Leakage', checked: false },
    { label: 'Fan', checked: false },
    { label: 'Lamp', checked: false },
    { label: 'Clogged Sink', checked: false },
    { label: 'Wall Plug', checked: false },
    { label: 'Other', checked: false },
  ];

  damageDescription: string = '';
  submitted: boolean = false;
  uploadedFilePath: string = '';

  file: any;
  data;
  language;

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private http: HttpClient,
    private route:ActivatedRoute,
    private dataservice:DataService,
    private router:Router,
    private navController:NavController,
    private component:ComponentsService
  ) { }

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
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.uploadFile(file);
    }
  }

  private uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post<any>(environment.ktdi_api +'submit-report.php', formData)
      .subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          this.uploadedFilePath = response.file_path;
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
  }

  async submitReport() {
    console.log('Submitting Report');

    const formData = new FormData();
    formData.append('file_path', this.uploadedFilePath);
    formData.append('damage_type', this.getSelectedDamageType());
    formData.append('damage_description', this.damageDescription);
    formData.append('user_email', this.data.user_email);

    console.log('Report Data:', formData);

    const loading = await this.loadingController.create({
      message: 'Please Wait...',
    });
    loading.present();

    this.http.post<any>(environment.ktdi_api +'submit-report.php', formData)
      .subscribe(
        (response) => {
          console.log('Report submitted successfully:', response);
          this.submitted = true;
          this.resetForm();
          loading.dismiss();
        },
        (error) => {
          console.error('Error submitting report:', error);
          loading.dismiss();
          this.presentToast('Something went wrong, please try again later');
        }
      );
  }

  private getSelectedDamageType(): string {
    const selectedType = this.damageTypes.find(type => type.checked);
    return selectedType ? selectedType.label : '';
  }

  resetForm() {
    this.damageTypes.forEach(type => type.checked = false);
    this.damageDescription = '';
    this.uploadedFilePath = '';
  }

  navigate(route, direction) {
    this.component.navigate(route, this.data, direction)
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
