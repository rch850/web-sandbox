import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCComponent } from './text-c.component';

describe('TextCComponent', () => {
  let component: TextCComponent;
  let fixture: ComponentFixture<TextCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
