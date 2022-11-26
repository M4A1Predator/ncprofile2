import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCheckerComponent } from './page-checker.component';

describe('PageCheckerComponent', () => {
  let component: PageCheckerComponent;
  let fixture: ComponentFixture<PageCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCheckerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
