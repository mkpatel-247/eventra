import { EVENT } from '../constant/keys.constant';

/**
 * Get data from localStorage.
 * @param key name of object that you have to fetch from localStorage.
 * @returns value or null.
 */
export function getLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

/**
 * Set data into LocalStorage.
 * @param key name of object that you want to set.
 * @param value value that you have to set in LocalStorage.
 */
export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get the formatted event list.
 * @returns formatted object as per fullCalender plugin
 */
export function getEvents() {
  return getLocalStorage(EVENT).map((e: any) => {
    return {
      id: e.id,
      title: e.title,
      start: e.timing.start,
      end: e.timing.end,
    };
  });
}

/**
 * Fetch the index location from event list.
 * @param eventId Unique ID of event.
 * @returns index location.
 */
export function findObjectNIndex(eventId: number) {
  const index = getLocalStorage(EVENT).findIndex((element: any) => {
    return element.id == eventId;
  });
  const object = getLocalStorage(EVENT).find((element: any) => {
    return element.id == eventId;
  });
  return { object: object, index: index };
}

/**
 * Format Date according to dateTimeLocal format.
 * Example of formatted date: 2024-06-08T04:23
 */
export function formatDateTime(calendarDate: Date) {
  return calendarDate.toISOString().slice(0, 21);
}
