import React, {useEffect} from 'react';
import {UserIp} from "@/services/api";
import useApi from "@/hooks/useApi.ts";
import * as api from "@/services/api"
import classes from "@components/Header/styles.module.scss";
import MapPinIcon from '@assets/icons/map-pin.svg?react';


function Geolocation() {
  const userIp = useApi<UserIp>();
  const userGeolocation = useApi();


  useEffect(() => {
    userIp.apiQuery( () => api.getUserIp());
  }, []);


  useEffect(() => {
    if (!userIp.data) {
      return;
    }
    // @ts-ignore
    userGeolocation.apiQuery(() => api.getUserGeolocation(userIp.data))
  }, [userIp.data]);


  return (
    <div>
      {userGeolocation.data?.location?.data?.city &&
        <div className={classes.location_button}>
          <MapPinIcon className={classes.location_icon}/>
          <p className={classes.top_text}>{userGeolocation.data?.location?.data?.city}</p>
        </div>
      }
    </div>
  );
}

export default Geolocation;