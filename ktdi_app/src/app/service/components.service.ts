import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  language = Array();
  data: any

  constructor(
    public route: ActivatedRoute,
    public dataservice:DataService,
    public router:Router,
    public navController:NavController,
    public loadingController:LoadingController,
    public http:HttpClient,
    public toastController:ToastController
  ) { }

  getAPI(link, formData, type){
    if(type == "get"){ //get API
      return this.http.get(link, formData)
    }else{ //post API
      return this.http.post(link, formData)
    }
  }

  emailValid(email){
    const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    const result: boolean = expression.test(email);
    return result
  }

  async toast(message){
    const toast = await this.toastController.create({
      message: message,
                duration: 2000,
                buttons: [
                  {
                  icon: "close",
                  role: 'dismiss',
                  }
                ]
    });
    toast.present();
  }

  navigate(route, data, direction){
    this.navController.setDirection(direction,false); //set navigation animation
    data.page = data.page + 1 // add 1 to page number eg home/1 -> profile/2
    this.dataservice.setData(data.page, data); //save data before navigating
    this.router.navigateByUrl(route+"/"+data.page); //navigate to page eg profile/2
  }

  getLanguage(language){
    switch(language){
      case "malay":
        this.language["Home"] = "Utama"
        this.language["Log In"] = "Log Masuk"
        this.language["Sign In"] = "Daftar Masuk"
        this.language["Hostel Management"] = "Pendaftaran Hostel"
        this.language["All services on your fingertips."] = "Segala perkhidmatan di hujung jari."
        this.language["E-mail"] = "E-mel"
        this.language["Password"] = "Kata Laluan"
        this.language["Confirm Password"] = "Ulang Kata Laluan"
        this.language["Forgot"] = "Lupa"
        this.language["Please enter a valid e-mail"] = "Sila masukkan e-mel yang sah"
        this.language["Please enter password"] = "Sila masukkan kata laluan"
        this.language["Password should not be less than 8 characters"] = "Kata laluan tidak kurang dari 8 aksara"
        this.language["Logging In..."] = "Sedang Log Masuk..."
        this.language["Please verify your account"] = "Sila sahkan akaun anda"
        this.language["Invalid e-mail or password"] = "E-mail atau kata laluan tidak sah"
        this.language["Something went wrong, please try again later"] = "Proses gagal, sila cuba lagi kemudian"
        this.language["Please Wait..."] = "Tunggu Sebentar..."
        this.language["Please enter your full name"] = "Sila masukkan nama penuh anda"
        this.language["Please enter your identification or passport number"] = "Sila masukkan nombor kad identiti atau pasport anda"
        this.language["Please enter your phone number"] = "Sila masukkan nombor telefon anda"
        this.language["Passwords are not matching"] = "Kata laluan tidak sama"
        this.language["Signing Up..."] = "Sedang daftar akaun..."
        this.language["Account registered, proceed to verify your account"] = "Pendaftaran berjaya, sila sahkan akaun anda"
        this.language["This account has been registered"] = "Akaun ini sudah didaftarkan"
        this.language["Please enter a valid PIN"] = "Sila masukkan PIN yang sah"
        this.language["Verifying..."] = "Sedang Mengesahkan..."
        this.language["Account verified, please reset your password"] = "Pengesahan berjaya, sila set semula kata laluan"
        this.language["Account verified, proceed to login"] = "Pengesahan berjaya, sila log masuk"
        this.language["Password has been reset, proceed to login"] = "Set semula kata laluan berjaya, sila log masuk"
        this.language["Sending PIN..."] = "Sedang hantar PIN..."
        this.language["PIN has been sent"] = "PIN berjaya dihantar"
        this.language["Sign Up"] = "Daftar Masuk"
        this.language["Full Name"] = "Nama Penuh"
        this.language["Identification Card / Passport Number"] = "Nombor MyKad / Pasport"
        this.language["Phone Number"] = "Nombor Telefon"
        this.language["Already registered"] = "Sudah berdaftar"
        this.language["Reset Password"] = "Set Semula Kata Laluan"
        this.language["Submit"] = "Hantar"
        this.language["New user"] = "Pengguna baharu"
        this.language["Verify Account"] = "Pengesahan Akaun"
        this.language["An e-mail has been sent to"] = "E-mel pengesahan telah dihantar ke"
        this.language["Please check your inbox for verification code"] = "Sila semak peti masuk untuk kod pengesahan"
        this.language["Reset"] = "Set Semula"
        this.language["Hall Booking"] = "Tempah Ruang"
        break;
      default:
        this.language["Home"] = "Home"
        this.language["Log In"] = "Log In"
        this.language["Sign In"] = "Sign In"
        this.language["Hostel Management"] = "Hostel Management"
        this.language["All services on your fingertips."] = "All services on your fingertips."
        this.language["E-mail"] = "E-mail"
        this.language["Password"] = "Password"
        this.language["Confirm Password"] = "Confirm Password"
        this.language["Forgot"] = "Forgot"
        this.language["Please enter a valid e-mail"] = "Please enter a valid e-mail"
        this.language["Please enter password"] = "Please enter password"
        this.language["Password should not be less than 8 characters"] = "Password should not be less than 8 characters"
        this.language["Logging In..."] = "Logging In..."
        this.language["Please verify your account"] = "Please verify your account"
        this.language["Invalid e-mail or password"] = "Invalid e-mail or password"
        this.language["Something went wrong, please try again later"] = "Something went wrong, please try again later"
        this.language["Please Wait..."] = "Please Wait..."
        this.language["Please enter your full name"] = "Please enter your full name"
        this.language["Please enter your identification or passport number"] = "Please enter your identification or passport number"
        this.language["Please enter your phone number"] = "Please enter your phone number"
        this.language["Passwords are not matching"] = "Passwords are not matching"
        this.language["Signing Up..."] = "Signing Up..."
        this.language["Account registered, proceed to verify your account"] = "Account registered, proceed to verify your account"
        this.language["This account has been registered"] = "This account has been registered"
        this.language["Please enter a valid PIN"] = "Please enter a valid PIN"
        this.language["Verifying..."] = "Verifying..."
        this.language["Account verified, please reset your password"] = "Account verified, please reset your password"
        this.language["Account verified, proceed to login"] = "Account verified, proceed to login"
        this.language["Password has been reset, proceed to login"] = "Password has been reset, proceed to login"
        this.language["Sending PIN..."] = "Sending PIN..."
        this.language["PIN has been sent"] = "PIN has been sent"
        this.language["Sign Up"] = "Sign Up"
        this.language["Full Name"] = "Full Name"
        this.language["Identification Card / Passport Number"] = "Identification Card / Passport Number"
        this.language["Phone Number"] = "Phone Number"
        this.language["Already registered"] = "Already registered"
        this.language["Reset Password"] = "Reset Password"
        this.language["Submit"] = "Submit"
        this.language["New user"] = "New user"
        this.language["Verify Account"] = "Verify Account"
        this.language["An e-mail has been sent to"] = "An e-mail has been sent to"
        this.language["Please check your inbox for verification code"] = "Please check your inbox for verification code"
        this.language["Reset"] = "Reset"
        this.language["Hall Booking"] = "Hall Booking"
    }
    return this.language
  }

}
