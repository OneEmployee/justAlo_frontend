import React from "react";
import styles from "./BusBox.module.css";
import StarsIcon from "@material-ui/icons/Stars";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PeopleIcon from "@material-ui/icons/People";
import PowerIcon from "@material-ui/icons/Power";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import Tooltip from "@material-ui/core/Tooltip";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import RestoreIcon from "@material-ui/icons/Restore";
import { BottomTabs } from "../BottomTabs/BottomTabs";
import { useDispatch } from "react-redux";
import { updateBookingDetails } from "../../../Redux/BookBus/action";

const BusBox = ({
  _id,
  rating,
  operatorName,
  busType,
  departureTime,
  liveTracking,
  reschedulable,
  filledSeats,
  routeDetails,
  isDemo,
  ...props
}) => {
  // capturing duration in redux store
  let dispatch = useDispatch();
  React.useEffect(() => {
    const payload1 = {
      key: "duration",
      value: routeDetails["duration"],
    };

    dispatch(updateBookingDetails(payload1));
  }, [routeDetails,dispatch]);

  var avgRating = 0;
  var totalReviews = 0;
  rating.forEach((item, index) => {
    avgRating += (index + 1) * item;
    totalReviews += item;
  });

  avgRating = (avgRating / totalReviews).toFixed(1);

  var seatPrice = 0;
  var busTypeName = "";
  if (busType === 1) {
    seatPrice = 50 * Math.floor(routeDetails["duration"] / 2);
    busTypeName = "Seater";
  } else if (busType === 2) {
    seatPrice = 100 * Math.floor(routeDetails["duration"] / 2);
    busTypeName = "Sleeper";
  } else if (busType === 3) {
    seatPrice = 125 * Math.floor(routeDetails["duration"] / 2);
    busTypeName = "A/C Seater";
  } else {
    seatPrice = 75 * Math.floor(routeDetails["duration"] / 2);
    busTypeName = "Non - A/C";
  }

  var busDepartureTime = departureTime;
  var busArrivalTime =
    (Number(departureTime) + Number(routeDetails["duration"])) % 24;
  return (
    <div className={styles.busBox}>
      {/* Promo Badge */}
      <div className={styles.promoBadge}>
        Exclusive 12.5% OFF
      </div>

      <div className={styles.busBoxSection1}>
        {/* Left Section: Operator & Type */}
        <div className={styles.busBoxSection11}>
          <div className={styles.operatorTitle}>
            {operatorName}
            {isDemo && <DirectionsBusIcon className={styles.busIconBadge} />}
          </div>
          <div className={styles.busDetailsText}>
            {props.busDetails || busTypeName}
          </div>
        </div>

        {/* Rating Section */}
        <div className={styles.ratingSection}>
          <div className={styles.ratingBox}>
            <StarsIcon /> {avgRating}
          </div>
          <div className={styles.reviewsCount}>{totalReviews} Reviews</div>
        </div>

        {/* Times Section */}
        <div className={styles.timesSection}>
          <div className={styles.timeBold}>
            {busDepartureTime}:00 — {busArrivalTime}:00
          </div>
          <div className={styles.durationMuted}>
            {routeDetails.duration}h 50m • 22 Seats
          </div>
        </div>

        {/* Price Section */}
        <div className={styles.priceSection}>
          <div className={styles.oldPrice}>₹{Math.floor(seatPrice * 1.12)}</div>
          <div className={styles.currentPrice}>₹{seatPrice}</div>
          <div className={styles.onwardsText}>Onwards</div>
        </div>
      </div>

      {/* Badges and Amenities Row */}
      <div className={styles.busBoxSection2}>
        <div className={styles.typeBadges}>
          <span className={styles.newBusBadge}>New Bus</span>
          <span className={styles.businessClassBadge}>Business Class</span>
        </div>
      </div>

      {/* Footer Tabs & CTA */}
      <div className={styles.busBoxSection3}>
        <BottomTabs
          filledSeats={filledSeats}
          seatPrice={seatPrice}
          routeDetails={routeDetails}
          busId={_id}
          busArrivalTime={busArrivalTime}
          busDepartureTime={busDepartureTime}
          operatorName={operatorName}
        />
      </div>
    </div>
  );
};

export { BusBox };
