import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSymbolDownloadComponent } from './set-symbol-download.component';

describe('SetSymbolDownloadComponent', () => {
  let component: SetSymbolDownloadComponent;
  let fixture: ComponentFixture<SetSymbolDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetSymbolDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSymbolDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
