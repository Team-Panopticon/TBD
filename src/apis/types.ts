export type ISODateTime = string;
export type Meal = 'lunch' | 'dinner';

export interface CreateMeetingRequest {
  name: string;
  dates: ISODateTime[];
  type: 'date' | 'meal';
  deadline: ISODateTime;
  password?: string;
}

export interface CreateMeetingResponse extends CreateMeetingRequest {
  id: string;
  status: 'in progress' | 'done';
}
