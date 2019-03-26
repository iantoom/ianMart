import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosComponentComponent } from './pos-component.component';

describe('PosComponentComponent', () => {
  let component: PosComponentComponent;
  let fixture: ComponentFixture<PosComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
