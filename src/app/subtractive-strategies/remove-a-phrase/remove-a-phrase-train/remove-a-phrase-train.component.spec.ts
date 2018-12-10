import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAPhraseTrainComponent } from './remove-a-phrase-train.component';

describe('RemoveAPhraseTrainComponent', () => {
  let component: RemoveAPhraseTrainComponent;
  let fixture: ComponentFixture<RemoveAPhraseTrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAPhraseTrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAPhraseTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
