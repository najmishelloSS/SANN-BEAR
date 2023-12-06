import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomRegistrationPage } from './room-registration.page';

describe('RoomRegistrationPage', () => {
  let component: RoomRegistrationPage;
  let fixture: ComponentFixture<RoomRegistrationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RoomRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
