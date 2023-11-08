import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  modal = false
  login={
    email:undefined,
    password:undefined
  }
  canDismiss = false;

  constructor() { }

  ngOnInit() {
  }

  loginModal(isOpen: boolean) {
    this.canDismiss = true;
    this.modal = isOpen;
    this.canDismiss = false;
  }

}
