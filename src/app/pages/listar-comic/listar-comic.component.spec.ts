import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComicComponent } from './listar-comic.component';

describe('ListarComicComponent', () => {
  let component: ListarComicComponent;
  let fixture: ComponentFixture<ListarComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarComicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
