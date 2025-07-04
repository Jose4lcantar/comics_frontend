import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule, ReactiveFormsModule, 
  FormGroup, FormBuilder, 
  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComicService } from '../../services/comic.service';

@Component({
  selector: 'app-agregar-comic',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-comic.component.html',
  styleUrls: ['./agregar-comic.component.css']
})
export class AgregarComicComponent implements OnInit {

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
    private ngZone: NgZone,
    private comicService: ComicService
  ){
    this.mainForm();
  }

  ngOnInit(): void {}

  mainForm() {
    this.comicForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      editorial: ['', [Validators.required]],
      anio: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{4}$') // patrón para 4 dígitos
      ]],
      autor: ['', [Validators.required]],
      imagenUrl: ['', [
        Validators.required,
        Validators.pattern(/https?:\/\/.+/) // validación básica URL http o https
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

  onSubmit(): void {
    this.enviado = true;

    if (this.comicForm.valid) {
      this.comicService.agregarComic(this.comicForm.value).subscribe({
        next: (res) => {
          console.log('Comic agregado correctamente', res);
          this.ngZone.run(() => this.router.navigateByUrl('/listar-comics'));
        },
        error: (e) => {
          console.error(e);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
