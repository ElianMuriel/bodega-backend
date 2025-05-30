import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola mundo, soy Elian Muriel de la UTE, futuro programador!!!!';
  }
}
