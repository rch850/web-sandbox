import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAComponent } from './text-a.component';

describe('TextAComponent', () => {
  let component: TextAComponent;
  let fixture: ComponentFixture<TextAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
