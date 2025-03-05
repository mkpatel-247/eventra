export interface IEvent {
  id: number;
  title: string;
  description: string;
  image: string;
  timing: ITiming;
  address: any;
}

interface ITiming {
  start: string;
  end: string;
}

export interface IToastInfo {
  message: string;
  class: string;
  show: boolean;
  icon: string | undefined;
  delay?: number;
}
