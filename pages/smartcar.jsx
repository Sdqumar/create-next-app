import axios from "axios";
import Smartcar from "@smartcar/auth";

import Connect from "../components/Connect";
import Vehicle from "../components/Vehicle";
import { useState } from "react";

const App = () => {
  const [vehicle, setVehicle] = useState({});

  function onComplete(err, code, state) {
    console.log(err, code, state);
    return axios
      .get(`${process.env.REACT_APP_SERVER}/exchange?code=${code}`)
      .then((_) => {
        return axios.get(`${process.env.REACT_APP_SERVER}/vehicle`);
      })
      .then((res) => {
        setVehicle({ vehicle: res.data });
      });
  }

  function authorize() {
    const smartcar = new Smartcar({
      clientId: "a9be171e-3e4e-4b83-bcad-3ab9df9e1474",
      redirectUri:
        "https://javascript-sdk.smartcar.com/v2/redirect?app_origin=https://3000-sdqumar-createnextapp-u800e8u3mz9.ws-eu32.gitpod.io",
      scope: ["read_vehicle_info"],
      testMode: true,
      onComplete: onComplete,
    });
    smartcar.openDialog({ forcePrompt: true });
  }

  return Object.keys(vehicle).length !== 0 ? (
    <Vehicle info={vehicle} />
  ) : (
    <Connect onClick={authorize} />
  );
};

export default App;
