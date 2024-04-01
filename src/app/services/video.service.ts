import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
    private videoDuracion: number = 60;
    private columnPlaying: number = 0;
    private videoLimit: number = 60;
    private activePlaying: boolean = false;
  
  setVideoDuration(duration: number): void {
    this.videoDuracion = duration;
  }

  getVideoDuration(): number {
    return this.videoDuracion;
  }

  setColumnPlaying(videoId: number): void {
    this.columnPlaying = videoId;
  }

  getColumnPlaying(): number {
    return this.columnPlaying;
  }

  setActivePlaying(value: boolean): void {
    this.activePlaying = value;
    //console.log("playing activoo= ",value);
    
  }

  getActivePlaying(): boolean {
    return this.activePlaying;
  }

  setVideoLimit(limit: number): void {
    this.videoLimit = limit;
    //console.log("Limite seteado a", limit, " aaaaaa");
  }

  getVideoLimit(): number {
    //console.log("Obtenido el limite sig:", this.videoLimit, "aaaaaa");
    return this.videoLimit;
  }
}