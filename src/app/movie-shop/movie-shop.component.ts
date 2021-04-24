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
    return JSON.parse(localStorage.getItem('movies') || '{}');
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
}

export interface MoviesSearch {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
