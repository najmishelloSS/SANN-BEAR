import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElectricPage } from './electric.page';

describe('ElectricPage', () => {
  let component: ElectricPage;
  let fixture: ComponentFixture<ElectricPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ElectricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
