import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BOOKING_API_URL } from "../constant/api.constant";

@Injectable({
    providedIn: "root",
})
export class BookingService {
    constructor(private http: HttpClient) { }

    /**
     * Book an event
     * @param bookingData - { eventId, ticketType, guestCount, guestDetails, specialRequests }
     */
    bookEvent(bookingData: any) {
        return this.http.post(BOOKING_API_URL.BOOK, bookingData);
    }

    /**
     * Get all bookings for the current user
     */
    getMyBookings() {
        return this.http.get(BOOKING_API_URL.GET_MY_BOOKINGS);
    }

    /**
     * Cancel a booking
     * @param bookingId
     */
    cancelBooking(bookingId: string) {
        return this.http.post(
            BOOKING_API_URL.CANCEL_BOOKING + bookingId + "/cancel",
            {}
        );
    }
}
