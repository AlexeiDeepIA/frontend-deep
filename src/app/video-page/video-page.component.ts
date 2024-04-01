import { Component, ChangeDetectorRef, Input, OnInit, Renderer2, ElementRef } from '@angular/core';
import { VideoService } from '../services/video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css']
})
export class VideoPageComponent {

  constructor(
    private videoService: VideoService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private el: ElementRef,
    private route: ActivatedRoute
  ){}
  videoUrl: string;
  @Input() startValue1: number = 0;
  @Input() startValue2: number = 0;
  @Input() startValue3: number = 0;
  @Input() startValue4: number = 0;
  @Input() endValue1: number = 3;
  @Input() endValue2: number = 3;
  @Input() endValue3: number = 3;
  @Input() endValue4: number = 3;

  videoSource = '../../assets/images/The Best 20 Seconds in El Clasico Ever.mp4';
  currentTime = 0;
  videoDuration = 150;
  videoLimit = -1;
  isPlaying: boolean = false;
  isDisabled: boolean = false;

  ngOnInit() {
    const video = document.getElementById('video') as HTMLVideoElement;
    video.onloadedmetadata = () => {
      this.videoService.setVideoDuration(Math.floor(video.duration));
      this.videoDuration = this.videoService.getVideoDuration();
    };
    // Accede al estado de la ruta para obtener la URL del video pasada desde el componente anterior
    const videoUrl = this.route.snapshot.queryParamMap.get('videoUrl');
    if (videoUrl !== null) {
      this.videoUrl = videoUrl;
      console.log(this.videoUrl); // Solo para verificar si la URL del video se recibe correctamente
    } else {
      console.error('No se ha proporcionado una URL de video.');
    }
  }

  onStartValueChanged(value: number, colNumber: number) {    
    switch(colNumber) {
      case 1:
        this.startValue1 = value;
        break;
      case 2:
        this.startValue2 = value;
        break;
      case 3:
        this.startValue3 = value;
        break;
      case 4:
        this.startValue4 = value;
        break;
      default:
        break;
    }
  }
  
  onEndValueChanged(value: number, colNumber: number) {    
    switch(colNumber) {
      case 1:
        this.endValue1 = value;
        break;
      case 2:
        this.endValue2 = value;
        break;
      case 3:
        this.endValue3 = value;
        break;
      case 4:
        this.endValue4 = value;
        break;
      default:
        break;
    }
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

  changeStart(event: any){
    switch(event[1]){
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
    }
  }

  changeEnd(event: any){
    switch(event[1]){
      case 1:
        this.endValue1 = event[0];
        break;
      case 2:
        this.endValue2 = event[0];
        break;
      case 3:
        this.endValue3 = event[0];
        break;
      case 4:
        this.endValue4 = event[0];
        break;
    }
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
