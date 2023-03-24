import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArabicLangTemplateComponent } from './arabic-lang-template.component';

describe('ArabicLangTemplateComponent', () => {
  let component: ArabicLangTemplateComponent;
  let fixture: ComponentFixture<ArabicLangTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArabicLangTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArabicLangTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
