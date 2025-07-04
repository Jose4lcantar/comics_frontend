import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComicComponent } from './editar-comic.component';

describe('EditarComicComponent', () => {
  let component: EditarComicComponent;
  let fixture: ComponentFixture<EditarComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarComicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
