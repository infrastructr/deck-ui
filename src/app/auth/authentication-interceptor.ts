import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(x => this.handleAuthError(x))
      );
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (!err.url.endsWith('/users/login') && (err.status === 401 || err.status === 403)) {
      this.router.navigate([`login`]);

      return of(err.message);
    }
    return throwError(err);
  }
}
