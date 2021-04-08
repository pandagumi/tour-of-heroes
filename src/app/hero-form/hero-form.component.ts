import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero, HeroUniverse } from '../hero';
import { HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent{

  @Input() hero?: Hero;

  @Output() heroSaved: EventEmitter<void> = new EventEmitter<void>();

  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  constructor(private heroService: HeroService) { }

  heroUniverses: Array<HeroUniverse> = [HeroUniverse.DC, HeroUniverse.MARVEL];

  onGoBack(): void{
    this.goBack.emit();
  }
 

  save(): void {
    if(this.hero?.id){
      this.heroService.updateHero(this.hero!)
        .subscribe(() => this.heroSaved.emit());
    }else{
      this.heroService.addHero(this.hero!)
        .subscribe(() => this.heroSaved.emit());
    }
  }
}
