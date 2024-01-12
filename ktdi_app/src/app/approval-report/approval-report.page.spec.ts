import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovalReportPage } from './approval-report.page';

describe('ApprovalReportPage', () => {
  let component: ApprovalReportPage;
  let fixture: ComponentFixture<ApprovalReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApprovalReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
