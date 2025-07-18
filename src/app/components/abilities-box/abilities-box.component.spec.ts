import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesBoxComponent } from './abilities-box.component';

describe('AbilitiesBoxComponent', () => {
  let component: AbilitiesBoxComponent;
  let fixture: ComponentFixture<AbilitiesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilitiesBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbilitiesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
