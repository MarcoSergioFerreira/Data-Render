import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterviewRequest } from '../models/interviewRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class InterviewRequestsService {

  constructor(
    private http: HttpClient
  ) { }

  public get interviewRequests() {
    return this.http.get<InterviewRequest[]>('./assets/interviewRequests.json');
  }
}
