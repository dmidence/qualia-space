import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeenterpriseComponent } from './homeenterprise.component';

describe('HomeenterpriseComponent', () => {
  let component: HomeenterpriseComponent;
  let fixture: ComponentFixture<HomeenterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeenterpriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeenterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
