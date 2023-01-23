import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PageableModel} from "../../shared/pageable.model";
import {CharacterModel} from "../model/character.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly API = 'desafioiterative-api/character'

  constructor(
    private httpClient: HttpClient,
  ) { }

  list(name?: string, page?: number): Observable<PageableModel<CharacterModel>> {
    const params = this.preparaParametros(name, page);
    return this.httpClient.get<PageableModel<CharacterModel>>(this.API, {params});
  }

  preparaParametros(name?: string, page?: number): HttpParams {
    let params: HttpParams = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }
    if (name) {
      params = params.append('name', name.toString());
    }
    return params;
  }
}
