import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookhallPage } from './bookhall.page';

describe('BookhallPage', () => {
  let component: BookhallPage;
  let fixture: ComponentFixture<BookhallPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookhallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
