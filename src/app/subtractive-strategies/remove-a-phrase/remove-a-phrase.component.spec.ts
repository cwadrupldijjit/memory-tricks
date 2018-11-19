import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAPhraseComponent } from './remove-a-phrase.component';

describe('RemoveAPhraseComponent', () => {
  let component: RemoveAPhraseComponent;
  let fixture: ComponentFixture<RemoveAPhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAPhraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
