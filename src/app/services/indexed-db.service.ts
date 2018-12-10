import { Injectable } from '@angular/core';
import { IObject } from '../data-types/ambiguous-object';
import { runSetup } from './init-database';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private _writableTransaction: IDBTransaction;
  public readonly db: Promise<IDBDatabase>;
  
  constructor() {
    if (!window.indexedDB) {
      window.alert(
        'Your browser doesn\'t support a stable version of IndexedDB.\n' +
        'In order for the best experience possible, please use a newer browser.',
      );
    }
    
    this.db = this.initializeDatabase();
  }
  
  public async get(collectionName: string, identifier: number|string) {
    const transaction = await this._createReadableTransaction();
    const collection = transaction.objectStore(collectionName);
    
    return new Promise((resolve, reject) => {
      const request = collection.get(identifier);
      
      request.onerror = (event) => {
        console.warn(`Failed to find an item at ${collection.keyPath}`);
        console.warn(event.target);
        reject(event.target);
      };
      
      request.onsuccess = event => {
        resolve((event.target as IObject).result);
      };
    });
  }
  
  public async getAll(collectionName: string) {
    const transaction = await this._createReadableTransaction();
    const collection = transaction.objectStore(collectionName);
    
    return new Promise((resolve, reject) => {
      const request = collection.getAll();
      
      request.onerror = (event) => {
        console.warn(`Failed to find an item at ${collection.keyPath}`);
        console.warn(event.target);
        reject(event.target);
      };
      
      request.onsuccess = event => {
        resolve((event.target as IObject).result);
      };
    });
  }
  
  public async put(collectionName: string, data: object) {
    if (!collectionName) {
      throw Error('Collection name required');
    }
    
    const db = await this.db;
    
    const tempCollection = db.transaction([collectionName]).objectStore(collectionName);
    
    const original = await this.get(collectionName, data[tempCollection.keyPath as string]);
    
    const transaction = this._writableTransaction ? this._writableTransaction : await this._createWritableTransaction();
    const collection = transaction.objectStore(collectionName);
    
    const updates = {
      ...original,
      ...data,
    };
    
    return new Promise((resolve, reject) => {
      const request = collection.put(updates);
      
      request.onerror = e => {
        console.warn(`Failed to update the item with identifier of ${collection.keyPath}`);
        console.warn(e.target);
        reject(e.target);
      };
      request.onsuccess = e => {
        resolve(updates);
      };
    });
  }
  
  public async delete(collectionName: string, identifier: string) {
    const transaction = this._writableTransaction || await this._createWritableTransaction();
    const collection = transaction.objectStore(collectionName);
    
    return new Promise((resolve, reject) => {
      const request = collection.delete(identifier);
      
      request.onerror = e => {
        console.warn(`Failed to delete the item with identifier of ${collection.keyPath}`);
        console.warn(e.target);
        reject(e.target as IObject);
      };
      
      request.onsuccess = e => {
        resolve((e.target as IObject).result);
      };
    });
  } 
  
  public async add(collectionName: string, data: any) {
    console.log('made it into the add method');
    const transaction = this._writableTransaction || await this._createWritableTransaction();
    const collection = transaction.objectStore(collectionName);
    console.log(collectionName, collection);
    
    return new Promise((resolve, reject) => {
      const request = collection.add(data);
      
      request.onerror = e => {
        console.warn(`Failed to add the provided item`);
        console.warn(e.target);
        reject(e.target as IObject);
      };
      
      request.onsuccess = e => {
        data[collection.keyPath as string] = (e.target as IObject).result;
        resolve(data);
      };
    });
  }
  
  private _createWritableTransaction = async (db?: IDBDatabase) => {
    db = db || await this.db;
    
    this._writableTransaction = db.transaction(Array.from(db.objectStoreNames), 'readwrite');
    
    this._writableTransaction.onerror = event => {
      // if (event.target.errorCode == )
      console.warn('Transaction error', event.target);
    };
    
    this._writableTransaction.onabort = event => {
      this._writableTransaction = null;
    };
    
    this._writableTransaction.oncomplete = event => {
      this._writableTransaction = null;
    };
    
    return this._writableTransaction;
  }
  
  private _createReadableTransaction = async () => {
    const db = await this.db;
    const transaction = db.transaction(Array.from(db.objectStoreNames));
    
    return transaction;
  }
  
  private initializeDatabase(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = window.indexedDB.open('memory-tricks-db', 4);
      
      request.onsuccess = onSuccess;
      request.onupgradeneeded = onSuccess;
      
      request.onerror = (event: Event&{ target: IObject }) => {
        console.warn(event.target.errorCode, event.target);
        reject(event.target);
      };
      
      function onSuccess(event: Event&{ target: IObject }) {
        runSetup(event.target.result);
        resolve(event.target.result);
      }
    })
    .then(async db => {
      await this._createWritableTransaction(db);
      
      return db;
    });
  }
}
