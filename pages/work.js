import styles from '../styles/Home.module.css';
import Navbar from '@/components/navbar';
import Social from '@/components/social';
import Main from '@/components/work';

export default function About() {
  return (
    <div className={styles.main}>
      <Navbar />
      <Social />
      <Main />
    </div>
  );
}
