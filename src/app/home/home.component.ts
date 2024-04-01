import { Component, ChangeDetectorRef, Input, OnInit, Renderer2, ElementRef } from '@angular/core';
import { VideoService } from '../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private el: ElementRef
  ){}  
  @Input() startValue: number[] = [0,0,0,0];
  @Input() endValue: number[] = [5,5,5,5];
  /*@Input() startValue1: number = 0;
  @Input() startValue2: number = 0;
  @Input() startValue3: number = 0;
  @Input() startValue4: number = 0;
  @Input() endValue1: number = 3;
  @Input() endValue2: number = 3;
  @Input() endValue3: number = 3;
  @Input() endValue4: number = 3;*/
  videoSource = '../../assets/images/The Best 20 Seconds in El Clasico Ever.mp4';
  currentTime = 0;
  videoDuration = 150;
  videoLimit = -1;
  isPlaying: boolean = false;
  isDisabled: boolean = false;
  csvData: any;

  ngOnInit() {
    const video = document.getElementById('video') as HTMLVideoElement;
    video.onloadedmetadata = () => {
      this.videoService.setVideoDuration(Math.floor(video.duration));
      this.videoDuration = this.videoService.getVideoDuration();
    };

    this.route.params.subscribe(params => {
      this.csvData = JSON.parse(params['data']);
      console.log('Datos del csv: ', this.csvData);
      
    })
  }

  onTimeUpdate(event: any) {
    const video = document.getElementById('video') as HTMLVideoElement;
    this.currentTime = event.target.currentTime;
    this.videoLimit = this.videoService.getVideoLimit();
    
    if(this.videoLimit != -1 && video.currentTime > this.videoLimit){
      video.pause();
      //console.log("video parado xd",this.currentTime,"es mayor que",this.videoLimit);
      this.toggleSlider(false);
      //console.log(this.isDisabled);
      this.videoService.setActivePlaying(false);
      this.videoService.setColumnPlaying(0);
      this.videoService.setVideoLimit(-1);
    }
  }

  playButton() {
    const video = document.getElementById('video') as HTMLVideoElement;
      if (video) {
        if (this.isPlaying) {
          video.pause();
      } else {
        video.play();
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  changeStart(event: { index: number, value: number }){
    const index = event.index;
    const value = event.value;
    this.startValue[index] = value;
    /*switch(event[1]){
      case 1:
        this.startValue1 = event[0];
        break;
      case 2:
        this.startValue2 = event[0];
        break;
      case 3:
        this.startValue3 = event[0];
        break;
      case 4:
        this.startValue4 = event[0];
        break;
    }*/
  }

  changeEnd(event: { index: number, value: number }){
    const index = event.index;
    const value = event.value;
    this.endValue[index] = value;
  }

  /*toggleButtons(): void {
    const buttons = this.el.nativeElement.querySelectorAll(".playColBtn");
    //console.log("Extension ", buttons.length, this.isDisabled);
    buttons.forEach((button: HTMLButtonElement) => {
      console.log("boton desabilitado", !this.isDisabled);
      this.renderer.setProperty(button, 'disabled', !this.isDisabled);
    });
    this.isDisabled = !this.isDisabled;
  }*/

  toggleSlider(dis: boolean): void {
    const buttons = this.el.nativeElement.querySelectorAll(".playColBtn");
    //console.log("Extension ", buttons.length, this.isDisabled);
    buttons.forEach((button: HTMLButtonElement) => {
      //console.log("boton desabilitado", dis);
      this.renderer.setProperty(button, 'disabled', dis);
    });
    if(!dis){
      const btnIcons = this.el.nativeElement.querySelectorAll(".fa");
      btnIcons.forEach((btnIcon: HTMLElement) => {
        this.renderer.addClass(btnIcon, "fa-play");
        this.renderer.removeClass(btnIcon, "fa-pause");
      })
    }
  }
}