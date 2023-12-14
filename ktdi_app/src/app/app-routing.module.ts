import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  {
    path: 'home/:id',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splashscreen',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile/:id',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login/:id',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'splashscreen',
    loadChildren: () => import('./splashscreen/splashscreen.module').then( m => m.SplashscreenPageModule)
  },
  {
    path: 'bookhall',
    loadChildren: () => import('./bookhall/bookhall.module').then( m => m.BookhallPageModule)
  },
  {
    path: 'bookhall/:id',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./bookhall/bookhall.module').then( m => m.BookhallPageModule)
  },
  {
    path: 'room-registration',
    loadChildren: () => import('./room-registration/room-registration.module').then( m => m.RoomRegistrationPageModule)
  },
  {
    path: 'room-registration/:id',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./room-registration/room-registration.module').then( m => m.RoomRegistrationPageModule)
  },
  {
    path: 'electric',
    loadChildren: () => import('./electric/electric.module').then( m => m.ElectricPageModule)
  },
  {
    path: 'electric/:id',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./electric/electric.module').then( m => m.ElectricPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'feedback/:id',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'report/:id',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'report-status',
    loadChildren: () => import('./report-status/report-status.module').then( m => m.ReportStatusPageModule)
  },
  {
    path: 'report-status/:id',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./report-status/report-status.module').then( m => m.ReportStatusPageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
