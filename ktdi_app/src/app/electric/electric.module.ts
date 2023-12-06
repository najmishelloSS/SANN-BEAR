import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectricPageRoutingModule } from './electric-routing.module';

import { ElectricPage } from './electric.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectricPageRoutingModule
  ],
  declarations: [ElectricPage]
})
export class ElectricPageModule {}
