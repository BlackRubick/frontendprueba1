import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponentComponent } from './create-product-component.component';

describe('CreateProductComponentComponent', () => {
  let component: CreateProductComponentComponent;
  let fixture: ComponentFixture<CreateProductComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
