import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
// w skrocie pozwala modyfikowac dane zanim trafia do routy oraz te dane, ktore route zwraca
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); // wykona sie zanim wejdzie do logiki danej routy

    return next.handle().pipe(map((data) => ({ data }))); // wykona sie after // data respone from our route
    // the map operator takes a value from the stream and returns a modified one.
  }
}
