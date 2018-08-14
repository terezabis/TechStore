import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsMineComponent } from './products-mine.component';

describe('ProductsMineComponent', () => {
  let component: ProductsMineComponent;
  let fixture: ComponentFixture<ProductsMineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsMineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
