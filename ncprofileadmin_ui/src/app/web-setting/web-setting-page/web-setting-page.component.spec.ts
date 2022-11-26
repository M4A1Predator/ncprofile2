import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSettingPageComponent } from './web-setting-page.component';

describe('WebSettingPageComponent', () => {
  let component: WebSettingPageComponent;
  let fixture: ComponentFixture<WebSettingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebSettingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebSettingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
