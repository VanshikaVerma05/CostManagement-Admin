import { Component, HostListener } from '@angular/core';
import {
  MONTHS, SITES, TEAMS, TYPES, CATEGORIES, SUPPLIERS, CURRENCIES, ACCOUNTS, SCENARIOS,
  DEFAULT_FILTERS, DEFAULT_TOGGLES,
  ForecastRow, ForecastFilters, ForecastToggles, SubRow, SubRowType,
  MOCK_FORECAST_ROWS, buildDefaultSubRows, API_ENDPOINTS
} from '../../constants/forecast.constants';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {

  isMobileView = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobileView = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  }

  // ── Reference data (from constants; swap for HTTP calls when API is ready) ──
  readonly months       = MONTHS;
  readonly sites        = SITES;
  readonly teams        = TEAMS;
  readonly types        = TYPES;
  readonly categories   = CATEGORIES;
  readonly suppliers    = SUPPLIERS;
  readonly currencies   = CURRENCIES;
  readonly accounts     = ACCOUNTS;
  readonly scenarios    = SCENARIOS;
  readonly apiEndpoints = API_ENDPOINTS; // kept for future wiring

  // ── State ──────────────────────────────────────────────────────────────────
  currentYear = 2026;
  filters: ForecastFilters = { ...DEFAULT_FILTERS };
  toggles: ForecastToggles = { ...DEFAULT_TOGGLES };

  // TODO: Replace with:
  //   this.http.get<ForecastRow[]>(API_ENDPOINTS.forecast.getAll())
  //     .subscribe(rows => this.forecastRows = rows);
  forecastRows: ForecastRow[] = JSON.parse(JSON.stringify(MOCK_FORECAST_ROWS));

  get filteredForecastRows(): ForecastRow[] {
    return this.forecastRows.filter(row => {
      if (this.filters.site     && row.site     && row.site     !== this.filters.site)     return false;
      if (this.filters.team     && row.team     && row.team     !== this.filters.team)     return false;
      if (this.filters.account  && row.account  && row.account  !== this.filters.account)  return false;
      if (this.filters.type     && row.type     && row.type     !== this.filters.type)     return false;
      if (this.filters.category && row.category && row.category !== this.filters.category) return false;
      if (this.filters.supplier && row.supplier && row.supplier !== this.filters.supplier) return false;
      if (this.filters.currency && row.currency && row.currency !== this.filters.currency) return false;
      return true;
    });
  }

  // ── Visible sub-row types ──────────────────────────────────────────────────

  /** Types for the top block: TOTAL [Account] */
  get totalBlockTypes(): SubRowType[] {
    const t: SubRowType[] = ['local'];
    if (this.toggles.showSourceCurrency) t.push('contract');
    if (this.toggles.showActual)         t.push('actual');
    if (this.toggles.showOtherScenario)  t.push('other-scenario');
    return t;
  }

  /** Types for the bottom block: TOTAL RECHARGE [Account] */
  get rechargeBlockTypes(): SubRowType[] {
    const t: SubRowType[] = ['recharge'];
    if (this.toggles.showActual)         t.push('recharge-actual');
    if (this.toggles.showOtherScenario)  t.push('recharge-other-scenario');
    return t;
  }

  /** All visible types in body rows */
  get visibleTypes(): SubRowType[] {
    return [...this.totalBlockTypes, ...this.rechargeBlockTypes];
  }

  visibleSubRows(row: ForecastRow): SubRow[] {
    return row.subRows.filter(s => {
      if (s.type === 'contract') {
        return row.differentCurrency && this.toggles.showSourceCurrency;
      }
      if (s.type === 'local') {
        return true;
      }
      if (s.type === 'recharge') {
        return row.rechargeRequired;
      }
      if (s.type === 'actual') {
        return this.toggles.showActual;
      }
      if (s.type === 'other-scenario') {
        return this.toggles.showOtherScenario;
      }
      return false; // recharge-actual and recharge-other-scenario are body-invisible, only for totals
    });
  }

  // ── Totals ─────────────────────────────────────────────────────────────────
  getSubTotal(values: (number | null)[]): number {
    return values.reduce((s: number, v) => s + (v ?? 0), 0);
  }

  getTypeColTotal(type: SubRowType, mi: number): number {
    return this.filteredForecastRows.reduce((t, row) => {
      // For recharge, only sum if row has rechargeRequired
      if (type === 'recharge' && !row.rechargeRequired) return t;
      // For contract, only sum if row has differentCurrency
      if (type === 'contract' && !row.differentCurrency) return t;

      const sub = row.subRows.find(s => s.type === type);
      return t + (sub ? (sub.values[mi] ?? 0) : 0);
    }, 0);
  }

  getTypeTotal(type: SubRowType): number {
    return this.months.reduce((t, _, i) => t + this.getTypeColTotal(type, i), 0);
  }

  getTypeLabel(type: SubRowType): string {
    switch (type) {
      case 'local':                   return 'Forecast';
      case 'contract':                return 'Contract Currency';
      case 'actual':                  return 'Actual';
      case 'other-scenario':          return 'Other Scenario';
      case 'recharge':                return 'Forecast';
      case 'recharge-actual':         return 'Actual';
      case 'recharge-other-scenario': return 'Other Scenario';
      default:                        return '';
    }
  }

  // ── Year navigation ────────────────────────────────────────────────────────
  prevYear(): void { this.currentYear--; }
  nextYear(): void { this.currentYear++; }

  // ── Row management ─────────────────────────────────────────────────────────
  addRow(): void {
    // TODO: After save, call API_ENDPOINTS.forecast.create() to persist the new row.
    this.forecastRows.push({
      id:               Date.now(),
      internalOrder:    '',
      team:             '',
      type:             'OPEX',
      category:         '',
      supplier:         '',
      description:      '',
      currency:         'GBP',
      contractCurrency: 'USD',
      differentCurrency: false,
      rechargeRequired:  false,
      subRows:          buildDefaultSubRows('GBP', 'USD')
    });
  }

  removeRow(id: number): void {
    // TODO: Also call API_ENDPOINTS.forecast.delete(id) when API is ready.
    this.forecastRows = this.forecastRows.filter(r => r.id !== id);
  }

  // ── Monthly comments (per row, per year) ───────────────────────────────────
  private readonly COMMENTS_KEY = 'forecast-row-comments';

  commentModalOpen = false;
  commentRow: ForecastRow | null = null;
  /** Working copy of the 12 month comments while the modal is open. */
  commentDraft: string[] = [];

  /** Shape in localStorage: { [rowId]: { [year]: string[12] } } */
  private loadCommentStore(): Record<string, Record<string, string[]>> {
    try {
      const raw = localStorage.getItem(this.COMMENTS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private writeCommentStore(store: Record<string, Record<string, string[]>>): void {
    localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(store));
  }

  get commentModalTitle(): string {
    const label = this.commentRow?.internalOrder || 'Row';
    return `Monthly Comments — ${label} (${this.currentYear})`;
  }

  /** Number of months with a saved comment for this row in the current year (badge). */
  commentCount(row: ForecastRow): number {
    const saved = this.loadCommentStore()[row.id]?.[this.currentYear] ?? [];
    return saved.filter(c => !!c && c.trim().length > 0).length;
  }

  openComments(row: ForecastRow): void {
    this.commentRow = row;
    const saved = this.loadCommentStore()[row.id]?.[this.currentYear] ?? [];
    // Always 12 slots, pre-filled with whatever was saved for this row+year.
    this.commentDraft = this.months.map((_, i) => saved[i] ?? '');
    this.commentModalOpen = true;
  }

  saveComments(): void {
    if (!this.commentRow) return;
    const store = this.loadCommentStore();
    const rowKey = String(this.commentRow.id);
    if (!store[rowKey]) store[rowKey] = {};
    store[rowKey][this.currentYear] = [...this.commentDraft];
    this.writeCommentStore(store);
    this.closeComments();
  }

  closeComments(): void {
    this.commentModalOpen = false;
    this.commentRow = null;
    this.commentDraft = [];
  }

  // ── Save / Cancel ──────────────────────────────────────────────────────────
  saveChanges(): void {
    // TODO: Replace with:
    //   this.http.post(API_ENDPOINTS.forecast.bulkSave(), this.forecastRows)
    //     .subscribe(() => { /* success toast */ });
    console.log('[ForecastComponent] Saving rows:', this.forecastRows);
  }

  cancelChanges(): void {
    // TODO: Replace with a fresh GET from API_ENDPOINTS.forecast.getAll()
    this.forecastRows = JSON.parse(JSON.stringify(MOCK_FORECAST_ROWS));
    this.filters      = { ...DEFAULT_FILTERS };
    this.toggles      = { ...DEFAULT_TOGGLES };
  }

  // ── Format helpers ─────────────────────────────────────────────────────────
  fmt(v: number | null | undefined): string {
    if (v === null || v === undefined || v === 0) return '';
    return Number.isInteger(v) ? v.toLocaleString() : v.toFixed(2);
  }

  fmtTotal(v: number): string {
    if (!v) return '—';
    return Number.isInteger(v) ? v.toLocaleString() : v.toFixed(2);
  }

  // ── TrackBy helpers to prevent focus loss & DOM recreation ─────────────────
  trackByRow(index: number, row: ForecastRow): number {
    return row.id;
  }

  trackBySubRow(index: number, sub: SubRow): string {
    return sub.type;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
