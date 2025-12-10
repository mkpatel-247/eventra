import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BookingService } from "src/app/shared/services/booking.service";

@Component({
    selector: "app-my-bookings",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./my-bookings.component.html",
    styleUrls: ["./my-bookings.component.scss"],
})
export class MyBookingsComponent implements OnInit {
    bookingService = inject(BookingService);
    bookings: any[] = [];
    isLoading = true;

    ngOnInit() {
        this.fetchBookings();
    }

    fetchBookings() {
        this.isLoading = true;
        this.bookingService.getMyBookings().subscribe({
            next: (res: any) => {
                this.bookings = res.data;
                this.isLoading = false;
            },
            error: () => {
                this.isLoading = false;
            },
        });
    }

    cancelBooking(id: string) {
        if (confirm("Are you sure you want to cancel this booking?")) {
            this.bookingService.cancelBooking(id).subscribe({
                next: () => {
                    alert("Booking cancelled");
                    this.fetchBookings(); // Refresh list
                },
                error: (err) => {
                    alert("Error: " + err.error?.message);
                },
            });
        }
    }
}
