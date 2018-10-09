import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class DemoRsService {

  // Observable string sources
  private otpAnnouncedSource = new Subject<string>();

  // Observable string streams
  otpAnnounced$ = this.otpAnnouncedSource.asObservable();


  // Service message commands
  announceOtp(otp: string) {
    this.otpAnnouncedSource.next(otp);
  }
}
