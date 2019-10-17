import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBComponent } from './text-b.component';

describe('TextBComponent', () => {
  let component: TextBComponent;
  let fixture: ComponentFixture<TextBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
