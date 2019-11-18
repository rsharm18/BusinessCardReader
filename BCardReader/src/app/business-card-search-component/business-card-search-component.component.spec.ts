import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCardSearchComponentComponent } from './business-card-search-component.component';

describe('BusinessCardSearchComponentComponent', () => {
  let component: BusinessCardSearchComponentComponent;
  let fixture: ComponentFixture<BusinessCardSearchComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCardSearchComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCardSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
