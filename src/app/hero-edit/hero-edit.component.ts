import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero, HeroUniverse } from '../hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.css']
})
export class HeroEditComponent implements OnInit {

  hero?: Hero;
  heroUniverses: Array<HeroUniverse> = [HeroUniverse.DC, HeroUniverse.MARVEL];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    const id = this.route.snapshot.paramMap.get('id')!;
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.goBack();
  }

}
