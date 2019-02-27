import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppSettings {
  public static BASE_URL = environment.basePath;
  public static HEADER_CONTENT_TYPE = 'application/json';
  public static HEADER_AUTHORIZATION = 'Authorization';
  public static HEADER_TIMEZONE = 'Timezone';
  public static HEADER_TIMEZONE_VALUE = '';
  public static HEADER_ACCEPT_LANGUAGE = 'en-US';
  public static HEADER_AUTHORIZATION_VALUE = '';
  public static TOKEN_KEY = 'Token';
  public static SESSION_KEY_NAME = 'X-SESSION-KEY';
  public static COOKIE_EXPIRY = 9999999;
}
