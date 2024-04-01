import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundColumnsComponent } from './found-columns.component';

describe('FoundColumnsComponent', () => {
  let component: FoundColumnsComponent;
  let fixture: ComponentFixture<FoundColumnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoundColumnsComponent]
    });
    fixture = TestBed.createComponent(FoundColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
