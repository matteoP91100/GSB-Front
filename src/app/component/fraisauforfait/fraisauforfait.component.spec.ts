import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisauforfaitComponent } from './fraisauforfait.component';

describe('FraisauforfaitComponent', () => {
  let component: FraisauforfaitComponent;
  let fixture: ComponentFixture<FraisauforfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraisauforfaitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraisauforfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
