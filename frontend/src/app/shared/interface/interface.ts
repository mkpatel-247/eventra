export interface IEvent {
  _id: number;
  title: string;
  description: string;
  image: string;
  eventDate: ITiming;
  address: any;
}

interface ITiming {
  startDate: string;
  endDate: string;
}

export interface IToastInfo {
  message: string;
  class: string;
  show: boolean;
  icon: string | undefined;
  delay?: number;
}
