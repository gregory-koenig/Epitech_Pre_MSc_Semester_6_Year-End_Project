import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndercoComponent } from './underco.component';

describe('UndercoComponent', () => {
  let component: UndercoComponent;
  let fixture: ComponentFixture<UndercoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndercoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndercoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
