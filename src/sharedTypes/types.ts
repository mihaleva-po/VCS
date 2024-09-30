export interface SlotD {
  dayWeek: string;
  number: string;
  month: string;
  isSelected: boolean;
}

export interface Slot {
  id: number;
  startTime: string;
  endTime: string;
  booked: boolean;
  bookedBy: null | string;
  employeeName: null | string;
}

export interface FormRegister {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface FormLogin {
  username: string;
  password: string;
}
