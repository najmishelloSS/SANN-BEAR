import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackDetailsPage } from './feedback-details.page';

describe('FeedbackDetailsPage', () => {
  let component: FeedbackDetailsPage;
  let fixture: ComponentFixture<FeedbackDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FeedbackDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
