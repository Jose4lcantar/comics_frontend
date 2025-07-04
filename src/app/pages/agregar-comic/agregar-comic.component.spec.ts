import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarComicComponent } from './agregar-comic.component';

describe('AgregarComicComponent', () => {
  let component: AgregarComicComponent;
  let fixture: ComponentFixture<AgregarComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarComicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
