import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HallrecordPageRoutingModule } from './hallrecord-routing.module';

import { HallrecordPage } from './hallrecord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HallrecordPageRoutingModule
  ],
  declarations: [HallrecordPage]
})
export class HallrecordPageModule {}
