import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductSelectionService {
  private selectedCountSubject = new BehaviorSubject<number>(this.getLocalCount());
  selectedCount$ = this.selectedCountSubject.asObservable();

  updateCount() {
    const count = this.getLocalCount();
    this.selectedCountSubject.next(count);
  }

  private getLocalCount(): number {
    const items = JSON.parse(localStorage.getItem('SelectedProducts') || '[]');
    return items.length ? items.length : 0;
  }
}
