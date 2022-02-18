import axios from "axios";
import Smartcar from "@smartcar/auth";

import Connect from "../components/Connect";
import Vehicle from "../components/Vehicle";
import { useState } from "react";

const App = () => {
  const [vehicle, setVehicle] = useState();

  function onComplete(err, code, state) {
    axios.get(`/api/smartcar/?code=${code}`).then((res) => {
      setVehicle(res.data);
    });
  }
  function authorize() {
    const smartcar = new Smartcar({
      clientId: process.env.NEXT_PUBLIC_SMARTCAR_CLIENT_ID,
      redirectUri: process.env.NEXT_PUBLIC_SMARTCAR_REDIRECT_URI,
      scope: ["read_vehicle_info"],
      testMode: true,
      onComplete: onComplete,
    });
    smartcar.openDialog({ forcePrompt: true });
  }

  return (
    <>
      <Connect onClick={authorize} />
      {vehicle && <Vehicle info={vehicle} />}
    </>
  );
};

export default App;
