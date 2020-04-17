import { Subject } from 'rxjs';

export class UIService {
    loadingStateChange = new Subject<boolean>();
}