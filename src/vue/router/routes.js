import Err404 from "~V/components/pages/Err404";
import Address from "~V/components/pages/Address";
import Weather from "~V/components/pages/Weather";
import Day from "~V/components/pages/Day";
import Week from "~V/components/pages/Week";

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
      component: Weather,

      children: [
        {
          path: "day",
          name: "Day",
          component: Day
        },
        {
          path: "week",
          name: "Week",
          component: Week
        }
      ]
    },
    {
      path: "*",
      name: "Err404",
      component: Err404
    }
  ]
};
