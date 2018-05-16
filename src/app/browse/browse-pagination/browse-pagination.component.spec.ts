import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePaginationComponent } from './browse-pagination.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BrowsePaginationComponent', () => {
  let component: BrowsePaginationComponent;
  let fixture: ComponentFixture<BrowsePaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ BrowsePaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
