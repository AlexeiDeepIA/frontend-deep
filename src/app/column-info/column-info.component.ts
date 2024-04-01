import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column-info',
  templateUrl: './column-info.component.html',
  styleUrls: ['./column-info.component.css']
})
export class ColumnInfoComponent {

  @Input() colName: string = '';
  @Input() colNumber: number = 0;
  @Input() startValue: number = 0;
  @Input() endValue: number = 1;

    formatLabel(value: number){
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      if(seconds < 10){
        return `${minutes}:0${seconds}`;
      }
      return `${minutes}:${seconds}`;
  }

  updateStartValue(value: number) {
    this.startValue = value;
  }

  updateEndValue(value: number) {
    this.endValue = value;
  }
}