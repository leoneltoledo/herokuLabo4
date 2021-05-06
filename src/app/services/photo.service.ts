import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photo: string;
  constructor(private http: HttpClient) {
    
   }

  getPhotos() {
    return this.http.get('https://api.unsplash.com/collections/LCpx_cj_aFo/photos?&client_id=x2VJlSy03mTachanGm7c5Ao7q6Sl3R26eZVBFRHiGnk').pipe(
      map((res: any) => {
        return res;
      }),
        retry(5));
  }
}
