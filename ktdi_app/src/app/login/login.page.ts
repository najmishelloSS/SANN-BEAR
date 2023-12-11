//////////////DEPENDENCIES///////////////////////
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from '../service/data.service';
import { ComponentsService } from '../service/components.service';
//////////////DEPENDENCIES///////////////////////


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ///////////////VARIABLES////////////////////////
  data; //data from previous page
  language : any //language library
  loginModal = false //modal status
  signupModal = false
  forgotModal = false
  verifyModal = false
  resetModal = false
  login={ //for login inputs
    email:"shah@gmail.com",
    password:"abcd1234",
    email_input:["", "var(--ion-color-success)"], //default colour input
    password_input:["", "var(--ion-color-success)"]
  }
  register={ //for registration inputs
    fname:"",
    email:"",
    password:"",
    repassword:"",
    id_no:"",
    phone:"",
    fname_input:["", "var(--ion-color-success)"],
    email_input:["", "var(--ion-color-success)"],
    password_input:["", "var(--ion-color-success)"],
    repassword_input:["", "var(--ion-color-success)"],
    id_input:["", "var(--ion-color-success)"],
    phone_input:["", "var(--ion-color-success)"]
  }
  forgot={ //for reset password inputs
    email:"",
    email_input:["", "var(--ion-color-success)"],
    password:"",
    repassword:"",
    password_input:["", "var(--ion-color-success)"],
    repassword_input:["", "var(--ion-color-success)"],
  }
  verify={ //for email verification inputs
    email:"",
    PIN:"",
    PIN_input:["", "var(--ion-color-success)"],
    type:""

  }
  color={ //input alert color
    email:"transparent", //unused for now
    password:"transparent", //unused for now
    header:"transparent", //visibility of Hostel Management
  }
  hide={ //hide empty form alert, currently unused
    email:true,
    password:true
  }
  showPassword=false; //hide or show password
  passwordToggleIcon='eye'; //hide password icon

  ///////////////VARIABLES////////////////////////

  //////////////DEPENDENCIES/////////////////////
  constructor( 
    public route:ActivatedRoute,
    public dataservice:DataService,
    public router:Router,
    public navController:NavController,
    public component:ComponentsService
  ) { }

  //////////////DEPENDENCIES/////////////////////


  //////////////FUNCTIONS///////////////////////


  ngOnInit() { //initialization of page, similar to main() in java
    if(this.route.snapshot.data['special']){ //get data from previous page
      this.data = this.route.snapshot.data['special'];
    }
    this.language = this.component.getLanguage(this.data.language) 

    if(this.data == undefined){ //redirect to splashscreen page if no data
      this.data.page = 1; //set page number to 1
      this.component.navigate('splashscreen', this.data, "forward");
    }
    console.log(this.data) //show data 
  }

  setOpen(isOpen: boolean, modal) { //open or close modal
    switch(modal) {
      case "loginModal":
        this.loginModal = isOpen; 
        break;
      case "signupModal":
        this.signupModal = isOpen;
        break;
      case "forgotModal":
        this.forgotModal = isOpen;
        break;
      case "verifyModal":
        this.sendCode(isOpen)
        this.verifyModal = isOpen;
        break;
      case "resetModal":
        this.resetModal = isOpen;
        break;
    }
    if(isOpen == true){ //show or hide Hostel Management header
      this.color.header = "white"
    }else{
      this.color.header = "transparent"
    }
  }

  togglePassword():void{ //show or hide password
    this.showPassword=!this.showPassword;
    if(this.passwordToggleIcon=='eye'){
      this.passwordToggleIcon='eye-off';
    }else{
      this.passwordToggleIcon='eye';
    }
  }

  ionChange(){ //reset required inputs color
    this.login.email_input =  ["", "var(--ion-color-success)"];
    this.login.password_input =  ["", "var(--ion-color-success)"];
    this.register.fname_input =  ["", "var(--ion-color-success)"];
    this.register.id_input =  ["", "var(--ion-color-success)"];
    this.register.phone_input =  ["", "var(--ion-color-success)"];
    this.register.email_input =  ["", "var(--ion-color-success)"];
    this.register.password_input =  ["", "var(--ion-color-success)"];
    this.register.repassword_input =  ["", "var(--ion-color-success)"];
    this.forgot.email_input =  ["", "var(--ion-color-success)"];
    this.forgot.password_input =  ["", "var(--ion-color-success)"];
    this.forgot.repassword_input =  ["", "var(--ion-color-success)"];
    this.verify.PIN_input =  ["", "var(--ion-color-success)"];
  }

  async navigateModal(location, destination) { //close old modal and open new modal
    this.setOpen(false, location) //close old modal
    const loading = await this.component.loadingController.create({ //generate loading interface
      message: this.language["Please Wait..."]
    });
    loading.present();
    setTimeout(async ()=> { //delay action for 1 second
      this.setOpen(true, destination) //open new modal
      loading.dismiss(); //close loading interface
    }, 1000);
  }

  async Login(){ //login function
    let result = this.component.emailValid(this.login.email) //check email validity (must have @ eg email@gmail)

    if(this.login.email == "" || this.login.email == " " || this.login.email == null || this.login.email == undefined || result == false){ //check input filled or validity
      this.login.email_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"]; //change input color to red
      this.component.toast(this.language["Please enter a valid e-mail"]) // call toast
    }else if(this.login.password == "" || this.login.password == " " || this.login.password == null || this.login.password == undefined){
      this.login.password_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Please enter password"])
    }else if(this.login.password.toString().length < 8 ){
      this.login.password_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Password should not be less than 8 characters"])
    }else{
      const loading = await this.component.loadingController.create({
        message: this.language["Logging In..."]
      });
      loading.present();

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
        
      let formData = new FormData();
      formData.append('login',this.login.email);
      formData.append('password',this.login.password);

      this.component.getAPI('http://ktdiapp.mooo.com/api/login_auth.php', formData, "post").subscribe( (data:any) => { //login API
        console.log(data)
        data.forEach( async item => {
          if(item.Code == '200'){
            switch(item.verify_status) {
              case "Verified":
                console.log("login success")
                this.data.login = item
                this.setOpen(false, 'loginModal');
                setTimeout(async ()=> {
                  this.component.navigate('home', this.data, "forward");
                  loading.dismiss();
                }, 1000);
                break;
              default:
                this.verify.type = "register"
                this.verify.email = this.login.email
                this.navigateModal("loginModal","verifyModal")
                loading.dismiss();
                this.component.toast(this.language["Please verify your account"])
            }
          }else if(item.Code == '204'){
            console.log("invalid login")
            loading.dismiss();
            this.component.toast(this.language["Invalid e-mail or password"])
          }else{
            console.log("something went wrong")
            loading.dismiss();
            this.component.toast(this.language["Something went wrong, please try again later"])
          }
        });
      }, async error => {
          console.log(error)
          loading.dismiss();
          this.component.toast(this.language["Something went wrong, please try again later"])
      });
    }
  }

  async Forgot(){ //forgot password function
    let result = this.component.emailValid(this.forgot.email)

    if(this.forgot.email == "" || this.forgot.email == " " || this.forgot.email == null || this.forgot.email == undefined || result == false){
      this.forgot.email_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Please enter a valid e-mail"])
    }else{
      const loading = await this.component.loadingController.create({
        message: this.language["Please Wait..."]
      });
      loading.present();

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
        
      let formData = new FormData();
      formData.append('email',this.forgot.email);

      this.component.getAPI('http://ktdiapp.mooo.com/api/code.php', formData, "post").subscribe( (data:any) => {
        console.log(data)
        data.forEach( async item => {
          if(item.Code == '200'){
            loading.dismiss();
            this.verify.email = this.forgot.email
            console.log(this.verify.type)
            this.verify.type = "forgot"
            this.navigateModal("forgotModal","verifyModal")
          }else if(item.Code == '204'){
            console.log("invalid email")
            loading.dismiss();
            this.component.toast(this.language["Please enter a valid e-mail"])
          }else{
            console.log("something went wrong")
            loading.dismiss();
            this.component.toast(this.language["Something went wrong, please try again later"])
          }
        });
      }, async error => {
          console.log(error)
          loading.dismiss();
          this.component.toast(this.language["Something went wrong, please try again later"])
      });
    }
  }

  async Register(){ //register account function
    let result = this.component.emailValid(this.register.email)

    if(this.register.fname == "" || this.register.fname == " " || this.register.fname == null || this.register.fname == undefined){
      this.register.fname_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Please enter your full name"])
    }else if(this.register.id_no == "" || this.register.id_no == " " || this.register.id_no == null || this.register.id_no == undefined){
      this.register.id_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Please enter your identification or passport number"])
    }else if(this.register.phone == "" || this.register.phone == " " || this.register.phone == null || this.register.phone == undefined){
      this.register.phone_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Please enter your phone number"])
    }else if(this.register.email == "" || this.register.email == " " || this.register.email == null || this.register.email == undefined || result == false){
      this.register.email_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Please enter a valid e-mail"])
    }else if(this.register.password == "" || this.register.password == " " || this.register.password == null || this.register.password == undefined){
      this.register.password_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Please enter password"])
    }else if(this.register.password.toString().length < 8 ){
      this.register.password_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Password should not be less than 8 characters"])
    }else if(this.register.repassword != this.register.password){
      this.register.repassword_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Passwords are not matching"])
    }else{
      const loading = await this.component.loadingController.create({
        message: this.language["Signing Up..."]
      });
      loading.present();
  
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
        
      let formData = new FormData();
      formData.append('fname',this.register.fname);
      formData.append('id_no',this.register.id_no);
      formData.append('phone',this.register.phone);
      formData.append('email',this.register.email);
      formData.append('password',this.register.password);
      formData.append('repassword',this.register.repassword);

      this.component.getAPI('http://ktdiapp.mooo.com/api/register.php', formData, "post").subscribe( (data:any) => {
      console.log(data)
      data.forEach( async item => {
        if(item.Code == '200'){
          console.log("register success")
          setTimeout(async ()=> {
            this.verify.type = "register"
            this.verify.email = this.register.email
            this.navigateModal("signupModal","verifyModal")
            loading.dismiss();
            this.component.toast(this.language["Account registered, proceed to verify your account"])
          }, 1000);
        }else if(item.Code == '100'){
          loading.dismiss();
          this.component.toast(this.language["This account has been registered"])
        }else{
          console.log("something went wrong")
          loading.dismiss();
          this.component.toast(this.language["Something went wrong, please try again later"])
        }
      });
    }, async error => {
        console.log(error)
        loading.dismiss();
        this.component.toast(this.language["Something went wrong, please try again later"])
    });

    }
    
  }

  async Verify(){ //verify account function
    if(this.verify.PIN == "" || this.verify.PIN == " " || this.verify.PIN == null || this.verify.PIN == undefined || Number.isInteger(parseInt(this.verify.PIN)) == false || parseInt(this.verify.PIN).toString().length < 6){
      this.verify.PIN_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Please enter a valid PIN"])
    }else{
      const loading = await this.component.loadingController.create({
        message: this.language["Verifying..."]
      });
      loading.present();

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
        
      let formData = new FormData();
      formData.append('email',this.verify.email);
      formData.append('PIN',this.verify.PIN);

      this.component.getAPI('http://ktdiapp.mooo.com/api/verify.php', formData, "post").subscribe( (data:any) => {
        console.log(data)
        data.forEach( async item => {
          if(item.Code == '200'){
            this.login.email = this.verify.email
            console.log(this.verify.type)
            switch(this.verify.type) {
              case "forgot":
                this.forgot.email = this.verify.email
                this.navigateModal("verifyModal","resetModal")
                setTimeout(async ()=> {
                  loading.dismiss();
                  this.component.toast(this.language["Account verified, please reset your password"])
                }, 1000);
                break;
              case "register":
                this.login.email = this.verify.email
                this.navigateModal("verifyModal","loginModal")
                setTimeout(async ()=> {
                  loading.dismiss();
                  this.component.toast(this.language["Account verified, proceed to login"])
                }, 1000);
                break;
              default:
            }
          }else if(item.Code == '204'){
            console.log("invalid verify")
            loading.dismiss();
            this.component.toast(this.language["Please enter a valid PIN"])
          }else{
            console.log("something went wrong")
            loading.dismiss();
            this.component.toast(this.language["Something went wrong, please try again later"])
          }
        });
      }, async error => {
          console.log(error)
          loading.dismiss();
          this.component.toast(this.language["Something went wrong, please try again later"])
      });
    }
  }

  async Reset(){ //reset password function
    if(this.forgot.password == "" || this.forgot.password == " " || this.forgot.password == null || this.forgot.password == undefined){
      this.forgot.password_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Please enter password"])
    }else if(this.forgot.password.toString().length < 8 ){
      this.forgot.password_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Password should not be less than 8 characters"])
    }else if(this.forgot.repassword != this.forgot.password){
      this.forgot.repassword_input =  ["var(--ion-color-danger)", "var(--ion-color-danger)"];
      this.component.toast(this.language["Passwords are not matching"])
    }else{
      const loading = await this.component.loadingController.create({
        message: this.language["Please Wait..."]
      });
      loading.present();
  
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
        
      let formData = new FormData();
      formData.append('email',this.forgot.email);
      formData.append('password',this.forgot.password);
      
      console.log(this.verify.email)
      this.component.getAPI('http://ktdiapp.mooo.com/api/reset_password.php', formData, "post").subscribe( (data:any) => {
        console.log(data)
        data.forEach( async item => {
          if(item.Code == '200'){
            loading.dismiss();
            this.component.toast("The password has been reset")
            this.navigateModal("resetModal","loginModal")
            setTimeout(async ()=> {
              this.component.toast(this.language["Password has been reset, proceed to login"])
            }, 1000);
          }else if(item.Code == '400'){
            console.log("invalid email")
            loading.dismiss();
            this.component.toast(this.language["Please enter a valid e-mail"])
          }else{
            console.log("something went wrong")
            loading.dismiss();
            this.component.toast(this.language["Something went wrong, please try again later"])
          }
        });
      }, async error => {
          console.log(error)
          loading.dismiss();
          this.component.toast(this.language["Something went wrong, please try again later"])
      });
    }
  }

  async sendCode(isOpen) //send verification code to email
  {
    if(isOpen == true){
      const loading = await this.component.loadingController.create({
        message: this.language["Sending PIN..."]
      });
      loading.present();
  
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
        
      let formData = new FormData();
      formData.append('email',this.verify.email);
      
      console.log(this.verify.email)
      this.component.getAPI('http://ktdiapp.mooo.com/api/code.php', formData, "post").subscribe( (data:any) => {
        console.log(data)
        data.forEach( async item => {
          if(item.Code == '200'){
            loading.dismiss();
            console.log(this.verify.type)
            this.component.toast(this.language["PIN has been sent"])
          }else if(item.Code == '204'){
            console.log("invalid email")
            loading.dismiss();
            this.component.toast(this.language["Please enter a valid e-mail"])
          }else{
            console.log("something went wrong")
            loading.dismiss();
            this.component.toast(this.language["Something went wrong, please try again later"])
          }
        });
      }, async error => {
          console.log(error)
          loading.dismiss();
          this.component.toast(this.language["Something went wrong, please try again later"])
      });
    }
  }

  changeLanguage(language){
    this.language = this.component.getLanguage(language) 
  }

  //////////////FUNCTIONS///////////////////////

}
