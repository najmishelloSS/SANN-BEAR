import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportApprovalPage } from './report-approval.page';

describe('ReportApprovalPage', () => {
  let component: ReportApprovalPage;
  let fixture: ComponentFixture<ReportApprovalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReportApprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
