import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovalReportPageRoutingModule } from './approval-report-routing.module';

import { ApprovalReportPage } from './approval-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovalReportPageRoutingModule
  ],
  declarations: [ApprovalReportPage]
})
export class ApprovalReportPageModule {}
