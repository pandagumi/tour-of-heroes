import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero, HeroGetResponse } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'https://api-default-309921.rj.r.appspot.com';

  // Eu adicionei o parametro cursor como opcional
getHeroes(cursor?: string): Observable<HeroGetResponse> {
  // Na url, eu adicionei um parametro na url com uma "?" e na interpolação eu coloquei parae enviar o cursor ou '' (?cursor=${cursor || ''})
  // O motivo desssa condição na interpolação é para não enviar o cursor como "undefined" caso ele não exista.
  return this.http.get<HeroGetResponse>(`${this.heroesUrl}/heroes?cursor=${cursor || ''}`)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<HeroGetResponse>('getHeroes', {heroes: [], cursor: ""}))
    );
}

  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/hero/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id= ${id}`)),
      catchError(this.handleError<Hero>(`getHero id= ${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  updateHero(hero: Hero): Observable<any> {
    const heroParams = {hero: hero};
    return this.http.post(`${this.heroesUrl}/hero/${hero.id}`, heroParams, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id= ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addHero(hero: Hero): Observable<Hero> {
    const heroParams = {hero: hero};
    return this.http.post<Hero>(`${this.heroesUrl}/heroes`, heroParams, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id= ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id:string): Observable<Hero>{
    const url = `${this.heroesUrl}/hero/${id}}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id= ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if (!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  topHeroes(): Observable<HeroGetResponse> {
    return this.http.get<HeroGetResponse>(`${this.heroesUrl}/top-heroes`)
    .pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<HeroGetResponse>('getHeroes', {heroes: [], cursor: ""}))
    );
  }


  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
