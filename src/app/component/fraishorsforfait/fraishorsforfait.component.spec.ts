import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraishorsforfaitComponent } from './fraishorsforfait.component';

describe('FraishorsforfaitComponent', () => {
  let component: FraishorsforfaitComponent;
  let fixture: ComponentFixture<FraishorsforfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraishorsforfaitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraishorsforfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
