import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieShopComponent } from './movie-shop.component';

describe('MovieShopComponent', () => {
  let component: MovieShopComponent;
  let fixture: ComponentFixture<MovieShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
