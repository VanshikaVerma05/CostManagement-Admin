import { Component } from '@angular/core';
import { SnackbarService } from '../../features/snackbar/snackbar.service';

interface Module {
  name: string;
  expanded: boolean;
  write: boolean;
  read: boolean;
  children: Module[];
}

interface Role {
  name: string;
  modules: Module[];
}

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent {

  roles: Role[] = [
    {
      name: 'Accounting Department',
      modules: [
        {
          name: 'Forecast', expanded: false, write: true, read: true,
          children: [
            { name: 'Enter Budget values',                       expanded: false, write: true,  read: true,  children: [] },
            { name: 'Edit RFC forecast values',                  expanded: false, write: true,  read: true,  children: [] },
            { name: 'Add new unbudgeted lines',                  expanded: false, write: true,  read: true,  children: [] },
            { name: 'Add comments / justification',              expanded: false, write: true,  read: true,  children: [] },
            { name: 'View forecast grid (read-only)',            expanded: false, write: false, read: true,  children: [] },
            { name: 'Set recharge instructions on forecast lines', expanded: false, write: false, read: false, children: [] },
          ]
        },
        {
          name: 'Invoice Handling', expanded: false, write: true, read: true,
          children: [
            { name: 'Upload invoice PDF',                  expanded: false, write: true,  read: true,  children: [] },
            { name: 'Fill in General section fields',      expanded: false, write: true,  read: true,  children: [] },
            { name: 'Fill in Itemisation & Accounting',    expanded: false, write: true,  read: true,  children: [] },
            { name: 'Edit a saved invoice',                expanded: false, write: true,  read: true,  children: [] },
            { name: 'View an existing invoice',            expanded: false, write: false, read: true,  children: [] },
            { name: 'Set Recharge % or Direct Recharge',   expanded: false, write: true,  read: true,  children: [] },
            { name: 'Toggle Credit / Budget flags',        expanded: false, write: true,  read: true,  children: [] },
            { name: 'Mark invoice as Paid / Unpaid',       expanded: false, write: true,  read: true,  children: [] },
            { name: 'Flag invoice as Accrual Pending',     expanded: false, write: true,  read: true,  children: [] },
            { name: 'Click Process Invoice (send email)',  expanded: false, write: true,  read: true,  children: [] },
            { name: 'View Invoice Change History',         expanded: false, write: false, read: true,  children: [] },
            { name: 'Hover to view invoice PDF',           expanded: false, write: false, read: true,  children: [] },
          ]
        },
      ]
    },
    {
      name: 'Dept Head / Budget Owner',
      modules: [
        {
          name: 'Forecast', expanded: false, write: true, read: true,
          children: [
            { name: 'Enter Budget values',                       expanded: false, write: true,  read: true,  children: [] },
            { name: 'Edit RFC forecast values',                  expanded: false, write: true,  read: true,  children: [] },
            { name: 'Add new unbudgeted lines',                  expanded: false, write: true,  read: true,  children: [] },
            { name: 'Add comments / justification',              expanded: false, write: true,  read: true,  children: [] },
            { name: 'View forecast grid (read-only)',            expanded: false, write: false, read: true,  children: [] },
            { name: 'Set recharge instructions on forecast lines', expanded: false, write: false, read: false, children: [] },
          ]
        },
        {
          name: 'Invoice Handling', expanded: false, write: false, read: true,
          children: [
            { name: 'Upload invoice PDF',                  expanded: false, write: true,  read: true,  children: [] },
            { name: 'Fill in General section fields',      expanded: false, write: true,  read: true,  children: [] },
            { name: 'Fill in Itemisation & Accounting',    expanded: false, write: true,  read: true,  children: [] },
            { name: 'Edit a saved invoice',                expanded: false, write: true,  read: true,  children: [] },
            { name: 'View an existing invoice',            expanded: false, write: false, read: true,  children: [] },
            { name: 'Set Recharge % or Direct Recharge',   expanded: false, write: true,  read: true,  children: [] },
            { name: 'Toggle Credit / Budget flags',        expanded: false, write: true,  read: true,  children: [] },
            { name: 'Mark invoice as Paid / Unpaid',       expanded: false, write: true,  read: true,  children: [] },
            { name: 'Flag invoice as Accrual Pending',     expanded: false, write: true,  read: true,  children: [] },
            { name: 'Click Process Invoice (send email)',  expanded: false, write: true,  read: true,  children: [] },
            { name: 'View Invoice Change History',         expanded: false, write: false, read: true,  children: [] },
            { name: 'Hover to view invoice PDF',           expanded: false, write: false, read: true,  children: [] },
          ]
        },
      ]
    },
    {
      name: 'Team Member',
      modules: [
        {
          name: 'Forecast', expanded: false, write: false, read: true,
          children: [
            { name: 'Enter Budget values',                       expanded: false, write: false, read: false, children: [] },
            { name: 'Edit RFC forecast values',                  expanded: false, write: false, read: false, children: [] },
            { name: 'Add new unbudgeted lines',                  expanded: false, write: false, read: false, children: [] },
            { name: 'Add comments / justification',              expanded: false, write: false, read: false, children: [] },
            { name: 'View forecast grid (read-only)',            expanded: false, write: false, read: true,  children: [] },
            { name: 'Set recharge instructions on forecast lines', expanded: false, write: false, read: false, children: [] },
          ]
        },
        {
          name: 'Invoice Handling', expanded: false, write: false, read: false,
          children: [
            { name: 'Upload invoice PDF',                  expanded: false, write: true,  read: true,  children: [] },
            { name: 'Fill in General section fields',      expanded: false, write: true,  read: true,  children: [] },
            { name: 'Fill in Itemisation & Accounting',    expanded: false, write: true,  read: true,  children: [] },
            { name: 'Edit a saved invoice',                expanded: false, write: true,  read: true,  children: [] },
            { name: 'View an existing invoice',            expanded: false, write: false, read: true,  children: [] },
            { name: 'Set Recharge % or Direct Recharge',   expanded: false, write: false, read: false, children: [] },
            { name: 'Toggle Credit / Budget flags',        expanded: false, write: false, read: false, children: [] },
            { name: 'Mark invoice as Paid / Unpaid',       expanded: false, write: false, read: false, children: [] },
            { name: 'Flag invoice as Accrual Pending',     expanded: false, write: true,  read: true,  children: [] },
            { name: 'Click Process Invoice (send email)',  expanded: false, write: true,  read: true,  children: [] },
            { name: 'View Invoice Change History',         expanded: false, write: false, read: true,  children: [] },
            { name: 'Hover to view invoice PDF',           expanded: false, write: false, read: true,  children: [] },
          ]
        },
      ]
    },
    {
      name: 'Admin',
      modules: [
        {
          name: 'Forecast', expanded: false, write: true, read: true,
          children: [
            { name: 'Enter Budget values',                       expanded: false, write: false, read: false, children: [] },
            { name: 'Edit RFC forecast values',                  expanded: false, write: false, read: false, children: [] },
            { name: 'Add new unbudgeted lines',                  expanded: false, write: false, read: false, children: [] },
            { name: 'Add comments / justification',              expanded: false, write: false, read: false, children: [] },
            { name: 'View forecast grid (read-only)',            expanded: false, write: false, read: true,  children: [] },
            { name: 'Set recharge instructions on forecast lines', expanded: false, write: false, read: false, children: [] },
          ]
        },
        {
          name: 'Invoice Handling', expanded: false, write: true, read: true,
          children: [
            { name: 'Upload invoice PDF',                  expanded: false, write: false, read: false, children: [] },
            { name: 'Fill in General section fields',      expanded: false, write: false, read: false, children: [] },
            { name: 'Fill in Itemisation & Accounting',    expanded: false, write: false, read: false, children: [] },
            { name: 'Edit a saved invoice',                expanded: false, write: false, read: false, children: [] },
            { name: 'View an existing invoice',            expanded: false, write: false, read: true,  children: [] },
            { name: 'Set Recharge % or Direct Recharge',   expanded: false, write: false, read: false, children: [] },
            { name: 'Toggle Credit / Budget flags',        expanded: false, write: false, read: false, children: [] },
            { name: 'Mark invoice as Paid / Unpaid',       expanded: false, write: false, read: false, children: [] },
            { name: 'Flag invoice as Accrual Pending',     expanded: false, write: false, read: false, children: [] },
            { name: 'Click Process Invoice (send email)',  expanded: false, write: false, read: false, children: [] },
            { name: 'View Invoice Change History',         expanded: false, write: false, read: true,  children: [] },
            { name: 'Hover to view invoice PDF',           expanded: false, write: false, read: true,  children: [] },
          ]
        },
      ]
    },
  ];

  readonly defaultModules: Module[] = [
    {
      name: 'Forecast', expanded: false, write: false, read: false,
      children: [
        { name: 'Enter Budget values',                         expanded: false, write: false, read: false, children: [] },
        { name: 'Edit RFC forecast values',                    expanded: false, write: false, read: false, children: [] },
        { name: 'Add new unbudgeted lines',                    expanded: false, write: false, read: false, children: [] },
        { name: 'Add comments / justification',                expanded: false, write: false, read: false, children: [] },
        { name: 'View forecast grid (read-only)',              expanded: false, write: false, read: false, children: [] },
        { name: 'Set recharge instructions on forecast lines', expanded: false, write: false, read: false, children: [] },
      ]
    },
    {
      name: 'Invoice Handling', expanded: false, write: false, read: false,
      children: [
        { name: 'Upload invoice PDF',                  expanded: false, write: false, read: false, children: [] },
        { name: 'Fill in General section fields',      expanded: false, write: false, read: false, children: [] },
        { name: 'Fill in Itemisation & Accounting',    expanded: false, write: false, read: false, children: [] },
        { name: 'Edit a saved invoice',                expanded: false, write: false, read: false, children: [] },
        { name: 'View an existing invoice',            expanded: false, write: false, read: false, children: [] },
        { name: 'Set Recharge % or Direct Recharge',   expanded: false, write: false, read: false, children: [] },
        { name: 'Toggle Credit / Budget flags',        expanded: false, write: false, read: false, children: [] },
        { name: 'Mark invoice as Paid / Unpaid',       expanded: false, write: false, read: false, children: [] },
        { name: 'Flag invoice as Accrual Pending',     expanded: false, write: false, read: false, children: [] },
        { name: 'Click Process Invoice (send email)',  expanded: false, write: false, read: false, children: [] },
        { name: 'View Invoice Change History',         expanded: false, write: false, read: false, children: [] },
        { name: 'Hover to view invoice PDF',           expanded: false, write: false, read: false, children: [] },
      ]
    },
  ];

  get displayModules(): Module[] {
    return this.selectedRole ? this.selectedRole.modules : this.defaultModules;
  }

  selectedRole: Role | null = null;
  showDropdown = false;
  showNewRoleInput = false;
  newRoleName = '';

  // Add row
  showAddRow = false;
  newRowName = '';

  constructor(private snackbar: SnackbarService) {}

  selectRole(role: Role): void {
    this.selectedRole = role;
    this.showDropdown = false;
    this.showAddRow = false;
  }

  toggleExpand(mod: Module): void {
    mod.expanded = !mod.expanded;
  }

  toggleWrite(mod: Module): void {
    mod.write = !mod.write;
    if (mod.write) mod.read = true;
  }

  toggleRead(mod: Module): void {
    mod.read = !mod.read;
    if (!mod.read) mod.write = false;
  }

  confirmAddRow(): void {
    if (!this.newRowName.trim() || !this.selectedRole) return;
    this.selectedRole.modules.push({
      name: this.newRowName.trim(),
      expanded: false,
      write: false,
      read: false,
      children: []
    });
    this.newRowName = '';
    this.showAddRow = false;
  }

  cancelAddRow(): void {
    this.newRowName = '';
    this.showAddRow = false;
  }

  addRole(): void {
    if (!this.newRoleName.trim()) return;
    const newRole: Role = {
      name: this.newRoleName.trim(),
      modules: [
        {
          name: 'Forecast', expanded: false, write: false, read: false,
          children: [
            { name: 'Enter Budget values',                         expanded: false, write: false, read: false, children: [] },
            { name: 'Edit RFC forecast values',                    expanded: false, write: false, read: false, children: [] },
            { name: 'Add new unbudgeted lines',                    expanded: false, write: false, read: false, children: [] },
            { name: 'Add comments / justification',                expanded: false, write: false, read: false, children: [] },
            { name: 'View forecast grid (read-only)',              expanded: false, write: false, read: false, children: [] },
            { name: 'Set recharge instructions on forecast lines', expanded: false, write: false, read: false, children: [] },
          ]
        },
        {
          name: 'Invoice Handling', expanded: false, write: false, read: false,
          children: [
            { name: 'Upload invoice PDF',                  expanded: false, write: false, read: false, children: [] },
            { name: 'Fill in General section fields',      expanded: false, write: false, read: false, children: [] },
            { name: 'Fill in Itemisation & Accounting',    expanded: false, write: false, read: false, children: [] },
            { name: 'Edit a saved invoice',                expanded: false, write: false, read: false, children: [] },
            { name: 'View an existing invoice',            expanded: false, write: false, read: false, children: [] },
            { name: 'Set Recharge % or Direct Recharge',   expanded: false, write: false, read: false, children: [] },
            { name: 'Toggle Credit / Budget flags',        expanded: false, write: false, read: false, children: [] },
            { name: 'Mark invoice as Paid / Unpaid',       expanded: false, write: false, read: false, children: [] },
            { name: 'Flag invoice as Accrual Pending',     expanded: false, write: false, read: false, children: [] },
            { name: 'Click Process Invoice (send email)',  expanded: false, write: false, read: false, children: [] },
            { name: 'View Invoice Change History',         expanded: false, write: false, read: false, children: [] },
            { name: 'Hover to view invoice PDF',           expanded: false, write: false, read: false, children: [] },
          ]
        },
      ]
    };
    this.roles.push(newRole);
    this.selectedRole = newRole;
    this.newRoleName = '';
    this.showNewRoleInput = false;
    this.snackbar.show(`Role "${newRole.name}" added.`, 'success');
  }

  update(): void {
    if (!this.selectedRole) return;
    this.snackbar.show(`Permissions updated for "${this.selectedRole.name}".`, 'success');
  }
}
