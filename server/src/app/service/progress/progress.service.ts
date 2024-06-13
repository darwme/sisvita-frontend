import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private completedParts: Set<string> = new Set();

  markPartAsCompleted(part: string) {
    this.completedParts.add(part);
  }

  isPartCompleted(part: string) {
    return this.completedParts.has(part);
  }

  constructor() {}
}
