import React from "react";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";

const Header = () => {
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const departure = query.get("departure");
  const arrival = query.get("arrival");
  const date = query.get("date");

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderOne}>
        <p>
          Home &gt; Bus Tickets &gt; {departure} Bus &gt; {departure} To{" "}
          {arrival} Bus
        </p>
      </div>

      <div className={styles.StickyHeader}>
        <div className={styles.QuickSearchContainer}>
          {/* Back Arrow */}
          <div className={styles.BackIcon}>←</div>

          {/* Route Info */}
          <div className={styles.RouteInfo}>
            <div className={styles.RouteTitle}>
              {departure} → {arrival}
            </div>
            <div className={styles.BusCount}>58 buses</div>
          </div>

          {/* Search Inputs Group */}
          <div className={styles.SearchInputGroup}>
            <div className={styles.InputBox}>
              <div className={styles.InputLabel}>From</div>
              <div className={styles.InputValue}>{departure}</div>
            </div>

            <div className={styles.SwapIcon}>⇌</div>

            <div className={styles.InputBox}>
              <div className={styles.InputLabel}>To</div>
              <div className={styles.InputValue}>{arrival}</div>
            </div>

            <div className={styles.DateGroup}>
              <div className={styles.DateInput}>
                <div className={styles.InputLabel}>Date of journey</div>
                <div className={styles.InputValue}>
                  {date} <span className={styles.TodayMuted}>(Today)</span>
                </div>
              </div>
              <div className={styles.QuickDates}>
                <button className={styles.DateBtn}>Today</button>
                <button className={styles.DateBtnActive}>Tomorrow</button>
              </div>
            </div>

            {/* Search CTA */}
            <div className={styles.SearchCircle}>
              <span role="img" aria-label="search">
                🔍
              </span>
            </div>
          </div>

          <div className={styles.RouteTitleRight}>
            {departure} to {arrival} Bus
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
