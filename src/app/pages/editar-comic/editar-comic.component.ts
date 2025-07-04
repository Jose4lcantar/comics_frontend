import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ComicService } from '../../services/comic.service';
import { Comic } from '../../models/comic.model';

@Component({
  selector: 'app-editar-comic',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar-comic.component.html',
  styleUrls: ['./editar-comic.component.css']  // Corregido: era styleUrl en lugar de styleUrls
})
export class EditarComicComponent implements OnInit {

  comicForm: FormGroup = new FormGroup({});
  enviado: boolean = false;
  comicGenero: string[] = [
    'Acción',
    'Suspenso',
    'Shonen',
    'RomCom',
    'Deportes',
    'Terror'
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private comicService: ComicService,
    private actRoute: ActivatedRoute
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getComic(id);
    }
  }

  mainForm() {
    this.comicForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      editorial: ['', [Validators.required]],
      anio: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{4}$'), // Solo 4 dígitos para el año
      ]],
      autor: ['', [Validators.required]],
      imagenUrl: ['', [
        Validators.required,
        Validators.pattern(/https?:\/\/.+/)
      ]]
    });
  }

  actualizarGenero(event: Event): void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const generoSeleccionado = seleccionarElemento.value;
    this.comicForm.get('genero')?.setValue(generoSeleccionado);
  }

  get myForm() {
    return this.comicForm.controls;
  }

  getComic(id: any) {
    this.comicService.getComic(id)
      .subscribe((data) => {
        this.comicForm.setValue({
          titulo: data.titulo,
          genero: data.genero,
          editorial: data.editorial,
          anio: data.anio,
          autor: data.autor,
          imagenUrl: data.imagenUrl || ''  // Asegura que imagenUrl esté presente
        });
      });
  }

  onSubmit() {
    this.enviado = true;
    if (!this.comicForm.valid) {
      return false;
    } else {
      if (window.confirm('¿Estás seguro que deseas modificar este cómic?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        if (id) {
          this.comicService.actualizarComic(id, this.comicForm.value)
            .subscribe({
              complete: () => {
                this.router.navigateByUrl('/listar-comics');
                console.log('Se actualizó correctamente el cómic');
              },
              error: (e) => {
                console.log(e);
              }
            });
        }
      }
      return;
    }
  }
}
