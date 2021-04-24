import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GlobalVariables } from '../common/global-variables';

@Component({
  selector: 'app-movie-manage',
  templateUrl: './movie-manage.component.html',
  styleUrls: ['./movie-manage.component.css'],
})
export class MovieManageComponent implements OnInit {
  movieName: string = '';
  innerWidth: number = 1600;
  movie: Movie | undefined;
  movies: Movie[] = [];
  localMovies: Movie[] = [];
  // drawerWidthNow = GlobalVariables.drawerWidthNow;
  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.localMovies = JSON.parse(localStorage.getItem('movies') || '{}');
    this.onResize();
  }

  ngOnInit(): void {
    GlobalVariables.drawer?.openedChange.subscribe((opened) => {
      this.innerWidth = opened
        ? window.innerWidth - (GlobalVariables.drawer?._getWidth() || 0)
        : window.innerWidth;
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.innerWidth = window.innerWidth;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MovieSetPriceDialog, {
      width: '250px',
      data: Object.assign({}, this.movie),
    });

    dialogRef.afterClosed().subscribe((result: Movie) => {
      console.log('The dialog was closed');
      if (result === null || result === undefined) return;
      const exist = this.localMovies.find((item) => item.id == result.id);
      if (exist === undefined) this.localMovies.push(result);
      localStorage.setItem('movies', JSON.stringify(this.localMovies));
    });
  }

  onClickSetPrice(movie: Movie): void {
    this.movie = movie;
    this.openDialog();
  }

  searchMovies(): void {
    this.getMovies().subscribe((res) => {
      this.movies = res.results;
    });
  }

  getMovies(): Observable<MoviesSearch> {
    return this.http.get<MoviesSearch>(
      'https://api.themoviedb.org/3/search/movie?api_key=b303fe1a62fae1c10f73dfbafcda1849&query=' +
        this.movieName
    );
  }
}

@Component({
  selector: 'movie-set-price',
  templateUrl: 'movie-set-price.html',
})
export class MovieSetPriceDialog {
  constructor(
    public dialogRef: MatDialogRef<MovieSetPriceDialog>,
    @Inject(MAT_DIALOG_DATA) public movie: Movie
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface Movie {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  price?: number;
}

export interface MoviesSearch {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
