import styles from './slotDate.module.css';
import { SlotD } from '@sharedTypes/types.ts';

export const SlotDate = ({ dayWeek, number, month, isSelected }: SlotD) => {
  return (
    <section
      className={`${styles.slot} 
        ${dayWeek === 'Сб' || dayWeek === 'Вс' ? styles.disable : styles.baseSlot}
        ${isSelected && styles.selected}`}
    >
      <div className={styles.container}>
        <p className={styles.text}>{dayWeek}</p>
        <p className={styles.number}>{number}</p>
        <p className={styles.text}>{month.slice(0, 3)}</p>
      </div>
    </section>
  );
};
