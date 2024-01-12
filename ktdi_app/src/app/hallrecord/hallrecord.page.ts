import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../service/components.service';
import { ActivatedRoute } from '@angular/router';
import format from 'date-fns/format';

@Component({
  selector: 'app-hallrecord',
  templateUrl: './hallrecord.page.html',
  styleUrls: ['./hallrecord.page.scss'],
})
export class HallrecordPage implements OnInit {

  data;
  language;
  booking;
  active;
  past;
  active_booking;
  past_booking;
  searchbar;
  list: string; //segment history 
  loaded = false;
  loadLoop = Array(5);
  pageActive =  Array();
  pagePast =  Array();
  page = 1;

  constructor(
    private component : ComponentsService,
    private route : ActivatedRoute,
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
    this.list = "current"
    this.getBookingRecord()
  }

  getBookingRecord(){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let formData = new FormData();
    
    this.component.getAPI('http://ktdiapp.mooo.com/api/booking_record.php', formData, "get").subscribe( (data:any) => { //login API
      console.log(data)
      if(data.Code == '200'){
        // this.component.toast("Data Retrieved")

        for(let i = 0; i < data.Booking.length; i ++){ 
          let today = format(new Date(), 'yyyy-MM-dd')
          // console.log( new Date(today).valueOf() ,new Date(data.Booking[i]['programme_date']).valueOf())
          if(new Date(today).valueOf() > new Date(data.Booking[i]['programme_end']).valueOf() ){
            data.Booking[i]['programme_status'] = "Finished"
            data.Booking[i]['filter'] = "Past"
            data.Booking[i]['status_color'] = "success"
          }else if(new Date(today).valueOf() >= new Date(data.Booking[i]['programme_date']).valueOf() && new Date(today).valueOf() <= new Date(data.Booking[i]['programme_end']).valueOf()){
            data.Booking[i]['programme_status'] = "Ongoing"
            data.Booking[i]['status_color'] = "warning"
            data.Booking[i]['filter'] = "Active"
          }else{
            data.Booking[i]['programme_status'] = "Upcoming"
            data.Booking[i]['status_color'] = "primary"
            data.Booking[i]['filter'] = "Active"
          }

        }
        let booking = data.Booking
        booking = booking.filter(e => e["user_id"] == this.data['login']['user_id'])
        this.data.booking = booking
        this.active = booking.filter(e => e["filter"] == "Active")
        this.active = this.addPage(this.active, "active")
        this.active_booking = this.active
        this.active = booking.filter(e => e["page"] == 1)
        this.past = booking.filter(e => e["filter"] == "Past")
        this.past = this.addPage(this.past, "past")
        this.past_booking = this.past
        this.past = booking.filter(e => e["page"] == 1)
        console.log(this.active)
        // console.log(data.Booking, this.data.booking, booking)
      }else{
        console.log("something went wrong")
        this.component.toast(this.language["Something went wrong, please try again later"])
      }
      this.loaded = true
    }, async error => {
        console.log(error)
        this.component.toast(this.language["Something went wrong, please try again later"])
        this.loaded = true
    });
  }

  addPage(array, type){
    let x = 1
    let count = 1
    switch(type){
      case "active":
        this.pageActive = []
        this.pageActive.push(x)
        break;
      default:
        this.pagePast = []
        this.pagePast.push(x)
    }
    for(let i = 0; i < array.length; i ++){ 
      count += 1
      if(count > 6){
        x += 1
        count = 1
        switch(type){
          case "active":
            this.pageActive.push(x)
            break;
          default:
            this.pagePast.push(x)
        }
      }
      array[i]["page"] = x
    }
    console.log(this.pageActive, this.pagePast, array)
    return array
  }

  translateData(data){
    console.log(data, this.data.language)
    return this.component.translateData(data, this.data.language)
  }

  paging(direction, type, array){
    switch(direction){
      case "previous":
        if(this.page != 1){
          this.page -= 1
        }
        break;
      case "next":
        if(this.page != array.length){
          this.page += 1 
        }
        break;
      default:
        this.page = direction
    }
    if(type == "active"){
      this.active = this.active_booking.filter(e => e["page"] == this.page) //not working with query
    }else{
      this.past = this.past_booking.filter(e => e["page"] == this.page)
    }

  }

  reset(){
    this.page = 1
    this.active = this.addPage(this.active_booking, "active")
    this.past = this.addPage(this.past_booking, "past")
    this.active = this.active_booking.filter(e => e["page"] == this.page)
    this.past = this.past_booking .filter(e => e["page"] == this.page)
  }

  search(event, search){
    const query = event.target.value.toLowerCase();
    console.log(query)
    switch(search){
      case "active":
        if(query){
          this.active = this.active_booking.filter(e => e["programme_name"].toLowerCase().indexOf(query) > -1)
          this.active = this.addPage(this.active, "active")
          this.active = this.active.filter(e => e["page"] == 1)

        }else{
          this.reset()
        }
        break;
      default:
        if(query){
          this.past = this.past_booking.filter(e => e["programme_name"].toLowerCase().indexOf(query) > -1)
          this.past = this.addPage(this.past, "past")
          this.past = this.past.filter(e => e["page"] == 1)
        }else{
          this.reset()
        }
        break;

    }

  }

  navigate(route, direction){
    this.component.navigate(route, this.data, direction)
  }

  goToLink(url){
    url = 'http://ktdiapp.mooo.com/'+url
    this.component.openBrowser(url)
  }

}