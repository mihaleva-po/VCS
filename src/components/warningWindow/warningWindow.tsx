import styles from './warningWindow.module.css';
import info from '@assets/info.svg';
import { parseISO, format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Props {
  dateTime: string;
  setIsRecord: (i: boolean) => void;
  rewrite: () => void;
}

export const WarningWindow = ({ dateTime, setIsRecord, rewrite }: Props) => {
  const formattedDate = format(parseISO(dateTime), "d MMMM 'в' HH:mm", {
    locale: ru,
  });

  const handleClickRewrite = () => {
    rewrite();
    setIsRecord(false);
  };

  return (
    <div className={styles.warning}>
      <img src={info} alt="иконка_информации" />
      <p className={styles.text}>Вы уже записаны на ВКС {formattedDate}</p>
      <div className={styles.btn}>
        <button onClick={handleClickRewrite}>
          Перезаписаться на выбранную дату
        </button>
        <button onClick={() => setIsRecord(false)}>Отменить</button>
      </div>
    </div>
  );
};
