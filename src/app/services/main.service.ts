import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private url = 'http://localhost:3000/persons'

  constructor(private http: HttpClient) {
  }

  getInfo(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url)
  }

  getOne(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.url}/${id}`)
  }

  create(person: Person): Observable<void> {
    return this.http.post<void>(this.url, person)
  }

  update(person: Person, id: number): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, person)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

}
