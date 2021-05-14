import styles from '../styles/Home.module.css';
import Navbar from '@/components/navbar';
import Social from '@/components/social';

export default function Home() {
  return (
    <div className={styles.main}>
      <Navbar />
      <Social />
    </div>
  );
}
