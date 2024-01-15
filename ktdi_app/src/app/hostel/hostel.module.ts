import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HostelPageRoutingModule } from './hostel-routing.module';

import { HostelPage } from './hostel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HostelPageRoutingModule
  ],
  declarations: [HostelPage]
})
export class HostelPageModule {}
