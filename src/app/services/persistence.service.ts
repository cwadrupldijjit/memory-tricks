import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }
  
  public saveItem(key: string, value: any) {
    value = this.convertItemToStorableEntity(value);
    
    window.localStorage.setItem(key, value);
  }
  
  public getItem<T = any>(key): T {
    const item = window.localStorage.getItem(key);
    
    if (!item) return item as any;
    
    return this.convertItemFromStorableEntity(item);
  }
  
  public itemExists(key: string) {
    return window.localStorage.getItem(key) != null;
  }
  
  public convertItemToStorableEntity(value: any): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    
    if (typeof value == 'object' && value != null) {
      return JSON.stringify(value);
    }
    
    return String(value);
  }
  
  public convertItemFromStorableEntity(item: string) {
    if (item.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
      return new Date(item);
    }
    
    if (!Number.isNaN(+item)) {
      return +item;
    }
    
    try {
      return JSON.parse(item);
    }
    catch (_) {
      return item;
    }
  }
}
