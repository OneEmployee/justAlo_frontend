import React from "react";
import styles from "./Right.module.css";
import { BusBox } from "../BusDetails/BusBox/BusBox";
import { SortingBar } from "../BusDetails/SortingBar/SortingBar";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusDetails } from "../../Redux/BookBus/action";

const Right = () => {
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const departure = query.get("departure");
  const arrival = query.get("arrival");
  const date = query.get("date");

  const isLoading = useSelector((state) => state.busDetailsReducer.isLoading);
  const isError = useSelector((state) => state.busDetailsReducer.isError);
  const isSuccess = useSelector((state) => state.busDetailsReducer.isSuccess);
  const routeDetails = useSelector(
    (state) => state.busDetailsReducer.routeDetails
  );
  const matchedBuses = useSelector(
    (state) => state.busDetailsReducer.matchedBuses
  );
  const busIdWithSeatsObj = useSelector(
    (state) => state.busDetailsReducer.busIdWithSeatsObj
  );

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBusDetails(departure, arrival, date));
  }, [arrival , date , departure ,dispatch]);

  var filteredMatchedBuses = [...matchedBuses];

  //checking and filtering seat type
  const checkBusType = useSelector(
    (state) => state.updateFilterDetailsReducer.busType
  );

  if (
    checkBusType["seater"] === false &&
    checkBusType["sleeper"] === false &&
    checkBusType["ac"] === false &&
    checkBusType["nonac"] === false
  ) {
  } else {
    filteredMatchedBuses = filteredMatchedBuses.filter((item) => {
      return (
        (checkBusType["seater"] === true && item.busType === 1) ||
        (checkBusType["sleeper"] === true && item.busType === 2) ||
        (checkBusType["ac"] === true && item.busType === 3) ||
        (checkBusType["nonac"] === true && item.busType === 4)
      );
    });
  }

  //checking and filtering depature time

  const checkDepartTime = useSelector(
    (state) => state.updateFilterDetailsReducer.departureTime
  );

  if (
    checkDepartTime["before6am"] === false &&
    checkDepartTime["6amto12pm"] === false &&
    checkDepartTime["12pmto6pm"] === false &&
    checkDepartTime["after6pm"] === false
  ) {
  } else {
    filteredMatchedBuses = filteredMatchedBuses.filter((item) => {
      return (
        (checkDepartTime["before6am"] === true && item.departureTime < 6) ||
        (checkDepartTime["6amto12pm"] === true &&
          item.departureTime >= 6 &&
          item.departureTime < 12) ||
        (checkDepartTime["12pmto6pm"] === true &&
          item.departureTime >= 12 &&
          item.departureTime < 18) ||
        (checkDepartTime["after6pm"] === true && item.departureTime >= 18)
      );
    });
  }

  //checking and filtering arrival time

  const checkArrivalTime = useSelector(
    (state) => state.updateFilterDetailsReducer.arrivalTime
  );

  if (
    checkArrivalTime["before6am"] === false &&
    checkArrivalTime["6amto12pm"] === false &&
    checkArrivalTime["12pmto6pm"] === false &&
    checkArrivalTime["after6pm"] === false
  ) {
  } else {
    filteredMatchedBuses = filteredMatchedBuses.filter((item) => {
      var arriveTime =
        (Number(item.departureTime) + Number(routeDetails["duration"])) % 24;
      return (
        (checkArrivalTime["before6am"] === true && arriveTime < 6) ||
        (checkArrivalTime["6amto12pm"] === true &&
          arriveTime >= 6 &&
          arriveTime < 12) ||
        (checkArrivalTime["12pmto6pm"] === true &&
          arriveTime >= 12 &&
          arriveTime < 18) ||
        (checkArrivalTime["after6pm"] === true && arriveTime >= 18)
      );
    });
  }

  //filtering Live Tracking Buses
  const checkLiveTracking = useSelector(
    (state) => state.updateFilterDetailsReducer.liveTracking
  );

  if (checkLiveTracking === true) {
    filteredMatchedBuses = filteredMatchedBuses.filter(
      (item) => item.liveTracking === 1
    );
  }

  //filtering Reschedulable buses

  const checkReschedulable = useSelector(
    (state) => state.updateFilterDetailsReducer.reschedulable
  );

  if (checkReschedulable === true) {
    filteredMatchedBuses = filteredMatchedBuses.filter(
      (item) => item.reschedulable === 1
    );
  }

  //sorting buses list..

  const sortingProperty = useSelector(
    (state) => state.updateFilterDetailsReducer.sortingProperty
  );

  if (sortingProperty !== "None") {
    console.log(sortingProperty);
    if (sortingProperty === "departure") {
      filteredMatchedBuses.sort(
        (a, b) => Number(a.departureTime) - Number(b.departureTime)
      );
    }

    if (sortingProperty === "arrivals") {
      filteredMatchedBuses.sort((a, b) => {
        var arriveTime1 =
          (Number(a.departureTime) + Number(routeDetails["duration"])) % 24;

        var arriveTime2 =
          (Number(b.departureTime) + Number(routeDetails["duration"])) % 24;

        return arriveTime1 - arriveTime2;
      });
    }

    if (sortingProperty === "ratings") {
      filteredMatchedBuses.sort((a, b) => {
        var ratingArr1 = a["rating"];
        var ratingArr2 = b["rating"];

        var avgRating1 = 0;
        var totalReviews1 = 0;
        ratingArr1.forEach((item, index) => {
          avgRating1 += (index + 1) * item;
          totalReviews1 += item;
        });

        avgRating1 = Number((avgRating1 / totalReviews1).toFixed(1));

        var avgRating2 = 0;
        var totalReviews2 = 0;
        ratingArr2.forEach((item, index) => {
          avgRating2 += (index + 1) * item;
          totalReviews2 += item;
        });

        avgRating2 = Number((avgRating2 / totalReviews2).toFixed(1));

        return avgRating1 - avgRating2;
      });
    }
  }

  return (
    <div className={styles.Right}>
      <SortingBar />
      {isLoading && <div>Loading...</div>}
      {/* Demo Buses Section */}
      {filteredMatchedBuses.length === 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#004F50", marginBottom: "20px" }}>Available Demo Services for {departure} to {arrival}</h3>
          {[
            {
              _id: "demo1",
              operatorName: "zingbus Maxx",
              busType: 2, // Sleeper
              departureTime: 18,
              liveTracking: 1,
              reschedulable: 1,
              rating: [5, 10, 20, 50, 500], // High rating
              filledSeats: [],
              price: 1398,
              isDemo: true,
              busDetails: "Volvo 9600 Multi-Axle A/C Sleeper (2+1)",
              duration: 13,
              arrivalTime: 8
            },
            {
              _id: "demo2",
              operatorName: "Intercity SmartBus",
              busType: 3, // A/C Seater
              departureTime: 20,
              liveTracking: 1,
              reschedulable: 0,
              rating: [2, 5, 15, 40, 400],
              filledSeats: [],
              price: 1150,
              isDemo: true,
              busDetails: "Bharat Benz A/C Seater (2+2)",
              duration: 12,
              arrivalTime: 8
            },
            {
              _id: "demo3",
              operatorName: "VRL Travels",
              busType: 2,
              departureTime: 22,
              liveTracking: 0,
              reschedulable: 1,
              rating: [1, 3, 10, 30, 350],
              filledSeats: [],
              price: 1650,
              isDemo: true,
              busDetails: "Scania Multi-Axle A/C Sleeper (2+1)",
              duration: 14,
              arrivalTime: 12
            }
          ].map((demoBus) => (
            <BusBox
              key={demoBus._id}
              {...demoBus}
              filledSeats={[]}
              routeDetails={{
                duration: demoBus.duration,
                departureLocation: { name: departure },
                arrivalLocation: { name: arrival }
              }}
            />
          ))}
        </div>
      )}

      {isSuccess &&
        filteredMatchedBuses.map((item) => {
          return (
            <BusBox
              key={item._id}
              {...item}
              filledSeats={busIdWithSeatsObj[item._id.toString()] || []}
              routeDetails={routeDetails}
            />
          );
        })}
    </div>
  );
};

export default Right;
