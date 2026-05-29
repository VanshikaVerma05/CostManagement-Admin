import { Component } from '@angular/core';

interface AdminItem {
  id: number;
  name: string;
  code: string;
}

interface AdminSection {
  key: string;
  title: string;
  hasCode: boolean;
  codeLabel: string;
  items: AdminItem[];
}

@Component({
  selector: 'app-generaladminsection',
  templateUrl: './generaladminsection.component.html',
  styleUrls: ['./generaladminsection.component.scss']
})
export class GeneraladminsectionComponent {

  sections: AdminSection[] = [
    { key: 'supplier',   title: 'Supplier Values',    hasCode: true,  codeLabel: 'Code',     items: [] },
    { key: 'site',       title: 'Site',               hasCode: true,  codeLabel: 'Location', items: [] },
    { key: 'team',       title: 'Team',               hasCode: false, codeLabel: '',         items: [] },
    { key: 'category',   title: 'Category',           hasCode: false, codeLabel: '',         items: [] },
    { key: 'currency',   title: 'Currency',           hasCode: true,  codeLabel: 'Code',     items: [] },
    { key: 'account',    title: 'Account',            hasCode: true,  codeLabel: 'Code',     items: [] },
    { key: 'spendType',  title: 'Spend Type / Layer', hasCode: true,  codeLabel: 'Layer',    items: [] },
  ];

  panelOpen = false;
  panelMode: 'add' | 'edit' = 'add';
  activeSection: AdminSection | null = null;
  editItem: AdminItem = { id: 0, name: '', code: '' };
  nameError = false;

  private nextId = 1;

  openAdd(section: AdminSection): void {
    this.activeSection = section;
    this.panelMode = 'add';
    this.editItem = { id: 0, name: '', code: '' };
    this.nameError = false;
    this.panelOpen = true;
  }

  openEdit(section: AdminSection, item: AdminItem): void {
    this.activeSection = section;
    this.panelMode = 'edit';
    this.editItem = { ...item };
    this.nameError = false;
    this.panelOpen = true;
  }

  saveItem(): void {
    if (!this.editItem.name.trim()) {
      this.nameError = true;
      return;
    }
    if (!this.activeSection) return;

    if (this.panelMode === 'add') {
      this.activeSection.items.push({ ...this.editItem, id: this.nextId++ });
    } else {
      const idx = this.activeSection.items.findIndex(i => i.id === this.editItem.id);
      if (idx > -1) this.activeSection.items[idx] = { ...this.editItem };
    }
    this.closePanel();
  }

  deleteItem(section: AdminSection, item: AdminItem, event: Event): void {
    event.stopPropagation();
    section.items = section.items.filter(i => i.id !== item.id);
    if (this.activeSection?.key === section.key && this.editItem.id === item.id) {
      this.closePanel();
    }
  }

  closePanel(): void {
    this.panelOpen = false;
    this.activeSection = null;
    this.editItem = { id: 0, name: '', code: '' };
    this.nameError = false;
  }

  isActiveRow(section: AdminSection, item: AdminItem): boolean {
    return this.panelOpen
      && this.activeSection?.key === section.key
      && this.editItem.id === item.id;
  }
}
