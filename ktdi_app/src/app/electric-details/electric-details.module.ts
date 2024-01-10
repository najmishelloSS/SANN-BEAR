import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectricDetailsPageRoutingModule } from './electric-details-routing.module';

import { ElectricDetailsPage } from './electric-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectricDetailsPageRoutingModule
  ],
  declarations: [ElectricDetailsPage]
})
export class ElectricDetailsPageModule {}