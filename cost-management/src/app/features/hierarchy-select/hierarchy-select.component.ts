import { Component, forwardRef, Input, HostListener, ElementRef, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectGroup {
  group: string;
  items: SelectOption[];
}

@Component({
  selector: 'app-hierarchy-select',
  templateUrl: './hierarchy-select.component.html',
  styleUrls: ['./hierarchy-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HierarchySelectComponent),
      multi: true
    }
  ]
})
export class HierarchySelectComponent implements ControlValueAccessor {
  @Input() groups: SelectGroup[] = [];
  @Input() placeholder = 'Search…';

  searchText = '';
  isOpen = false;
  private selectedLabel = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef) {}

  get filteredGroups(): SelectGroup[] {
    const q = this.searchText.trim().toLowerCase();
    if (!q) return this.groups;
    return this.groups
      .map(g => ({ ...g, items: g.items.filter(i => i.label.toLowerCase().includes(q)) }))
      .filter(g => g.items.length > 0);
  }

  get hasNoResults(): boolean {
    return this.isOpen && this.filteredGroups.length === 0;
  }

  onFocus(): void {
    this.searchText = '';
    this.isOpen = true;
    this.onTouched();
  }

  onInput(): void {
    this.isOpen = true;
  }

  select(item: SelectOption): void {
    this.selectedLabel = item.label;
    this.searchText = item.label;
    this.onChange(item.label);
    this.isOpen = false;
  }

  isSelected(item: SelectOption): boolean {
    return item.label === this.selectedLabel;
  }

  writeValue(value: string): void {
    this.selectedLabel = value || '';
    this.searchText = value || '';
  }

  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target as Node)) {
      this.searchText = this.selectedLabel;
      this.isOpen = false;
    }
  }
}
