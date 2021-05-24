import styles from '../styles/Home.module.css';
import Navbar from '@/components/navbar';
import Social from '@/components/social';
import { Main, Tech } from '@/components/about';

export default function About() {
  return (
    <div className={styles.main}>
      <Navbar />
      <Social />
      <Main />
      <Tech />
    </div>
  );
}
