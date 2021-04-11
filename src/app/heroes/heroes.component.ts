import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  cursor: string;
  
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes(this.cursor)
      .subscribe(heroesGetResponse => {
        if (this.cursor){
          this.heroes = this.heroes.concat(heroesGetResponse.heroes);
        } else {
          this.heroes = heroesGetResponse.heroes;
        }
        this.cursor = heroesGetResponse.cursor;
      });
  }


  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  
  onScrollDown(){
    console.log("chamou scrollDown");
    if (this.cursor){
      this.getHeroes();
    }
  }

}
