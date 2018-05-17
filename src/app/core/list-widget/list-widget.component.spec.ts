import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWidgetComponent } from './list-widget.component';
import { NodeIconPipe } from '../pipes.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListWidgetComponent', () => {
  let component: ListWidgetComponent;
  let fixture: ComponentFixture<ListWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ListWidgetComponent, NodeIconPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
