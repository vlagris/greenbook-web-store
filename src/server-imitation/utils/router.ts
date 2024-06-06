import {MethodsName} from "@/server-imitation/types.ts";



type RouterController = (data: any) => any

type Route = {
  method: MethodsName,
  url: string,
  controller: RouterController
}

type Routes = {
  routes: Route[]
}

type RouterMethod = (url: string, controller: RouterController ) => void

type RouterMethods = {
  [key in MethodsName]: RouterMethod
}

type Router = Routes & RouterMethods


function createRoute(method: MethodsName, url: string, controller: RouterController): Route {
  return { method, url, controller};
}

export const router: Router = {
  routes: [],
  post(url, controller) {
    this.routes.push(createRoute("post", url, controller))
  },
  get(url, controller) {
    this.routes.push(createRoute("get", url, controller))
  },
  put(url, controller) {
    this.routes.push(createRoute("put", url, controller))
  },
  patch(url, controller) {
    this.routes.push(createRoute("patch", url, controller))
  },
  delete(url, controller) {
    this.routes.push(createRoute("delete", url, controller))
  },
}