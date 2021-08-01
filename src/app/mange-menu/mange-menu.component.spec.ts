import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeMenuComponent } from './mange-menu.component';

describe('MangeMenuComponent', () => {
  let component: MangeMenuComponent;
  let fixture: ComponentFixture<MangeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
