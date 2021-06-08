import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildSetTableComponent } from './build-set-table.component';

describe('BuildSetTableComponent', () => {
  let component: BuildSetTableComponent;
  let fixture: ComponentFixture<BuildSetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildSetTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildSetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
