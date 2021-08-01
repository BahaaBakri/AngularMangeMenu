import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BindHeaderMangeService } from '../bind-header-mange.service';
import { Menu } from '../shared/Menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**subscription for binding  */
  bindSubscriotion:Subscription;
  /**data in header */
  dataHeader:Menu[]
  /**
   * Constructor
   * @param bind injected value to access BindHeaderMangeService service
   */
  constructor(private bind:BindHeaderMangeService) { }
  /** On Init Life Cycle Hook */
  ngOnInit() {
    if (localStorage.getItem('localData')) {
      this.dataHeader = JSON.parse(localStorage.getItem('localData'))
    }
    this.bindSubscriotion = this.bind.bindChanges.subscribe(data => {
      this.dataHeader = data
    })
  }
  /** On Destroy Life Cycle Hook */
  ngOnDestroy () {
    this.bindSubscriotion.unsubscribe
  }

}
