import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowseRowComponent } from './browse-row.component';
import { NodeIconPipe } from '../../core/pipes.pipe';
import { BrowseActionsComponent } from '../browse-actions/browse-actions.component';
import { HttpClientModule } from '@angular/common/http';

describe('BrowseRowComponent', () => {
  let component: BrowseRowComponent;
  let fixture: ComponentFixture<BrowseRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ BrowseRowComponent, NodeIconPipe, BrowseActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
