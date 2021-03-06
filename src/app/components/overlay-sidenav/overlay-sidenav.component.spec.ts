import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlaySidenavComponent } from './overlay-sidenav.component';

describe('OverlaySidenavComponent', () => {
  let component: OverlaySidenavComponent;
  let fixture: ComponentFixture<OverlaySidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlaySidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlaySidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
