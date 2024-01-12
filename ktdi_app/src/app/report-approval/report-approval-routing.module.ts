import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportApprovalPage } from './report-approval.page';

const routes: Routes = [
  {
    path: '',
    component: ReportApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportApprovalPageRoutingModule {}
