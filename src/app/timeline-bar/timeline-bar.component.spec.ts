import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineBarComponent } from './timeline-bar.component';

describe('TimelineBarComponent', () => {
  let component: TimelineBarComponent;
  let fixture: ComponentFixture<TimelineBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineBarComponent]
    });
    fixture = TestBed.createComponent(TimelineBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
