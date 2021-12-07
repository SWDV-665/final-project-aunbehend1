import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import {map, catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class taskServiceProvider {
  
  items: any = [];
  dataChanged$: Observable<boolean>;
  
  private dataChangeSubject: Subject<boolean>;
  
  baseURL = 'https://finalweek7andyu.herokuapp.com/api/tasks';
  // Add to the services
  constructor(public http: HttpClient) {
  console.log('Hello taskServicesProvider Provider');
  
  this.dataChangeSubject = new Subject<boolean>();
  this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
    

// Read(Read)Method
getItems() {
  return this.http
    .get(this.baseURL + '/api/taska')
    .pipe(map(this.extractData), catchError(this.handleError));
}

private extractData(res: Response) {
  let body = res;
  return body || {};
}

  private handleError(error: Response | any ) {
    let errMsg: string;
    if (error instanceof Response){
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText} || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString(); 
    } 
    console.error(errMsg)
    return throwError(errMsg);
  }


  addItem(item) {
    this.http.post(this.baseURL + "/api/tasks", item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  editItem(item, index) {
    this.http.post(this.baseURL + "/api/tasks" + item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

}