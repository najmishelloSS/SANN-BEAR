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
  pageArray = [1,2,3,4,5,6];
  check = false;

  showPicker = false;
  formattedString = '';
  startString = '';
  endString = '';
  currentDate = format(new Date(), 'yyyy-MM-dd HH:mm a');
  minDate : any = new Date().toISOString();
  file:File
  file2:File
  @ViewChild(IonDatetime) datetime :IonDatetime;

  booking={ //for booking inputs
    hall_name: undefined,
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
    deposit: 0,
    letter: File,
    tentative: File,
    price_input:["", "var(--ion-color-success)"], //default colour input
    venue_input:["", "var(--ion-color-success)"]
  }

  plastic = 0; //furniture
  banquet = 0;
  desk = 0;
  whiteboard = 0;
  partition = 0;
  pa_system = 0;
  hand_mic = 0;
  stand_mic = 0;
  comber = 0;
  projector = 0;
  additional = Array(0)
  additionalNull = Array(3)


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

  async addEquipment(operation){
    switch(operation){
      case "add":
        const alert = await this.component.alertController.create({
          header: this.language["Additional Equipment Information"],
          message: this.language["Please fill in the details."],
          inputs: [
            {
              label: this.language["Equipment Name"],
              placeholder: this.language["Equipment Name"],
              value: this.language["Additional Equipment"] + " " + (this.additional.length+1),
              name: "equipment"
            },
            {
              label: this.language["Equipment Amount"],
              type: "number",
              placeholder: this.language["Equipment Amount"],
              min: 0,
              max: 1000,
              value: 1,
              name : "amount"
            },
          ],
          buttons: [
            {
              text: this.language["Add"],
              handler: (alertData) => {
                let amount : number =+ alertData.amount //convert string to int
                let array = { name:alertData.equipment, amount: amount}
                this.additional.push(array)
              }
            },
            {
              text: this.language["Cancel"],
              role: "cancel",
              handler: () => {
                console.log('Cancel');
              }
            },
          ]
        });
    
        await alert.present();
        break;

      default:
        this.additional.pop()
    }
    console.log(this.additional)
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
    console.log(index, this.booking.index, this.booking.rent_date, this.booking.rent_price, this.booking.rent_type)
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
    console.log(state)
    if(state == "reset"){
      this.booking.name = undefined
      this.booking.participant= undefined
      this.file= undefined
      this.file2= undefined
      this.booking.letter = undefined
      this.booking.tentative = undefined
      this.formattedString = this.language['Select Date'];
      this.startString = this.language['Select Starting Time'];
      this.endString = this.language['Select Ending Time'];
      this.booking.rent_date = undefined
      this.booking.rent_duration = 1
      this.booking.rent_price = 0
      this.booking.deposit = 0
      this.booking.rent_type = undefined
      this.booking.selected = undefined
      this.plastic = 0;
      this.banquet = 0;
      this.desk = 0;
      this.whiteboard = 0;
      this.partition = 0;
      this.pa_system = 0;
      this.hand_mic = 0;
      this.stand_mic = 0;
      this.comber = 0;
      this.projector = 0;
      this.additional =[]
      this.check = false
    }else if(state == "save"){
      this.page = 1
    }
    let deposit = 0
    if(this.booking.hall_name == "Dewan Sri Resak" || this.booking.hall_name == "Dewan Serbaguna"){
      deposit = this.booking.deposit
    }
    this.booking.total = 0
    this.booking.total += +this.booking.rent_price * this.booking.rent_duration + Number(deposit)
    this.booking.venue_input =  ["", "var(--ion-color-success)"];
    this.booking.price_input =  ["", "var(--ion-color-success)"];
    if(Number.isNaN(this.booking.total)){
      this.booking.total = 0
    }
  }

  addFurniture(furniture, value){
    switch(furniture){
      case "plastic":
        if(this.plastic + value >= 0) this.plastic += value
        break;
      case "banquet":
        if(this.banquet + value >= 0) this.banquet += value
        break;      
      case "desk":
        if(this.desk + value >= 0) this.desk += value
        break;      
      case "whiteboard":
        if(this.whiteboard + value >= 0) this.whiteboard += value
        break;      
      case "partition":
        if(this.partition + value >= 0) this.partition += value
        break;      
      case "pa_system":
        if(this.pa_system + value >= 0) this.pa_system += value
        break;      
      case "hand_mic":
        if(this.hand_mic + value >= 0) this.hand_mic += value
        break;      
      case "stand_mic":
        if(this.stand_mic + value >= 0) this.stand_mic += value
        break;      
      case "comber":
        if(this.comber + value >= 0) this.comber += value
        break;      
      case "projector":
        if(this.projector + value >= 0) this.projector += value
        break;  
      default:
        if(this.additional[furniture]["amount"] + value >= 0) this.additional[furniture]["amount"] += value
        console.log(this.additional)
    }
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
          value = this.minDate;
          this.startString = format(new Date(this.minDate), 'HH:mm a');
          this.booking.rent_start = value
          console.log(1, this.booking.rent_start)
        }else{
          this.startString = '';
          this.booking.rent_start = value //remember to format(parseISO) before sending to db
          value = format(parseISO(value), 'HH:mm a');
          this.startString = value;
          console.log(2, this.booking.rent_start)
        }
        break;
      case "endtime":
        console.log(value)
        if(!value){
          value = this.minDate;
          this.endString = format(new Date(this.minDate), 'HH:mm a');;
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
        this.file2 = fileChangeEvent.target.files[0]
        console.log(this.booking.tentative)
        break;
    }
  }

  checkbox(e): void {
    var isChecked = e.currentTarget.checked;
    console.log(isChecked, this.check)
  }

  async bookHall(){
    const loading = await this.component.loadingController.create({ 
      message: this.language["Please Wait..."]
    });
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let programme_end:any = this.booking.rent_date
    programme_end = programme_end.slice(-1)
    console.log(programme_end)

    console.log(this.booking)

    let formData = new FormData();
    formData.append('user_id', this.data.login.user_id);
    formData.append('programme_name', this.booking.name!);
    formData.append('programme_venue', this.booking.hall_name!);
    formData.append('programme_date', JSON.stringify(this.booking.rent_date!));
    formData.append('programme_end', programme_end);
    formData.append('rent_fee', this.booking.total.toString());
    formData.append('no_of_participants', this.booking.participant!);
    formData.append('programme_type', this.booking.rent_type!);
    formData.append('start_time', format(new Date(this.booking.rent_start!), 'HH:mm a'));
    formData.append('end_time', format(new Date(this.booking.rent_end!), 'HH:mm a'));
    formData.append('rent_duration', this.booking.rent_duration.toString());
    formData.append('approval_letter', this.file);
    formData.append('programme_tentative', this.file2);
    formData.append('booking', JSON.stringify(this.booking));
    formData.append('plastic', this.plastic.toString())
    formData.append('banquet', this.banquet.toString())
    formData.append('desk', this.desk.toString())
    formData.append('whiteboard', this.whiteboard.toString())
    formData.append('partition', this.partition.toString())
    formData.append('pa_system', this.pa_system.toString())
    formData.append('hand_mic', this.hand_mic.toString())
    formData.append('stand_mic', this.stand_mic.toString())
    formData.append('comber', this.comber.toString())
    formData.append('projector', this.projector.toString())
    formData.append('additional', JSON.stringify(this.additional));

    loading.present();

    // this.component.getAPI('http://ktdiapp.mooo.com/api/book_hall.php', formData, "post").subscribe( async (data:any) => { //login API
    this.component.getAPI('http://localhost/stripe/test.php', formData, "post").subscribe( async (data:any) => { //login API
    console.log(data)
      data.forEach( async item => {
        if(item.Code == '200'){
          console.log(data)
          loading.dismiss();
        }else{
          this.component.toast(this.language["Something went wrong, please try again later"])
          console.log(item.Booking, item.Message)
          loading.dismiss();
        }
      });
    }, async error => {
        console.log(error)
        this.component.toast(this.language["Something went wrong, please try again later"])
        console.log("error 2")
        loading.dismiss();
    });
  }

}
