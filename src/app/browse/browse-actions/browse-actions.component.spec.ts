import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseActionsComponent } from './browse-actions.component';

describe('BrowseActionsComponent', () => {
  let component: BrowseActionsComponent;
  let fixture: ComponentFixture<BrowseActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
