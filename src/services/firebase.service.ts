import { Injectable } from '@angular/core';
import { Firestore, collectionData, getDoc, doc, setDoc, docData, DocumentReference, DocumentData, query, getDocs, arrayUnion, Timestamp } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getCountFromServer, QueryConstraint, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { DocMetaStatus } from '../core/enums';


export type DocMeta = {
  id: string;
  path: string;
  cancelTrigger: boolean;
  status: DocMetaStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type DocLike = {
  _meta: DocMeta;
}


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  arrayUnion(elements: any[]) {
    return arrayUnion(...elements);
  }

  getDocRef(documentPath: string): DocumentReference<DocumentData> {
    return doc(this.firestore, documentPath)

  }

  async getDocData(documentPath: string): Promise<DocumentData | undefined> {
    const docRef = doc(this.firestore, documentPath)
    const snap = await getDoc(docRef);
    return snap.data()

  }


  async getCol(collectionPath: string): Promise<DocumentData[] | []> {
    const colRef = collection(this.firestore, collectionPath)
    const queryDocData = query(colRef);
    const querySnapshot = await getDocs(queryDocData);
    return querySnapshot.docs.map(doc => doc.data());

  }

  doc$(documentPath: string): Observable<DocumentData | undefined> {
    const docRef = doc(this.firestore, documentPath)
    return docData(docRef);
  }

  col$(collectionPath: string): Observable<DocumentData[]> {
    const colRef = collection(this.firestore, collectionPath)
    return collectionData(colRef);
  }

  colOnQuery$(collectionPath: string, queryConstraints: QueryConstraint[]): Observable<DocumentData[]> {
    const colRef = collection(this.firestore, collectionPath)
    const queryDocData = query(colRef, ...queryConstraints);
    return collectionData(queryDocData);
  }

  async count(collectionPath: string,): Promise<number> {
    const colRef = collection(this.firestore, collectionPath);
    const snapshot = await getCountFromServer(colRef);
    return snapshot.data().count;
  }

  async add(collectionPath: string, data: any): Promise<DocumentReference> {
    const docRef = doc(collection(this.firestore, collectionPath));
    const _meta = this.getDocMeta(docRef.path);
    await setDoc(docRef, {
      _meta,
      ...data,
    });
    return docRef;
  }

  async set(documentPath: string, data: any): Promise<DocumentReference> {
    const docRef = doc(this.firestore, documentPath)
    const _meta = this.getDocMeta(docRef.path);
    await setDoc(docRef, {
      _meta,
      ...data,
    });
    return docRef;
  }

  async update(documentPath: string, data: any): Promise<DocumentReference> {
    const docRef = doc(this.firestore, documentPath)
    await updateDoc(docRef, {
      ...data,
      '_meta.updatedAt': Timestamp.now(),
    });
    return docRef;
  }

  async delete(documentPath: string): Promise<DocumentReference> {
    const docRef = doc(this.firestore, documentPath)
    await deleteDoc(docRef);
    return docRef;
  }


  getDocMeta(documentPath: string) {
    const timestamp = Timestamp.now();
    let docRef: DocumentReference | null = doc(this.firestore, documentPath);
    const meta: any = {
      id: docRef.id,
      path: docRef.path,
      cancelTrigger: false,
      status: DocMetaStatus.Live,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    let count = 1;
    while (docRef && docRef.parent !== null) {
      if (docRef.parent.parent) {
        meta[`parent${count}`] = docRef.parent.parent.id;
        count++;
        docRef = docRef.parent.parent;
      } else {
        docRef = null;
      }
    }
    return meta;
  }

  collection(path: string) {
    return collection(this.firestore, path);
  }
}
