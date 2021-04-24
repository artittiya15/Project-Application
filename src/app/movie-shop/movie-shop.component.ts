import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-shop',
  templateUrl: './movie-shop.component.html',
  styleUrls: ['./movie-shop.component.css'],
})
export class MovieShopComponent implements OnInit {
  movieName: string = '';
  movies: Movie[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

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
}

export interface MoviesSearch {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
