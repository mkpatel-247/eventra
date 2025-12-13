import { Component, OnInit, inject, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BookingService } from "src/app/shared/services/booking.service";
import {
    CustomTableComponent,
    TableColumn,
    TableAction,
} from "src/app/shared/components/custom-table/custom-table.component";

@Component({
    selector: "app-my-bookings",
    standalone: true,
    imports: [CommonModule, CustomTableComponent],
    templateUrl: "./my-bookings.component.html",
    styleUrls: ["./my-bookings.component.scss"],
})
export class MyBookingsComponent implements OnInit {
    bookingService = inject(BookingService);
    private cdr = inject(ChangeDetectorRef);
    bookings: any[] = [];
    isLoading = true;

    // Table configuration
    columns: TableColumn[] = [
        { key: "event.title", label: "Event", type: "text" },
        { key: "event.eventDate.startDate", label: "Date", type: "date" },
        { key: "status", label: "Status", type: "badge" },
        { key: "guestCount", label: "Guests", type: "text" },
        { key: "bookingId", label: "Booking ID", type: "text" },
    ];

    actions: TableAction[] = [
        {
            label: "Cancel",
            icon: "bi-x-circle",
            cssClass: "btn-outline-danger",
            callback: (row) => this.cancelBooking(row._id),
            visible: (row) => row.status !== "CANCELLED",
        },
    ];

    ngOnInit() {
        this.fetchBookings();
    }

    fetchBookings() {
        this.isLoading = true;
        this.bookingService.getMyBookings().subscribe({
            next: (res: any) => {
                this.bookings = res.data;
                this.isLoading = false;
                this.cdr.markForCheck(); // Trigger UI update
            },
            error: () => {
                this.isLoading = false;
                this.cdr.markForCheck();
            },
        });
    }

    cancelBooking(id: string) {
        if (confirm("Are you sure you want to cancel this booking?")) {
            // Find booking for optimistic update
            const bookingIndex = this.bookings.findIndex((b) => b._id === id);
            if (bookingIndex === -1) return;

            // Store original status for rollback on error
            const originalStatus = this.bookings[bookingIndex].status;

            // Optimistic update: immediately update UI
            this.bookings[bookingIndex].status = "CANCELLED";
            this.cdr.markForCheck();

            this.bookingService.cancelBooking(id).subscribe({
                next: () => {
                    alert("Booking cancelled successfully!");
                    // Refetch to ensure data consistency
                    this.fetchBookings();
                },
                error: (err) => {
                    // Rollback optimistic update on error
                    this.bookings[bookingIndex].status = originalStatus;
                    this.cdr.markForCheck();
                    alert("Error cancelling booking: " + (err.error?.message || "Unknown error"));
                },
            });
        }
    }
}
