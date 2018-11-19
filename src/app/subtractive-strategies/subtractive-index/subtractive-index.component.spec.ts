import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtractiveIndexComponent } from './subtractive-index.component';

describe('SubtractiveIndexComponent', () => {
  let component: SubtractiveIndexComponent;
  let fixture: ComponentFixture<SubtractiveIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtractiveIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtractiveIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
