import { gql } from '@apollo/client';


// получение временных слотов на дату
export const GET_AVAILABLE_SLOTS_FOR_DATE = gql`
  query GetAvailableSlotsForDate($date: String!) {
    getAvailableSlotsForDate(date: $date) {
      id
      startTime
      endTime
      booked
      bookedBy
      employeeName
    }
  }
`;

// запись
export const HANDLE_SLOT_BOOKING = gql`
  mutation HandleSlotBooking(
    $date: String!
    $time: String!
    $bookedBy: String!
  ) {
    handleSlotBooking(date: $date, time: $time, bookedBy: $bookedBy)
  }
`;

// отмена записи
export const CANCEL_SLOT_BOOKING = gql`
  mutation CancelSlotBooking(
    $date: String!
    $time: String!
    $bookedBy: String!
  ) {
    cancelSlotBooking(date: $date, time: $time, bookedBy: $bookedBy)
  }
`;

// проверка
export const GET_SLOT_PER_USER = gql`
  query getSlotPerUser($bookedBy: String!) {
    getSlotPerUser(bookedBy: $bookedBy) {
      startTime
      booked
    }
  }
`;
