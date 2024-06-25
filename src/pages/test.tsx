// components/Main.tsx
import React from 'react';
import styles from './test.module.css';

const Main: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <h1>فروشگاه کیک آنلاین</h1>
        <p>بهترین کیک‌ها برای شما</p>
      </header>

      <section className={styles.productsSection}>
        <h2>محصولات ما</h2>
        <div className={styles.products}>
          <div className={styles.product}>
            <img src="/images/cako.png" alt="Cake 1" />
            <h3>کیک شکلاتی</h3>
            <p>خوشمزه‌ترین کیک شکلاتی که تا به حال خورده‌اید!</p>
          </div>
          <div className={styles.product}>
            <img src="/images/cako.png" alt="Cake 2" />
            <h3>کیک وانیلی</h3>
            <p>لطیف‌ترین کیک وانیلی برای جشن‌های شما!</p>
          </div>
          {/* Add more products as needed */}
        </div>
      </section>

      <section className={styles.basketSection}>
        <h2>سبد خرید</h2>
        <p>سبد خرید شما خالی است.</p>
        {/* Add basket functionality here */}
      </section>
    </div>
  );
};

export default Main;
