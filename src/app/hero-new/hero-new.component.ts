import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.css']
})
export class HeroNewComponent implements OnInit {

  hero: Hero = {} as Hero;

  constructor(
    private location: Location, 
    private heroService: HeroService) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }

  onSaved(){
    this.goBack();
  }
}
