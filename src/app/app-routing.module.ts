import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';

import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { NoCampaignsComponent } from './no-campaigns/no-campaigns.component';
import { UploadCsvComponent } from './upload-csv/upload-csv.component';
import { FoundColumnsComponent } from './found-columns/found-columns.component';
import { TimelineBarComponent } from './timeline-bar/timeline-bar.component';
import { HeaderComponent } from './header/header.component';
import { AuthRoutesService } from './_services/auth-routes.service';
import { SliderComponent } from './slider/slider.component';
import { ColumnInfoComponent } from './column-info/column-info.component';
import { LandingComponent } from './landing/landing.component';
import { VideoPageComponent } from './video-page/video-page.component';
import { LoaderComponent } from './loader/loader.component';
import { SuccessPageComponent } from './success-page/success-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthRoutesService]},
  { path: 'campaigns', component: CampaignsComponent, canActivate: [AuthRoutesService]},
  { path: 'no-campaigns', component: NoCampaignsComponent, canActivate: [AuthRoutesService]},
  { path: 'upload-csv', component: UploadCsvComponent, canActivate: [AuthRoutesService]},
  { path: 'csv-content', component: FoundColumnsComponent, canActivate: [AuthRoutesService]},
  { path: 'timeline', component: TimelineBarComponent,canActivate: [AuthRoutesService]},
  { path: 'landing', component: LandingComponent, canActivate: [AuthRoutesService]},
  { path: 'success-page', component: SuccessPageComponent, canActivate: [AuthRoutesService]},
  { path: 'video-page', component: VideoPageComponent},
  { path: 'slider', component: SliderComponent},
  { path: 'columns', component: ColumnInfoComponent },
  { path: 'loader', component: LoaderComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MatSliderModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
