import styles from './slots.module.css';
import { ItemsSlots } from './itemsSlots/itemsSlots.tsx';
import { useState } from 'react';
import {
  CANCEL_SLOT_BOOKING,
  GET_SLOT_PER_USER,
  HANDLE_SLOT_BOOKING,
} from '@graphql/graphql.tsx';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store.ts';
import { WarningWindow } from '../warningWindow/warningWindow.tsx';
import { InfoModal } from '../InfoModal/InfoModal.tsx';

export const Slots = () => {
  const user = useSelector((state: RootState) => state.user);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [handleSlotBooking, { loading: bookingLoading }] =
    useMutation(HANDLE_SLOT_BOOKING);
  const [handleCancelSlotBooking, { loading: cancelLoading }] =
    useMutation(CANCEL_SLOT_BOOKING);

  const [check, { loading: checkLoading }] = useLazyQuery(GET_SLOT_PER_USER);

  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [textModal, setTextModal] = useState('');

  const record = async () => {
    for (let i = 0; i < 3; i++) {
      try {
        await handleSlotBooking({
          variables: {
            date: selectedDate,
            time: selectedTime,
            bookedBy: user.username,
          },
        });

        setTextModal('Вы записались!');
        setIsOpenInfoModal(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return;
      } catch (error) {
        console.error(error);
        setTextModal('Произошла ошибка, повторите попытку позже');
        setIsOpenInfoModal(true);
      }
    }
  };

  const cancelRecord = async () => {
    // отмена записи
    for (let i = 0; i < 3; i++) {
      try {
        await handleCancelSlotBooking({
          variables: {
            date: dateTime.slice(0, 10),
            time: dateTime.slice(-5),
            bookedBy: user.username,
          },
        });
        return;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const rewrite = async () => {
    // удалить старую запись
    await cancelRecord();
    // новая запись
    await record();
  };

  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [dateTime, setDateTime] = useState<string>('');

  const checkUser = async () => {
    // проверка, что пользователь не записан
    for (let i = 0; i < 3; i++) {
      try {
        const response = await check({
          variables: {
            bookedBy: user.username,
          },
        });
        if (response.data.getSlotPerUser) {
          setIsRecord(response.data.getSlotPerUser.booked);
          setDateTime(response.data.getSlotPerUser.startTime);
        }
        return response.data.getSlotPerUser.booked ?? false;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRecordConfirmation = async () => {
    const data = await checkUser();
    if (!data) {
      // запись на слот
      await record();
    }
  };

  const isButtonDisabled = bookingLoading || cancelLoading || checkLoading;

  return (
    <div className={styles.container}>
      <h2>Свободные даты для ВКС</h2>
      <ItemsSlots
        selectedDate={selectedDate}
        setSelectedTime={setSelectedTime}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
      />
      {selectedDate && selectedTime && (
        <>
          <section className={styles.instruction}></section>

          <div>
            <button
              onClick={handleRecordConfirmation}
              disabled={isButtonDisabled}
            >
              Подтвердить запись
            </button>
          </div>
        </>
      )}

      {isRecord && (
        <div className={styles.warning}>
          <WarningWindow
            dateTime={dateTime}
            setIsRecord={setIsRecord}
            rewrite={rewrite}
          />
        </div>
      )}

      <InfoModal
        text={textModal}
        visible={isOpenInfoModal}
        setVisible={setIsOpenInfoModal}
      />
    </div>
  );
};
