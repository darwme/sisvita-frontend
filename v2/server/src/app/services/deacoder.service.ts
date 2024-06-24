import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class DeacoderService {
  key = 'ecrypt!sisvita';
  constructor() {}

  public encrypt(data: any): any {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
  }

  public decrypt(data: any): any {
    const bytes = CryptoJS.AES.decrypt(data, this.key);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  }
}
