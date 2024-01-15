import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostelPage } from './hostel.page';

describe('HostelPage', () => {
  let component: HostelPage;
  let fixture: ComponentFixture<HostelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HostelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
