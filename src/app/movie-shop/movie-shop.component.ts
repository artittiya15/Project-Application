import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from './../common/global-variables';

@Component({
  selector: 'app-movie-shop',
  templateUrl: './movie-shop.component.html',
  styleUrls: ['./movie-shop.component.css'],
})
export class MovieShopComponent implements OnInit {
  movieName: string = '';
  innerWidth: number = 1600;
  movies: Movie[] = [];
  carts: Movie[] = [];
  constructor() {
    this.onResize();
  }

  ngOnInit(): void {
    GlobalVariables.drawer?.openedChange.subscribe((opened) => {
      this.innerWidth = opened
        ? window.innerWidth - (GlobalVariables.drawer?._getWidth() || 0)
        : window.innerWidth;
    });
    this.movies = this.getMovies();
    this.carts = JSON.parse(localStorage.getItem('carts') || '[]');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.innerWidth = window.innerWidth;
  }

  searchMovies(): void {
    this.movies = this.getMovies().filter((item) =>
      item.original_title.includes(this.movieName)
    );
  }

  getMovies(): Movie[] {
    return JSON.parse(localStorage.getItem('movies') || '[]');
  }

  onClickAddToCart(movie: Movie): void {
    console.log(movie.amount);
    const exist = this.carts.find((item) => item.id === movie.id);
    if (exist) exist.amount += movie.amount;
    else {
      this.carts.push(Object.assign({}, movie));
      GlobalVariables.totalItemInCart.emit(1);
    }

    localStorage.setItem('carts', JSON.stringify(this.carts));
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
  price: number;
  amount: number;
}

export interface MoviesSearch {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
