import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EVENT_API_URL } from "../constant/api.constant";

@Injectable({
  providedIn: "root",
})
export class EventService {
  constructor(private http: HttpClient) { }

  /**
   * Sends a POST request to add a new event.
   * @param data - The event data to be added.
   * @returns An observable of the HTTP response.
   */
  addEvent(data: any) {
    return this.http.post(EVENT_API_URL.ADD_EVENT, data);
  }

  /**
   * Sends a GET request to retrieve a specific event.
   * @param eventId - The id of the event to be retrieved.
   * @returns An observable of the HTTP response.
   */
  getSpecificEvent(eventId: string) {
    return this.http.get(EVENT_API_URL.GET_SPECIFIC_EVENT + eventId);
  }

  /**
   * Sends a DELETE request to delete an event.
   * @param eventId - The id of the event to be deleted.
   * @returns An observable of the HTTP response.
   */
  deleteEvent(eventId: string) {
    return this.http.delete(EVENT_API_URL.DELETE_EVENT + eventId);
  }

  /**
   * Sends a GET request to fetch all events.
   * @returns An observable of the HTTP response containing the event list.
   */
  fetchEvents() {
    return this.http.get(EVENT_API_URL.GET_EVENTS);
  }

  /**
   * Sends a PUT request to update an event.
   * @param eventId - The id of the event to be updated.
   * @param data - The updated event data.
   * @returns An observable of the HTTP response.
   */
  updateEvent(eventId: string, data: any) {
    return this.http.put(EVENT_API_URL.GET_SPECIFIC_EVENT + eventId, data);
  }
}
