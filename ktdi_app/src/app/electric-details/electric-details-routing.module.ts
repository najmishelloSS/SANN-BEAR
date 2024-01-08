import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectricDetailsPage } from './electric-details.page';

const routes: Routes = [
  {
    path: '',
    component: ElectricDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectricDetailsPageRoutingModule {}
