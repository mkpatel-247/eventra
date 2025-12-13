import { Component, Input, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";

export interface TableColumn {
    key: string;
    label: string;
    type?: 'text' | 'date' | 'badge' | 'image' | 'custom';
    sortable?: boolean;
    width?: string;
    template?: TemplateRef<any>;
}

export interface TableAction {
    label: string;
    icon?: string;
    cssClass?: string;
    callback: (row: any) => void;
    visible?: (row: any) => boolean; // Show action conditionally
}

@Component({
    selector: "app-custom-table",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./custom-table.component.html",
    styleUrls: ["./custom-table.component.scss"],
})
export class CustomTableComponent {
    @Input() columns: TableColumn[] = [];
    @Input() data: any[] = [];
    @Input() loading: boolean = false;
    @Input() emptyMessage: string = "No data available";
    @Input() actions: TableAction[] = [];

    /**
     * Get nested property value from object using dot notation
     * e.g., "event.title" from { event: { title: "Event Name" } }
     */
    getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    /**
     * Check if action should be visible for this row
     */
    isActionVisible(action: TableAction, row: any): boolean {
        return action.visible ? action.visible(row) : true;
    }

    /**
     * Get badge class based on status
     */
    getBadgeClass(value: string): string {
        const statusMap: { [key: string]: string } = {
            'CONFIRMED': 'bg-success',
            'PENDING': 'bg-warning',
            'CANCELLED': 'bg-danger',
            'COMPLETED': 'bg-info',
            'CHECKED_IN': 'bg-primary',
        };
        return statusMap[value] || 'bg-secondary';
    }
}
