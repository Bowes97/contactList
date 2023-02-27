import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IPerson} from '../interfaces/main.inteface';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private url = 'http://localhost:3000/persons'

  constructor(private http: HttpClient) {
  }

  getInfo(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this.url)
  }

  getOne(id: number): Observable<IPerson> {
    return this.http.get<IPerson>(`${this.url}/${id}`)
  }

  create(person: IPerson): Observable<void> {
    return this.http.post<void>(this.url, person)
  }

  update(person: IPerson, id: number): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, person)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

}
