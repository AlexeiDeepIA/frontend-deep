import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnInfoComponent } from './column-info.component';

describe('ColumnInfoComponent', () => {
  let component: ColumnInfoComponent;
  let fixture: ComponentFixture<ColumnInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnInfoComponent]
    });
    fixture = TestBed.createComponent(ColumnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
