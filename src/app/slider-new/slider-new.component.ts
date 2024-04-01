import { Component, EventEmitter, Input, Output, OnInit, Renderer2, ElementRef } from '@angular/core';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-slider-new',
  templateUrl: './slider-new.component.html',
  styleUrls: ['./slider-new.component.css']
})
export class SliderNewComponent implements OnInit {

  selectedValue: number = 0;
  startValue: number = 0;
  endValue: number = 3;
  videoDuration: number = 60;
  @Input() colName: string = "Campo";
  @Input() colNumber: number = 0;
  @Input() colValue: string = "";
  @Output() startHasChanged = new EventEmitter<{ value1: number, value2: number }>();
  @Output() endHasChanged = new EventEmitter<number[]>();
  @Output() toggleButtons = new EventEmitter<boolean>();
  @Output() startValueChanged = new EventEmitter<number>();
  @Output() endValueChanged = new EventEmitter<number>();

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

  onEndInputChange(event: any){
    let cp = this.videoService.getColumnPlaying();
    if(cp == this.colNumber) this.videoService.setVideoLimit(this.endValue);
    var response = [this.endValue, this.colNumber];
    this.endHasChanged.emit(response);
    this.endValueChanged.emit(this.endValue); // Emitir directamente el valor
  }

  onStartInputChange(event: any){
    let cp = this.videoService.getColumnPlaying();
    var response = [this.startValue, this.colNumber];    
    if(cp == this.colNumber){
      const video = document.getElementById('video') as HTMLVideoElement;
      video.currentTime = this.startValue;
    }
    this.startValueChanged.emit(this.startValue); // Emitir directamente el valor
  }

  playColumnClick(){
    const video = document.getElementById('video') as HTMLVideoElement;
    let cp = this.videoService.getColumnPlaying();
    let ap = this.videoService.getActivePlaying();
    
    if(this.colNumber != cp){
      this.videoService.setColumnPlaying(this.colNumber);
      this.videoService.setVideoLimit(this.endValue);
      video.currentTime = this.startValue;
    }

    if(ap){
      this.toggleButtons.emit(false);
      const btnIcon = this.el.nativeElement.querySelector("i");
      this.renderer.addClass(btnIcon, 'fa-play');
      this.renderer.removeClass(btnIcon, 'fa-pause');
      video.pause();
    }
    else{
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
