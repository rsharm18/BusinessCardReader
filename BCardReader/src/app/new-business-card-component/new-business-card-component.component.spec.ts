import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusinessCardComponentComponent } from './new-business-card-component.component';

describe('NewBusinessCardComponentComponent', () => {
  let component: NewBusinessCardComponentComponent;
  let fixture: ComponentFixture<NewBusinessCardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBusinessCardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBusinessCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
