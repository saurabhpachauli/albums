import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeshiftLightboxComponent } from './makeshift-lightbox.component';

describe('MakeshiftLightboxComponent', () => {
  let component: MakeshiftLightboxComponent;
  let fixture: ComponentFixture<MakeshiftLightboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeshiftLightboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeshiftLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
