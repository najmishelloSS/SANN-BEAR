import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private http: HttpClient
  ) { }

  async submitReport() {
    console.log('Submitting Report');

    const reportData = {
      file_path: 'path_to_uploaded_file', // Replace with the actual path
      damage_type: this.getSelectedDamageTypes(),
      damage_description: this.damageDescription,
      user_email: 'user@example.com', // Replace with the actual user email
    };

    console.log('Report Data:', reportData);

    const loading = await this.loadingController.create({
      message: 'Please Wait...',
    });
    loading.present();

    this.http.post<any>('http://ktdiapp.mooo.com/api/submit_report.php', reportData)
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

  private getSelectedDamageTypes(): string[] {
    return this.damageTypes
      .filter(type => type.checked)
      .map(type => type.label);
  }

  resetForm() {
    this.damageTypes.forEach(type => type.checked = false);
    this.damageDescription = '';
  }

  backToHome() {
    this.navCtrl.navigateRoot('/home');
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
