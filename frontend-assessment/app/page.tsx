import FormBuilder from '@/components/FormBuilder/FormBuilder';
import styles from './page.module.css';

export default function Home() {
  return (
          <div className={styles.page}>
            <main className={styles.main}>
              <FormBuilder />
            </main>
          </div>
  );
}