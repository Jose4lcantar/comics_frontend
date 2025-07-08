import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComicService } from '../../services/comic.service';

@Component({
  selector: 'app-listar-comic',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-comic.component.html',
  styleUrls: ['./listar-comic.component.css']
})
export class ListarComicComponent implements OnInit {
  comics: any = [];

  constructor(private comicService: ComicService) {}

  ngOnInit(): void {
    this.getComics(); 
  }

  getComics(): void {
    this.comicService.getComics().subscribe((data) => {
      this.comics = data;
    });
  }

  eliminarComic(comic: any, index: number) {
    if (window.confirm('¿Estás seguro que lo deseas eliminar?')) {
      this.comicService.eliminarComic(comic._id).subscribe(() => {
        this.comics.splice(index, 1);
      });
    }
  }
}
