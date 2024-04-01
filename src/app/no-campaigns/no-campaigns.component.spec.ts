import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCampaignsComponent } from './no-campaigns.component';

describe('NoCampaignsComponent', () => {
  let component: NoCampaignsComponent;
  let fixture: ComponentFixture<NoCampaignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoCampaignsComponent]
    });
    fixture = TestBed.createComponent(NoCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
