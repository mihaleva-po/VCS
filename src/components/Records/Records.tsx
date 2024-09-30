import styles from './Records.module.css';
import calendar from '@assets/calendar.svg';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CANCEL_SLOT_BOOKING,
  GET_SLOT_PER_USER,
} from '@graphql/graphql.tsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store.ts';
import { ru } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';

export const Records = () => {
  const user = useSelector((state: RootState) => state.user);

  const [check, { loading }] = useLazyQuery(GET_SLOT_PER_USER);

  const [dataTime, setDataTime] = useState<string>('');

  useEffect(() => {
    (async () => {
      // проверка, что пользователь не записан
      for (let i = 0; i < 3; i++) {
        try {
          const response = await check({
            variables: {
              bookedBy: user.username,
            },
          });

          if (response.data.getSlotPerUser.booked) {
            setDataTime(response.data.getSlotPerUser.startTime);
          }
          return;
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [check, user.username]);

  const [handleCancelSlotBooking] = useMutation(CANCEL_SLOT_BOOKING);
  const handleBack = async () => {
    // выполнение запроса на удаление записи
    for (let i = 0; i < 3; i++) {
      try {
        await handleCancelSlotBooking({
          variables: {
            date: dataTime.slice(0, 10),
            time: dataTime.slice(-5),
            bookedBy: user.username,
          },
        });
        window.location.reload();
        return;
      } catch (error) {
        console.error(error);
      }
    }

    setDataTime('');
  };

  return (
    <section className={styles.records}>
      <h1>Предстоящие ВКС</h1>
      <div className={styles.containerDate}>
        <img src={calendar} alt="иконка_календарь" />
        <p className={styles.date}>
          {dataTime
            ? format(parseISO(dataTime), "d MMMM 'в' HH:mm", {
                locale: ru,
              })
            : 'Вы не записаны на ВКС'}
        </p>
      </div>

      <button onClick={handleBack} disabled={loading}>
        Отменить запись
      </button>
    </section>
  );
};
