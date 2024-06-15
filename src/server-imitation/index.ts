import {routes} from "@/server-imitation/routes.ts";
import {MethodsName} from "@/server-imitation/types.ts";

type apiResponse<R> = Promise<{
  data: R
}>


type API = {
  post: <R>(url: string, data?: any, config?: any) => apiResponse<R>
  get: <R>(url: string, config?: any) => apiResponse<R>
  put: <R>(url: string, data?: any, config?: any) => apiResponse<R>
  patch: <R>(url: string, data?: any, config?: any) => apiResponse<R>
  delete: <R>(url: string, config?: any) => apiResponse<R>
}


interface GetData {
  method: MethodsName,
  url: string,
  data?: any,
  config?: any
}

async function getData({method, url, data, config}: GetData): Promise<any> {
  const request: any = {
    params: {},
    body: data,
    query: config?.params
  }

  let route = routes.find(route => {
    if (route.method === method && route.url === url) {
      return route;
    }
  });


  if (!route) {
    route = routes.find(route => {
      const splitUrl = url.split("/").filter(Boolean);
      const splitRouteUrl = route.url.split("/").filter(Boolean);
      if (route.method === method && splitRouteUrl.length === splitUrl.length) {
        const validRoute = splitRouteUrl.every((item, index) => {
          if (item === splitUrl[index]) {
            return true;
          }
          if (item.includes(":")) {
            const paramsName = item.split(":").join("");
            request.params[paramsName] = Number(splitUrl[index])? Number(splitUrl[index]) : splitUrl[index];
          }
          return item.includes(":");
        })
        if (validRoute) {
          return route;
        }
      }
    });
  }


  if (!route) {
    return Promise.reject({});
  }

  const userIdJson = localStorage.getItem("userId");

  if (userIdJson) {
    request.userId = JSON.parse(userIdJson);
  }


  const result = route.controller(request);


  const delay = 300 + Math.floor(Math.random() * 300);

  await new Promise(r => setTimeout(r, delay))


  if (result.status === 200) {
    return result;
  }

  return Promise.reject({
    response: result
  });
}

const api: API = {
  async post(url, data, config) {
    const result = await getData({ method: "post", url, data, config })
    // console.log(result)
    return result;
  },
  async get(url, config) {
    const result = await getData({ method: "get", url, config })
    // console.log(result)
    return result;
  },
  async put(url, data, config) {
    const result = await getData({ method: "put", url, data, config })
    // console.log(result)
    return result;
  },
  async patch(url, data, config) {
    const result = await getData({ method: "patch", url, data, config })
    // console.log(result)
    return result;
    },
  async delete(url, config) {
    const result = await getData({ method: "delete", url, config })
    // console.log(result)
    return result;
  },
}

export default api;

