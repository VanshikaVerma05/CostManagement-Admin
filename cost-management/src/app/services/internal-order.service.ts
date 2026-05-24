import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { SelectGroup } from '../features/hierarchy-select/hierarchy-select.component';

/**
 * Simulates the live SAP Internal Order lookup.
 *
 * In production this calls the SAP API in real time as the user types and
 * returns Internal Order Groups, each containing its Internal Orders. For now
 * the catalogue is hardcoded here; swap `of(...).pipe(delay())` for an
 * `HttpClient.get(...)` call and the rest of the UI keeps working unchanged.
 *
 * Only the Internal Order *code* (e.g. `IO1`) is ever stored against the line —
 * the label is display-only.
 */
@Injectable({ providedIn: 'root' })
export class InternalOrderService {
  /** Hardcoded stand-in for the SAP Internal Order catalogue. */
  private readonly catalogue: SelectGroup[] = [
    {
      group: 'Digital Transformation Programme',
      items: [
        { value: 'IO1', label: 'IO1 – CRM Migration' },
        { value: 'IO2', label: 'IO2 – Cloud Platform Build' },
        { value: 'IO3', label: 'IO3 – Data Lake Foundation' }
      ]
    },
    {
      group: 'Infrastructure Renewal',
      items: [
        { value: 'IO4', label: 'IO4 – Network Refresh' },
        { value: 'IO5', label: 'IO5 – Datacentre Relocation' },
        { value: 'IO6', label: 'IO6 – End-User Device Rollout' }
      ]
    },
    {
      group: 'Finance Systems',
      items: [
        { value: 'IO7', label: 'IO7 – SAP S/4HANA Rollout' },
        { value: 'IO8', label: 'IO8 – Reporting Automation' },
        { value: 'IO9', label: 'IO9 – Treasury Integration' }
      ]
    }
  ];

  /**
   * Real-time lookup. Returns the Internal Order Groups (with their orders)
   * matching `query`, filtered on both the group name and the order code/label.
   * A short delay mimics the SAP network round-trip.
   */
  search(query: string): Observable<SelectGroup[]> {
    const q = query.trim().toLowerCase();

    return of(this.catalogue).pipe(
      delay(350),
      map(groups => {
        if (!q) return groups;
        return groups
          .map(g => {
            // If the group name matches, keep all its orders; otherwise filter.
            if (g.group.toLowerCase().includes(q)) return g;
            return {
              ...g,
              items: g.items.filter(
                i => i.label.toLowerCase().includes(q) || i.value.toLowerCase().includes(q)
              )
            };
          })
          .filter(g => g.items.length > 0);
      })
    );
  }
}
