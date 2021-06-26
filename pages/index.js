import styles from '../styles/Home.module.css';
import Navbar from '@/components/navbar';
import Social from '@/components/social';
import Main from '@/components/about';

export default function Home() {
  return (
    <div className={styles.main}>
      <Navbar />
      <Social />
      <Main />
    </div>
  );
}
