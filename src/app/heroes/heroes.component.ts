import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
    selected: true,
  };
  heroes = HEROES;
  selectedHero?: Hero;

  constructor() {}

  ngOnInit(): void {}
  onSelect(hero: Hero): void {
    this.heroes.map((h) => (h.id == hero.id ? true : false));
    this.selectedHero = hero;
  }
}
