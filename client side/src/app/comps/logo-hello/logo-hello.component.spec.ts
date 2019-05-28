import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoHelloComponent } from './logo-hello.component';

describe('LogoHelloComponent', () => {
  let component: LogoHelloComponent;
  let fixture: ComponentFixture<LogoHelloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoHelloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
