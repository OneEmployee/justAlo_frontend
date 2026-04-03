import React from "react";
import styles from "./SelectBus.module.css";
import Header from "./Header";
import Left from "./Left";
import Right from "./Right";
const SelectBus = () => {
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className={styles.SelectBus}>
      <Header />
      <div className={styles.mobile_filter_toggle} onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? "HIDE FILTERS" : "SHOW FILTERS"}
      </div>
      <div className={`${styles.SelectBus_mainContent} ${showFilters ? styles.showFilters : ""}`}>
        <div className={`${styles.Left_wrapper} ${showFilters ? styles.show : ""}`}>
           <div className={styles.close_filters} onClick={() => setShowFilters(false)}>✕</div>
           <Left />
        </div>
        <Right />
      </div>
    </div>
  );
};

export default SelectBus;
