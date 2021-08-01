import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Menu } from './shared/Menu';

@Injectable({
  providedIn: 'root'
})
export class BindHeaderMangeService {

  constructor() { }
  bindChanges = new Subject<Menu[]>()
}
