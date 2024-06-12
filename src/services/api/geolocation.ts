import axios from "axios";


export type UserIp = {
  id: string
}


export async function getUserIp() {
  try {
    const res = await axios.get<UserIp>("https://api.ipify.org?format=json")
    return res.data
  } catch (err) {
    return Promise.reject(err);
  }
}



export async function getUserGeolocation(requestData: UserIp) {
  try {
    const res = await axios.post(
        "http://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address",
        requestData,
        {
          headers: {
            Authorization: "Token efec08bc9d906d89af079975067a33ed501486c4"
          }
        }
      )
    return res.data
  } catch (err) {
    return Promise.reject(err);
  }
}

