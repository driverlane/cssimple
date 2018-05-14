import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowseRowComponent } from './browse-row.component';
import { NodeIconPipe } from '../../core/pipes.pipe';

describe('BrowseRowComponent', () => {
  let component: BrowseRowComponent;
  let fixture: ComponentFixture<BrowseRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ BrowseRowComponent, NodeIconPipe ]
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
