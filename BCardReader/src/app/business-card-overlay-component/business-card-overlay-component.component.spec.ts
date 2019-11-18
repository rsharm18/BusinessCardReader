import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCardOverlayComponentComponent } from './business-card-overlay-component.component';

describe('BusinessCardOverlayComponentComponent', () => {
  let component: BusinessCardOverlayComponentComponent;
  let fixture: ComponentFixture<BusinessCardOverlayComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCardOverlayComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCardOverlayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
