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
      scope: [
        "read_odometer",
        "read_vehicle_info",
        "read_location",
        "read_fuel",
        "control_security",
        "read_battery",
      ],
      single_select: true,
      testMode: true,
      onComplete: onComplete,
    });
    smartcar.openDialog({ forcePrompt: true });
  }

  return (
    <div style={{ margin: "30px 40px" }}>
      <Connect onClick={authorize} />
      {vehicle && <Vehicle info={vehicle} />}
    </div>
  );
};

export default App;
