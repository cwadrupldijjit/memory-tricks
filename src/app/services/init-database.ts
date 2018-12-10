import * as CollectionNames from '../constants/collection-names';

function runSetup(db: IDBDatabase) {
    const currentCollectionNames = Array.from(db.objectStoreNames);
    const collectionNames = Object.values(CollectionNames) as string[];
    const newCollections = collectionNames.filter(n => !currentCollectionNames.includes(n));
    const oldCollections = currentCollectionNames.filter(n => !collectionNames.includes(n));
    // const versionChangeTransaction = db.transaction([ ...currentCollectionNames, ...newCollections ], 'versionchange');
    
    // const transaction = db.transaction(currentCollectionNames, 'versionchange');
    
    if (newCollections.length) {
        newCollections.forEach(n => createCollection(db, n));
    }
    
    if (oldCollections.length) {
        oldCollections.forEach(n => db.deleteObjectStore(n));
    }
}

function createCollection(
    db: IDBDatabase,
    collectionName: string,
    collectionOptions = { keyPath: 'id', autoIncrement: true } as IDBObjectStoreParameters,
    indexCreator = createIndex,
) {
    const collection = db.createObjectStore(collectionName, collectionOptions);
    
    if (typeof indexCreator != 'function') return;
    
    indexCreator(collection);
    
    return collection;
}

function createIndex(collection: IDBObjectStore, options = { unique: true } as IDBIndexParameters) {
    collection.createIndex(`${collection.name}_index`, collection.keyPath, options);
    
    return collection;
}

export {
    runSetup,
};
