import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FbStorageService {


  constructor(private store: AngularFirestore) {
  }

  addTransaction(object) {
    this.store.collection('transactions').add(object);
  }
}
