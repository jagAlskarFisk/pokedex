import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundsBoxComponent } from './sounds-box.component';

describe('SoundsBoxComponent', () => {
  let component: SoundsBoxComponent;
  let fixture: ComponentFixture<SoundsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoundsBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
