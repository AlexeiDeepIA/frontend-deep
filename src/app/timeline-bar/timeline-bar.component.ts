import { Component } from '@angular/core';
import { VideoCellType } from 'ngx-video-timeline';

@Component({
  selector: 'app-timeline-bar',
  templateUrl: './timeline-bar.component.html',
  styleUrls: ['./timeline-bar.component.css']
})
export class TimelineBarComponent {

  title = 'ngx-video-timeline';

    speed: number;
    canvasHeight: number;
    startTimeThreshold: number;
    endTimeThreshold: number;
    videoCells: VideoCellType[];
    playTime: Date;
    isPlayClick: boolean;

    constructor() {
        this.speed = 10;
        this.isPlayClick = false;
        this.canvasHeight = 80;
        this.startTimeThreshold = new Date().getTime() - 1 * 3600 * 1000;
        this.endTimeThreshold = new Date().getTime() + 1 * 3600 * 1000;
        this.videoCells = [];
        this.playTime = new Date();
    }

    onPlay(): void {
        this.isPlayClick = true;
        this.startTimeThreshold = new Date().getTime() - 1 * 3600 * 1000;
    }

    onPause(): void {
        this.isPlayClick = false;
        // this.endTimeThreshold = new Date().getTime() + 1 * 3600 * 1000;
    }

    onPlayClick(date: number): void {
        // console.log(new Date(date));
        // this.canvasHeight = 60;
    }

    selectedTime(date: any): void {
        this.playTime = date.value;
    }

    changeVideo(): void {
        this.videoCells = [
            {
                beginTime: new Date().getTime() - 1 * 3600 * 1000,
                endTime: new Date().getTime() + 1 * 3600 * 1000,
                style: {
                    background: '#f3e5e4'
                }
            }
        ];
    }

    ngOnInit(): void {
    }
    onDragStart(): void {
        
    }
}