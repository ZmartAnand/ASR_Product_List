import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NextPagePage } from './next-page.page';

describe('NextPagePage', () => {
  let component: NextPagePage;
  let fixture: ComponentFixture<NextPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NextPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
