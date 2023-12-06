import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomRegistrationPageRoutingModule } from './room-registration-routing.module';

import { RoomRegistrationPage } from './room-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomRegistrationPageRoutingModule
  ],
  declarations: [RoomRegistrationPage]
})
export class RoomRegistrationPageModule {}
