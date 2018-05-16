import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessesHomeComponent } from './processes-home.component';
import { NodeIconPipe } from '../../core/pipes.pipe';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProcessesHomeComponent', () => {
  let component: ProcessesHomeComponent;
  let fixture: ComponentFixture<ProcessesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ProcessesHomeComponent, NodeIconPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
