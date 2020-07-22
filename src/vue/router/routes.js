import Weather from "~V/components/pages/Weather";
import Address from "~V/components/pages/Address";
import Err404 from "~V/components/pages/Err404";

export default {
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Address",
      component: Address
    },
    {
      path: "/weather",
      name: "Weather",
      component: Weather
      // children: [
      //     {
      //         path: ':city',
      //         name: '', // TODO:
      //         component: null, // TODO:
      //         props: true
      //     }
      // ]
    },
    {
      path: "*",
      name: "Err404",
      component: Err404
    }
  ]
};
