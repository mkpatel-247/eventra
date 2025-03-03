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
  header: string;
  body: string;
  delay?: number;
}
