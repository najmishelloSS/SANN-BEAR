import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportApprovalPageRoutingModule } from './report-approval-routing.module';

import { ReportApprovalPage } from './report-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportApprovalPageRoutingModule
  ],
  declarations: [ReportApprovalPage]
})
export class ReportApprovalPageModule {}
