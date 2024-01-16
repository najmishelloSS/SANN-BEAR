import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  language = Array();
  data: any

  options : InAppBrowserOptions = { //browser option
    hideurlbar:'yes',
    hidenavigationbuttons:'yes',
    zoom:'yes',
    hardwareback:'no'
  }

  constructor(
    public route: ActivatedRoute,
    public dataservice:DataService,
    public router:Router,
    public navController:NavController,
    public loadingController:LoadingController,
    public http:HttpClient,
    public toastController:ToastController,
    public alertController:AlertController,
    public iab:InAppBrowser
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

  openBrowser(url){
    let target = "_blank";
    this.iab.create(url, target, this.options);
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

  translateData(data, language){ //translate data
    if(language == "malay"){
      switch(data){
        case "Upcoming":
          data = "Akan Datang"
          break;
        case "Ongoing":
          data = "Sedang Langsung"
          break;
        case "Finished":
          data = "Tamat"
          break;
      }
    }else{
      switch(data){
        case "Upcoming":
          data = "Upcoming"
          break;
        case "Ongoing":
          data = "Ongoing"
          break;
        case "Finished":
          data = "Finished"
          break;
      }
    }
    return data
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
        this.language["Dewan Sri Resak"] = "Dewan Sri Resak"
        this.language["Full Day"] = "Satu Hari"
        this.language["Half Day"] = "Separuh Hari"
        this.language["Select Duration"] = "Pilih Tempoh"
        this.language["Select Date"] = "Pilih Tarikh"
        this.language["Select Starting Time"] = "Pilih Masa Mula"
        this.language["Select Ending Time"] = "Pilih Masa Tamat"
        this.language["Select Activity Type"] = "Pilih Jenis Aktiviti"
        this.language["Formal"] = "Rasmi"
        this.language["Informal"] = "Tidak Rasmi"
        this.language["Club"] = "Kelab"
        this.language["Faculty"] = "Fakulti"
        this.language["Other"] = "Lain-lain"
        this.language["Save"] = "Simpan"
        this.language["Cancel"] = "Batal"
        this.language["Previous"] = "Kembali"
        this.language["Next"] = "Seterusnya"
        this.language["of"] = "daripada"
        this.language["page"] = "muka surat"
        this.language["Hall Information"] = "Maklumat Ruang"
        this.language["Programme Information"] = "Maklumat Program"
        this.language["Programme Name"] = "Nama Program"
        this.language["Number of Participants"] = "Jumlah Peserta"
        this.language["Approval Letter"] = "Surat Kelulusan"
        this.language["Programme Tentative"] = "Tentatif Program"
        this.language["Date/Time Information"] = "Maklumat Tarikh/Masa"
        this.language["PDF, JPG, JPEG and PNG only"] = "Hanya PDF, JPG, JPEG dan PNG"
        this.language["Booking in progress..."] = "Sedang menempah..."
        this.language["Hall Record"] = "Rekod Dewan"
        this.language["Book Hall"] = "Tempah Dewan"
        this.language["Active"] = "Aktif"
        this.language["Record"] = "Rekod"
        this.language["Search Booking"] = "Cari Tempahan"
        this.language["Furniture Information"] = "Maklumat Perabot"
        this.language["Broadcast Equipment Information"] = "Maklumat Set Siaraya"
        this.language["Additional Equipment Information"] = "Maklumat Peralatan Tambahan"
        this.language["Plastic Chair"] = "Kerusi Plastik"
        this.language["Banquet Chair"] = "Kerusi Bankuet"        
        this.language["Long Desk"] = "Meja Panjang"
        this.language["Whiteboard"] = "Papan Putih"
        this.language["Partition"] = "Partition"
        this.language["P.A. System"] = "Sistem P.A."
        this.language["Hand Mic"] = "Mic Tangan"
        this.language["Stand Mic"] = "Mic Diri"
        this.language["Comber"] = "Comber"
        this.language["LCD Projector"] = "Projektor LCD"
        this.language["Add"] = "Tambah"
        this.language["Remove"] = "Padam"
        this.language["Additional Equipment"] = "Peralatan Tambahan"
        this.language["Equipment Name"] = "Nama Peralatan"
        this.language["Equipment Amount"] = "Bilangan Peralatan"
        this.language["Please fill in the details."] = "Sila isikan maklumat berikut."
        this.language["Applicant Acknowledgement"] = "Pengakuan Pemohon"
        this.language["Add New Item"] = "Tambah Peralatan Baru"
        this.language["Prioritise the safety of the university's property."] = "Mengutamakan keselamatan hartabenda Universiti yang digunakan."
        this.language["Preserve the cleanliness of the venue and its surrounding."] = "Menjaga kebersihan ruang dan Kawasan."
        this.language["Ensure the safety of the participants during the programme."] = "Bertanggungjawab ke atas keselamatan peserta sepanjang penggunaan ruang"
        this.language["Return every borrowed furniture and equipments in adequate amount within the allocated period."] = "Melakukan pemulangan peralatan/kunci pada tarikh yang ditetapkan serta bilangan yang mengcukupi."
        this.language["Liable of replacing any broken or lost equipments due to mishaps during usage."] = "Menggantikan peralatan yang rosak atau hilang disebabkan oleh kecuaian semasa penggunaan."
        this.language["I agree to abide to the above rules and regulations"] = "Saya berjanji akan bertanggungjawab ke atas perkara-perkara di atas"
        this.language["Meal Break"] = "Waktu Makan"
        this.language["Yes"] = "Ada"
        this.language["No"] = "Tiada"
        this.language["Services"] = "Perkhidmatan"
        this.language["Search"] = "Cari"
        this.language["Report"] = "Laporan"
        this.language["Report Status"] = "Status Laporan"
        this.language["Room Registration"] = "Daftar Bilik"
        this.language["Register Electrical Appliances"] = "Daftar Barang Elektrik"
        this.language["Feedback & Recommendation"] = "Maklum Balas & Cadangan"
        this.language["Contact Us"] = "Hubungi Kami"
        this.language["Navigation"] = "Navigasi"
        this.language["day"] = "hari"
        this.language["Hall Available"] = "Tempah Dewan"
        this.language["Year"] = "Tahun"
        this.language["Logout"] = "Log Keluar"
        this.language["Faculty of Computing"] = "Fakulti Komputer"
        this.language["Graphic and Multimedia Software"] = "Perisian Grafik dan Multimedia"
        this.language["Profile"] = "Profil"
        this.language["Report Damage"] = "Lapor Kerosakan"
        this.language["Upload File"] = "Muat Naik"
        this.language["Description"] = "Penerangan"
        this.language["Fan"] = "Kipas"
        this.language["Lamp"] = "Lampu"
        this.language["Clogged Sink"] = "Sinki Tersumbat"
        this.language["Wall Plug"] = "Plag Dinding"
        this.language["Other"] = "Lain-lain"
        this.language["Pipe Leakage"] = "Paip Bocor"
        this.language["Enter the damage description"] = "Nyatakan penerangan kerosakan"
        this.language["Your report has been submitted"] = "Laporan anda telah dihantar"
        this.language["An email has been sent to you for confirmation"] = "E-mel pengesahan telah dihantar"
        this.language["inc. of all taxes"] = "termasuk cukai"
        this.language["Proceed"] = "Teruskan"
        this.language["Make Payment"] = "Buat Pembayaran"
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
        this.language["Full Day"] = "Full Day"
        this.language["Half Day"] = "Half Day"
        this.language["Select Duration"] = "Select Duration"
        this.language["Select Date"] = "Select Date"
        this.language["Select Starting Time"] = "Select Starting Time"
        this.language["Select Ending Time"] = "Select Ending Time"
        this.language["Select Activity Type"] = "Select Activity Type"
        this.language["Formal"] = "Formal"
        this.language["Informal"] = "Informal"
        this.language["Club"] = "Club"
        this.language["Faculty"] = "Faculty"
        this.language["Other"] = "Other"
        this.language["Save"] = "Save"
        this.language["Cancel"] = "Cancel"
        this.language["Previous"] = "Previous"
        this.language["Next"] = "Next"
        this.language["of"] = "of"
        this.language["page"] = "page"
        this.language["Hall Information"] = "Hall Information"
        this.language["Programme Information"] = "Programme Information"
        this.language["Programme Name"] = "Programme Name"
        this.language["Number of Participants"] = "Number of Participants"
        this.language["Approval Letter"] = "Approval Letter"
        this.language["Programme Tentative"] = "Programme Tentative"
        this.language["Date/Time Information"] = "Date/Time Information"
        this.language["PDF, JPG, JPEG and PNG only"] = "PDF, JPG, JPEG and PNG only"
        this.language["Booking in progress..."] = "Booking in progress..."
        this.language["Hall Record"] = "Hall Record"
        this.language["Book Hall"] = "Book Hall"
        this.language["Active"] = "Active"
        this.language["Record"] = "Record"
        this.language["Search Booking"] = "Search Booking"
        this.language["Furniture Information"] = "Furniture Information"
        this.language["Broadcast Equipment Information"] = "Broadcast Equipment Information"
        this.language["Additional Equipment Information"] = "Additional Equipment Information"
        this.language["Plastic Chair"] = "Plastic Chair"
        this.language["Banquet Chair"] = "Banquet Chair"
        this.language["Long Desk"] = "Long Desk"
        this.language["Whiteboard"] = "Whiteboard"
        this.language["Partition"] = "Partition"
        this.language["P.A. System"] = "P.A. System"
        this.language["Hand Mic"] = "Hand Mic"
        this.language["Stand Mic"] = "Stand Mic"
        this.language["Comber"] = "Comber"
        this.language["LCD Projector"] = "LCD Projector"
        this.language["Add"] = "Add"
        this.language["Remove"] = "Remove"
        this.language["Additional Equipment"] = "Additional Equipment"
        this.language["Equipment Name"] = "Equipment Name"
        this.language["Equipment Amount"] = "Equipment Amount"
        this.language["Please fill in the details."] = "Please fill in the details."
        this.language["Applicant Acknowledgement"] = "Applicant Acknowledgement"
        this.language["Add New Item"] = "Add New Item"
        this.language["Prioritise the safety of the university's property."] = "Prioritise the safety of the university's property."
        this.language["Preserve the cleanliness of the venue and its surrounding."] = "Preserve the cleanliness of the venue and its surrounding."
        this.language["Ensure the safety of the participants during the programme."] = "Ensure the safety of the participants during the programme."
        this.language["Return every borrowed furniture and equipments in adequate amount within the allocated period."] = "Return every borrowed furniture and equipments in adequate amount within the allocated period."
        this.language["Liable of replacing any broken or lost equipments due to mishaps during usage."] = "Liable of replacing any broken or lost equipments due to mishaps during usage."
        this.language["I agree to abide to the above rules and regulations"] = "I agree to abide to the above rules and regulations"
        this.language["Meal Break"] = "Meal Break"
        this.language["Yes"] = "Yes"
        this.language["No"] = "No"
        this.language["Services"] = "Services"
        this.language["Search"] = "Search"
        this.language["Report"] = "Report"
        this.language["Report Status"] = "Report Status"
        this.language["Room Registration"] = "Room Registration"
        this.language["Register Electrical Appliances"] = "Register Electrical Appliances"
        this.language["Feedback & Recommendation"] = "Feedback & Recommendation"
        this.language["Contact Us"] = "Contact Us"
        this.language["Navigation"] = "Navigation"
        this.language["day"] = "day"
        this.language["Hall Available"] = "Hall Available"
        this.language["Year"] = "Year"
        this.language["Logout"] = "Logout"
        this.language["Faculty of Computing"] = "Faculty of Computing"
        this.language["Graphic and Multimedia Software"] = "Graphic and Multimedia Software"
        this.language["Profile"] = "Profile"
        this.language["Report Damage"] = "Report Damage"
        this.language["Upload File"] = "Upload File"
        this.language["Description"] = "Description"
        this.language["Fan"] = "Fan"
        this.language["Lamp"] = "Lamp"
        this.language["Clogged Sink"] = "Clogged Sink"
        this.language["Wall Plug"] = "Wall Plug"
        this.language["Other"] = "Other"
        this.language["Pipe Leakage"] = "Pipe Leakage"
        this.language["Enter the damage description"] = "Enter the damage description"
        this.language["Your report has been submitted"] = "Your report has been submitted"
        this.language["An email has been sent to you for confirmation"] = "An email has been sent to you for confirmation"
        this.language["inc. of all taxes"] = "inc. of all taxes"
        this.language["Proceed"] = "Proceed"
        this.language["Make Payment"] = "Make Payment"
      }
    return this.language
  }

}
