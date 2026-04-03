import React from "react";
import styles from "./BusTracker.module.css";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
const data = [
  {
    type: "Buses",
    number: "10,000",
    details: "Total buses currently being tracked",
  },
  {
    type: "Routes",
    number: "60,000",
    details: "Total routes covered by live tracking",
  },
  {
    type: "Users",
    number: "40,000",
    details: "Total users using Track My Bus feature",
  },
];

const BusTracker = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.upperFlexContainer}>
          <div className={styles.imgBox}>
            <img
              src="https://s3.rdbuz.com/Images/carousel/tmb_img.png"
              alt="tracker"
            />
          </div>
          <div className={styles.writingBox}>
            <h2>TRACK MY BUS - Smarter Way To Travel</h2>
            <p>
              Track your bus with our ‘Track My Bus’ feature and know the exact
              location in real-time. Stay informed and keep your family
              informed!
            </p>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#00CED1",
                color: "#fff",
                fontWeight: "700",
                borderRadius: "20px",
                padding: "10px 25px",
              }}
            >
              KNOW MORE
            </Button>
          </div>
        </div>

        <div className={styles.flexContainer}>
          {data.map((item) => {
            return (
              <div key={uuidv4()} className={styles.flexItems}>
                <p>{item.type}</p>
                <h1>{item.number}</h1>
                <p>{item.details}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusTracker;
