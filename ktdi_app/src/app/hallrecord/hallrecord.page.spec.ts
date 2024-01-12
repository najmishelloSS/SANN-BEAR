import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HallrecordPage } from './hallrecord.page';

describe('HallrecordPage', () => {
  let component: HallrecordPage;
  let fixture: ComponentFixture<HallrecordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HallrecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
