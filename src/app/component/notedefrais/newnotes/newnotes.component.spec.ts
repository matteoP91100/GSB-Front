import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewnotesComponent } from './newnotes.component';

describe('NewnotesComponent', () => {
  let component: NewnotesComponent;
  let fixture: ComponentFixture<NewnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewnotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
