import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

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
  declarations: [ElectricPage],
  providers: [DecimalPipe],
})
export class ElectricPageModule {}
