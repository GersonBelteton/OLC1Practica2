import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfComponent } from './interf.component';

describe('InterfComponent', () => {
  let component: InterfComponent;
  let fixture: ComponentFixture<InterfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
