import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log('Http Error Occured');
                if (error) {
                    if (error.status === 401) {

                        return throwError(error.message);
                    }
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        console.log('Http Error Occured Application-Error');
                        return throwError(applicationError);
                    }
                    const serverError = error.error.errors;
                    console.log(serverError);
                    let modalStateErrors = '';
                    if (serverError && typeof serverError === 'object') {
                        for (const key in serverError) {
                            if (serverError[key]) {
                                modalStateErrors += serverError[key] + '\n';
                            }
                        }
                        return throwError(modalStateErrors || serverError || 'Server Error');

                    }
                    return throwError('Http Error Occured Network error');
                }
            })
        );
    }

}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi:  true
};
