import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAPhraseComponent } from './add-a-phrase.component';

describe('AddAPhraseComponent', () => {
  let component: AddAPhraseComponent;
  let fixture: ComponentFixture<AddAPhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAPhraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
