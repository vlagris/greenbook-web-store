import React, { useEffect } from 'react';
import { useGetUserGeolocationMutation, useGetUserIpQuery } from "@/services/api";
import classes from "@components/Header/styles.module.scss";
import MapPinIcon from '@assets/icons/map-pin.svg?react';


function Geolocation() {
  const userIp = useGetUserIpQuery();
  const [GetUserGeolocation, userGeolocationResult] = useGetUserGeolocationMutation();


  useEffect(() => {
    if (!userIp.data) {
      return;
    }
    GetUserGeolocation(userIp.data);
  }, [userIp.data]);


  return (
    <div>
      {userGeolocationResult.data?.location?.data.city &&
        <div className={classes.location_button}>
          <MapPinIcon className={classes.location_icon}/>
          <p className={classes.top_text}>{userGeolocationResult.data.location.data.city}</p>
        </div>
      }
    </div>
  );
}

export default Geolocation;