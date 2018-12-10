import { Directive, HostBinding, HostListener, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { NgControl } from '@angular/forms';
import { PersistenceService } from '../services/persistence.service';

@Directive({
  // tslint:disable-next-line
  selector: '[persist]'
})
export class PersistenceDirective implements OnInit, OnChanges {
  @Input('persist')
  public key = '';
  private storageKey = '';

  constructor(
    private control: NgControl,
    private persistenceService: PersistenceService,
  ) {}
  
  public ngOnInit() {
    this.storageKey = window.location.pathname + '#' + (this.key || this.control.name);
    
    this.control.valueChanges
      .subscribe(value => {
        window.localStorage.setItem(this.storageKey, value);
      });
    
    const startingValue = this.persistenceService.getItem(this.storageKey);
    
    if (!startingValue) return;
    
    this.control.reset(startingValue);
  }
  
  public ngOnChanges(changes: { key: SimpleChange }) {
    if (changes.key.isFirstChange()) return;
    
    this.storageKey = window.location.pathname + '#' + (this.key || this.control.name);
  }
}
