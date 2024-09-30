import styles from './itemsSlots.module.css';
import { useRef } from 'react';
import { addDays, format, getDay, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useLazyQuery } from '@apollo/client';
import { GET_AVAILABLE_SLOTS_FOR_DATE } from '@graphql/graphql.tsx';
import { Slot } from '@sharedTypes/types.ts';
import { SlotDate } from './slotDate/slotDate.tsx';

interface Data {
  getAvailableSlotsForDate: [Slot];
}

interface ItemsSlot {
  selectedDate: string | null;
  setSelectedDate: (i: string) => void;
  selectedTime: string | null;
  setSelectedTime: (i: string) => void;
}

export const ItemsSlots = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: ItemsSlot) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const onSelectDate = async (i: number) => {
    if (sectionRef.current) {
      const scrollPosition = sectionRef.current.scrollLeft;

      if (
        weekdays[getDay(dateRender[i])] !== 'Вс' &&
        weekdays[getDay(dateRender[i])] !== 'Сб'
      ) {
        await getSlots({
          variables: {
            date: format(dateRender[i], 'yyyy-MM-dd', { locale: ru }),
          },
        });

        setSelectedDate(format(dateRender[i], 'yyyy-MM-dd', { locale: ru }));
      }

      // Восстанавливаем позицию скролла после изменения состояния
      setTimeout(() => {
        if (sectionRef.current) {
          sectionRef.current.scrollLeft = scrollPosition;
        }
      }, 0);
    }
  };

  const currentDate = new Date();
  const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const [getSlots, { loading, error, data }] = useLazyQuery<Data>(
    GET_AVAILABLE_SLOTS_FOR_DATE
  );

  const dateRender: Date[] = [];
  for (let i = 1; i < 30; i++) {
    dateRender.push(addDays(currentDate, i));
  }

  const onSelectedTime = (i: number) => {
    if (data) {
      setSelectedTime(
        format(parseISO(data?.getAvailableSlotsForDate[i]?.startTime), 'HH:mm')
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <section className={styles.items}>
      <section ref={sectionRef} className={styles.itemsDateSlots}>
        {dateRender.map((date, i) => (
          <div key={i} onClick={() => onSelectDate(i)}>
            <SlotDate
              dayWeek={weekdays[getDay(date)]}
              number={format(date, 'd', { locale: ru })}
              month={format(date, 'MMM', { locale: ru }).slice(0, -1)}
              isSelected={
                format(dateRender[i], 'yyyy-MM-dd', { locale: ru }) ===
                selectedDate
              }
            />
          </div>
        ))}
      </section>
      {
        <section className={styles.itemsTimeSlots}>
          {data?.getAvailableSlotsForDate.map((slot: Slot, i: number) => (
            <div
              key={i}
              onClick={() => onSelectedTime(i)}
              className={`${styles.blockTime} 
                                 ${slot.booked ? styles.disable : styles.time}
                                 ${format(parseISO(slot?.startTime), 'HH:mm') === selectedTime && styles.selected}`}
            >
              {`${format(parseISO(slot.startTime), 'HH:mm')} - 
                    ${format(parseISO(slot.endTime), 'HH:mm')} `}
            </div>
          ))}
        </section>
      }
    </section>
  );
};
