import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickWordComponent } from './pick-word.component';

describe('PickWordComponent', () => {
  let component: PickWordComponent;
  let fixture: ComponentFixture<PickWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
