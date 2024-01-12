import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovalReportPage } from './approval-report.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovalReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalReportPageRoutingModule {}
