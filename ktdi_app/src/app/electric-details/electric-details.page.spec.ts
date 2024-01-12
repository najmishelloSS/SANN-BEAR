import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElectricDetailsPage } from './electric-details.page';

describe('ElectricDetailsPage', () => {
  let component: ElectricDetailsPage;
  let fixture: ComponentFixture<ElectricDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ElectricDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
