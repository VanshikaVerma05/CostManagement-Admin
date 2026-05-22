import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SelectGroup } from '../../features/hierarchy-select/hierarchy-select.component';

interface FieldChange { field: string; from: string; to: string; }
interface ChangeRecord { timestamp: Date; user: string; changes: FieldChange[]; }

@Component({
  selector: 'app-invoice-upload',
  templateUrl: './invoice-upload.component.html',
  styleUrls: ['./invoice-upload.component.scss']
})
export class InvoiceUploadComponent implements OnDestroy {
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  selectedSite = '';

  selectedCurrency = '';

  currencyGroups: SelectGroup[] = [
    {
      group: 'Primary',
      items: [
        { value: 'GBP', label: 'GBP – British Pound' },
        { value: 'USD', label: 'USD – US Dollar' }
      ]
    },
    {
      group: 'Common',
      items: [
        { value: 'EUR', label: 'EUR – Euro' },
        { value: 'AUD', label: 'AUD – Australian Dollar' },
        { value: 'CAD', label: 'CAD – Canadian Dollar' },
        { value: 'CHF', label: 'CHF – Swiss Franc' },
        { value: 'JPY', label: 'JPY – Japanese Yen' },
        { value: 'SEK', label: 'SEK – Swedish Krona' },
        { value: 'NOK', label: 'NOK – Norwegian Krone' },
        { value: 'DKK', label: 'DKK – Danish Krone' }
      ]
    }
  ];

  selectedTeam = '';

  teamGroups: SelectGroup[] = [
    {
      group: 'EISS',
      items: [
        { value: 'infrastructure', label: 'Infrastructure' },
        { value: 'applications', label: 'Applications' },
        { value: 'governance-vendor', label: 'Governance & Vendor' },
        { value: 'model-processes', label: 'Model & Processes' }
      ]
    }
  ];

  siteGroups: SelectGroup[] = [
    {
      group: 'Europe',
      items: [
        { value: 'uk', label: 'UK' },
        { value: 'netherlands', label: 'the Netherlands' },
        { value: 'france', label: 'France' }
      ]
    },
    {
      group: 'Americas',
      items: [
        { value: 'usa', label: 'USA' }
      ]
    }
  ];

  invoiceDate: string = (() => {
    const prev = new Date();
    prev.setDate(1);
    prev.setMonth(prev.getMonth() - 1);
    const y = prev.getFullYear();
    const m = String(prev.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}-01`;
  })();

  accountingDate: string = (() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  })();

  isDragging = false;
  uploadedFileName: string | null = null;
  uploadedFileUrl: SafeResourceUrl | null = null;
  private objectUrl: string | null = null;

  isPreviewCollapsed = false;
  isPdfPreviewCollapsed = false;
  isHistoryOpen = false;

  changeHistory: ChangeRecord[] = [
    {
      timestamp: new Date('2026-05-22T14:32:00'),
      user: 'ankita.singh',
      changes: [
        { field: 'Inv Amount', from: '£5,000.00', to: '£6,200.00' },
        { field: 'Accounting Date', from: '01/04/2026', to: '01/05/2026' }
      ]
    },
    {
      timestamp: new Date('2026-05-20T09:15:00'),
      user: 'john.doe',
      changes: [
        { field: 'Supplier', from: 'AWS', to: 'Microsoft' }
      ]
    },
    {
      timestamp: new Date('2026-05-18T11:04:00'),
      user: 'ankita.singh',
      changes: [
        { field: 'Currency', from: 'USD', to: 'GBP' },
        { field: 'Team', from: 'Applications', to: 'Infrastructure' },
        { field: 'PAR', from: 'PAR-001', to: 'PAR-045' }
      ]
    }
  ];

  get sortedHistory(): ChangeRecord[] {
    return [...this.changeHistory].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  lineItems = [
    {
      account: '', periodStart: '', periodEnd: '', internalOrder: '', spendType: '', speedType: '',
      category: '', system: '', level: '', lineData: '', description: '', amountCurrency: null,
      rechargeTo: '', rechargePercent: null, amountSiteCurrency: null
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  addNewLineItem(): void {
    this.lineItems.push({
      account: '', periodStart: '', periodEnd: '', internalOrder: '', spendType: '', speedType: '',
      category: '', system: '', level: '', lineData: '', description: '', amountCurrency: null,
      rechargeTo: '', rechargePercent: null, amountSiteCurrency: null
    });
  }

  removeLineItem(index: number): void {
    if (this.lineItems.length > 1) {
      this.lineItems.splice(index, 1);
    }
  }


  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(): void {
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  private handleFile(file: File): void {
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      this.revokeUrl();
      this.uploadedFileName = file.name;
      this.objectUrl = URL.createObjectURL(file);
      this.uploadedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.objectUrl);
    } else {
      alert('Only PDF files are accepted.');
    }
  }

  removeFile(): void {
    this.uploadedFileName = null;
    this.uploadedFileUrl = null;
    this.revokeUrl();
  }

  private revokeUrl(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }

  toggleSidebar(): void {
    this.isPreviewCollapsed = !this.isPreviewCollapsed;
  }

  togglePdfPreview(): void {
    this.isPdfPreviewCollapsed = !this.isPdfPreviewCollapsed;
  }

  ngOnDestroy(): void {
    this.revokeUrl();
  }
}

