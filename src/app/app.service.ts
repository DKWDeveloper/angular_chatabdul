import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ChatRequest } from './chatRequest';

@Injectable({ providedIn: 'root' })
export class AppService {
  private baseURL: string = "https://www.api.chatabdul.com/api/v1/"
  constructor(private http: HttpClient) { }

  /**
   * function used to get response from the API.
   * @param chatRequest
   * @returns
   */
  getChatResponse(chatRequest: ChatRequest, language: any): Observable<any> {
    const headers = { 'content-type': 'application/json', 'X-Security-Key': '628ac8af-8027-418b-9856-98d56e3232cf' }
    chatRequest.lang=language
    const body = JSON.stringify(chatRequest);
    return this.http.post(this.baseURL + 'ask-abdul', body, { 'headers': headers })
  }

}
