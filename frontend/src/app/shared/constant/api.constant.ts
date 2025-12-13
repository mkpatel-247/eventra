import { API_BASE_URL, AUTH_BASE_URL, EVENT_BASE_URL } from "environment";

export const LOGIN_API = AUTH_BASE_URL + "login";
export const LOGOUT_API = AUTH_BASE_URL + "logout";
export const REGISTER_USER_API = AUTH_BASE_URL + "register";
export const REFRESH_TOKEN_API = AUTH_BASE_URL + "refresh-token";

export const EVENT_API_URL = {
  ADD_EVENT: EVENT_BASE_URL + "manage-event",
  GET_SPECIFIC_EVENT: EVENT_BASE_URL + "manage-event/",
  DELETE_EVENT: EVENT_BASE_URL + "manage-event/",
  GET_EVENTS: EVENT_BASE_URL + "list",
};

export const BOOKING_API_URL = {
  BOOK: API_BASE_URL + "booking",
  GET_MY_BOOKINGS: API_BASE_URL + "booking",
  CANCEL_BOOKING: API_BASE_URL + "booking/", // + :id/cancel
};
