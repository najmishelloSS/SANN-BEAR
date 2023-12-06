import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectricPage } from './electric.page';

const routes: Routes = [
  {
    path: '',
    component: ElectricPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectricPageRoutingModule {}
