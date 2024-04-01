import { Component, EventEmitter, Input, Output, AfterViewInit, OnInit, Renderer2, ElementRef } from '@angular/core';
import { VideoService } from '../services/video.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  selectedValue: number = 0;
  startValue: number = 0;
  endValue: number = 3;
  videoDuration: number = 60;
  @Input() colName: string = "Campo";
  @Input() colNumber: number = 0;
  @Input() colValue: string = "";
  @Output() startHasChanged = new EventEmitter<{ index: number, value: number }>();
  @Output() endHasChanged = new EventEmitter<{ index: number, value: number }>();
  @Output() toggleButtons = new EventEmitter<boolean>();

  constructor(private videoService: VideoService, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.videoDuration = this.videoService.getVideoDuration();
    }, 1000)
  }

  formatLabel(selectedValue: number){
      const minutes = Math.floor(selectedValue / 60);
      const seconds = selectedValue % 60;
      if(seconds < 10){
        return `${minutes}:0${seconds}`;
      }
      return `${minutes}:${seconds}`;
  }

  onEndInputChange(event: Event){
    let cp = this.videoService.getColumnPlaying();
    if(cp == this.colNumber) this.videoService.setVideoLimit(this.endValue);
    const index = this.colNumber;
    const value = this.endValue;
    this.endHasChanged.emit({ value, index });
  }

  onStartInputChange(event: Event){
    let cp = this.videoService.getColumnPlaying();
    const index = this.colNumber;
    const value = this.startValue;
    this.startHasChanged.emit({ value, index });
    //console.log("COMPARACION CP",cp,"con CN",this.colNumber);
    if(cp == this.colNumber){
      const video = document.getElementById('video') as HTMLVideoElement;
      video.currentTime = this.startValue;
    }
  }
  //AL HACER CLICK EN EL BOTON
  //Se debería, si el columnPlaying es diferente al valor de la columna pulsada,
  //asignarle el valor del boton pulsado, actualizar el limite, actualizar el inicio
  //del video, si es igual, solo pausar o play segun el active playing

  playColumnClick(){
    const video = document.getElementById('video') as HTMLVideoElement;
    let cp = this.videoService.getColumnPlaying();
    let ap = this.videoService.getActivePlaying();
    
    //if(this.colNumber != cp){
      this.videoService.setColumnPlaying(this.colNumber);
      this.videoService.setVideoLimit(this.endValue);
      video.currentTime = this.startValue;
    //}

    if(ap){
//1.- Si está activo, pausar video, cambiar icono, habilitar todos los botones
      this.toggleButtons.emit(false);
      const btnIcon = this.el.nativeElement.querySelector("i");
      this.renderer.addClass(btnIcon, 'fa-play');
      this.renderer.removeClass(btnIcon, 'fa-pause');
      video.pause();
    }
    else{
//2.- Si está inactivo, deshabilitar todos los botones, activar ese, actualizar
//limite en base al endSlide, play video
      
    this.toggleButtons.emit(true);
      this.el.nativeElement.querySelector(".playColBtn").disabled = false;
      const btnIcon = this.el.nativeElement.querySelector("i");
      this.renderer.addClass(btnIcon, 'fa-pause');
      this.renderer.removeClass(btnIcon, 'fa-play');
      video.play();
    }
    
    this.videoService.setActivePlaying(!ap);
  }
}