import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero, HeroUniverse } from '../hero';
import { HeroService} from '../hero.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit{

  formGroup!: FormGroup;

  @Input() hero?: Hero;

  @Output() heroSaved: EventEmitter<void> = new EventEmitter<void>();

  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private heroService: HeroService, 
    private formBuilder: FormBuilder
    
    ) { }

  heroUniverses: Array<HeroUniverse> = [HeroUniverse.DC, HeroUniverse.MARVEL];

  onGoBack(): void{
    this.goBack.emit();
  }

  save(): void {
    let hero: Hero = this.formGroup.value;
    if (hero.id) {
      this.heroService.updateHero(hero)
      .subscribe(() => this.heroSaved.emit());
    } else {
      this.heroService.addHero(hero)
      .subscribe(() => this.heroSaved.emit());
    }
}


  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      id: [this.hero?.id],
      name: [this.hero?.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: [this.hero?.description, Validators.minLength(3)],
      imageUrl: [this.hero?.imageUrl, [Validators.required, Validators.pattern(' *?https{0,1}:\/\/w{0,3}.*| *?ftp:\/\/w{0,3}.*| *?\n|^$')]],
      universe: [this.hero?.universe]
    })
  }
}
