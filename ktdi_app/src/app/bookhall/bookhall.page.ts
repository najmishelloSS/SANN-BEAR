import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, IonDatetime } from '@ionic/angular';
import { ComponentsService } from '../service/components.service';
import { DataService } from '../service/data.service';
import {format, parse, parseISO} from 'date-fns';

@Component({
  selector: 'app-bookhall',
  templateUrl: './bookhall.page.html',
  styleUrls: ['./bookhall.page.scss'],
})
export class BookhallPage implements OnInit {

  data : any ;
  date = new Date()
  language : any //language library
  bookingModal = false;
  setDateModal = false;
  setStartModal = false;
  setEndModal = false;
  approvalModal = false;
  tentativeModal = false;
  page = 1;
  pageArray = [1,2,3,4]

  showPicker = false;
  formattedString = '';
  startString = '';
  endString = '';
  currentDate = format(new Date(), 'yyyy-MM-dd HH:mm a');
  minDate : any = new Date().toISOString();
  file:File
  @ViewChild(IonDatetime) datetime :IonDatetime;

  booking={ //for booking inputs
    rent_date: undefined,
    rent_price : 0,
    rent_type : undefined,
    rent_start : undefined,
    rent_end : undefined,
    total: 0,
    rent_duration: 1,
    selected : undefined,
    index: undefined,
    name: undefined,
    participant: undefined,
    letter: File,
    tentative: File,
    price_input:["", "var(--ion-color-success)"], //default colour input
    venue_input:["", "var(--ion-color-success)"]
  }

  constructor(
    public route:ActivatedRoute,
    public loadingController:LoadingController,
    public dataservice:DataService,
    public component:ComponentsService
  ) { 

  }

  ngOnInit() {
    if(this.route.snapshot.data['special']){
      this.data = this.route.snapshot.data['special'];
    }
    this.language = this.component.getLanguage(this.data.language) 
    if(this.data == undefined){
      this.data.page = 1;
      // this.navigate("splashscreen", this.data, "back") 
    }
    console.log(this.data)
    this.getHall()
    this.formattedString = this.language['Select Date'];
    this.startString = this.language['Select Starting Time'];
    this.endString = this.language['Select Ending Time'];

  }

  isWeekDay(dateString: string){
    const date = new Date(dateString);
    if(date.getDate() == 15 && date.getMonth() == 0 && date.getFullYear() == 2024){
      return false;
    }else{
      return true
    }
  }
  
  paging(direction){
    switch(direction){
      case "previous":
        if(this.page != 1){
          this.page -= 1
        }
        break;
      case "next":
        if(this.page != this.pageArray.length){
          this.page += 1 
        }
        break;
      default:
        this.page = direction
    }
  }

  getHall(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let formData = new FormData();
    
    this.component.getAPI('http://ktdiapp.mooo.com/api/hall.php', formData, "get").subscribe( (data:any) => { //login API
      console.log(data)
      if(data.Code == '200'){
        this.data.hall = data.Hall
        // this.component.toast("Data Retrieved")
      }else{
        console.log("something went wrong")
        this.component.toast(this.language["Something went wrong, please try again later"])
      }
    }, async error => {
        console.log(error)
        this.component.toast(this.language["Something went wrong, please try again later"])
    });
  }

  navigate(route, direction){
    this.component.navigate(route, this.data, direction);
  }

  book(index){
    if(index == this.booking.index && this.booking.rent_date != undefined && this.booking.rent_price != 0 && this.booking.rent_type != undefined){
      this.ionChange('save')
    }else{
      this.ionChange('reset')
    }
    this.booking = this.data.hall[index]
    this.booking.index = index
    console.log(this.booking)
    this.setOpen(true, "bookingModal")
  }

  display(){
    this.setOpen(false, 'bookingModal')
    this.ionChange("save")
    this.booking.selected = this.booking.index
    console.log(this.booking)
  }
  
  ionChange(state){ //reset required inputs color
    if(state == "reset"){
      this.formattedString = this.language['Select Date'];
      this.booking.rent_date = undefined
      this.booking.rent_duration = 1
      this.booking.rent_price = 0
      this.booking.rent_type = undefined
      this.booking.selected = undefined
    }
    this.booking.total = 0
    this.booking.total += +this.booking.rent_price * this.booking.rent_duration
    this.booking.venue_input =  ["", "var(--ion-color-success)"];
    this.booking.price_input =  ["", "var(--ion-color-success)"];
  }

  setOpen(isOpen: boolean, modal) { //open or close modal
    switch(modal) {
      case "bookingModal":
        this.bookingModal = isOpen; 
        break;
      case "setDateModal":
        this.setDateModal = isOpen; 
        break;
      case "setStartModal":
        this.setStartModal = isOpen; 
        break;
      case "setEndModal":
        this.setEndModal = isOpen; 
        break;
      case "approvalModal":
        this.approvalModal = isOpen; 
        break;
      case "tentativeModal":
        this.tentativeModal = isOpen; 
        break;
    }
  }

  dateChanged(value, type){
    switch(type){
      case "date" :
        if(!value){
          this.formattedString = 'Select Date';
          this.booking.rent_date = value
          console.log(1)
        }else if(Array.isArray(value) == false ){
          value = format(parseISO(this.currentDate), 'yyyy-MM-dd');
          this.formattedString = format(parseISO(value), 'dd/MM');
          this.booking.rent_date = value
          this.booking.rent_duration = 1
          console.log(2)
        }else{
          this.formattedString = '';
          for(let i = 0; i < value.length; i++){
            value = value.sort()
            value[i] = format(parseISO(value[i]), 'yyyy-MM-dd');
            this.formattedString += format(parseISO(value[i]), 'dd/MM') ;
            if(i != value.length - 1){
              this.formattedString += ", "
            }
          }
          this.booking.rent_date = value
          this.booking.rent_duration = value.length
        }
        break;
      case "starttime":
        console.log(value)
        if(!value){
          value = format(new Date(this.currentDate), 'HH:mm a');
          this.startString = value;
          this.booking.rent_start = value
          console.log(1)
        }else{
          this.startString = '';
          this.booking.rent_start = value //remember to format(parseISO) before sending to db
          value = format(parseISO(value), 'HH:mm a');
          this.startString = value;
          console.log(2)
        }
        break;
      case "endtime":
        console.log(value)
        if(!value){
          value = format(new Date(this.currentDate), 'HH:mm a');
          this.endString = value;
          this.booking.rent_end = value
          console.log(1)
        }else{
          this.endString = '';
          this.booking.rent_end = value //remember to format(parseISO) before sending to db
          value = format(parseISO(value), 'HH:mm a');
          this.endString = value;
          console.log(2)
        }
        break;
    }
  }

  onFileChange(fileChangeEvent, file)
  {
    switch(file){
      case "approval":
        this.booking.letter = fileChangeEvent.target.files[0]
        this.file = fileChangeEvent.target.files[0]
        console.log(this.booking.letter)
        break;
      case "tentative":
        this.booking.tentative = fileChangeEvent.target.files[0]
        console.log(this.booking.tentative)
        break;
    }
  }

  bookHall(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    
    let formData = new FormData();
    formData.append('user_id', this.data.login.user_id);
    formData.append('programme_name', this.booking.name!);
    formData.append('programme_fee', this.booking.total.toString());
    formData.append('approval_letter', this.file);
    console.log(this.booking)

    this.component.getAPI('http://ktdiapp.mooo.com/api/book_hall.php', formData, "post").subscribe( (data:any) => { //login API
    data.forEach( async item => {
      if(item.Code == '200'){
        console.log(data)
      }else{
        this.component.toast(this.language["Something went wrong, please try again later"])
      }
    });
  }, async error => {
      console.log(error)
      this.component.toast(this.language["Something went wrong, please try again later"])
  });
  }

}
