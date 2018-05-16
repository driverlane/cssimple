import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { BrowseComponent } from './browse.component';
import { BrowseRowComponent } from '../browse-row/browse-row.component';
import { NodeIconPipe } from '../../core/pipes.pipe';
import { BrowsePaginationComponent } from '../browse-pagination/browse-pagination.component';
import { BrowseActionsComponent } from '../browse-actions/browse-actions.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BrowseComponent', () => {
  let component: BrowseComponent;
  let fixture: ComponentFixture<BrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [BrowseComponent, BrowseRowComponent, NodeIconPipe, BrowsePaginationComponent, BrowseActionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
