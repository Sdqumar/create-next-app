import smartcar from "smartcar";

export default async function handler(req, res) {
  const client = new smartcar.AuthClient({
    clientId: process.env.NEXT_PUBLIC_SMARTCAR_CLIENT_ID,
    clientSecret: process.env.SMARTCAR_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_SMARTCAR_REDIRECT_URI,
    testMode: true,
  });
  const code = req.query.code;
  // in a production app you'll want to store this in some kind of persistent storage
  let access = await client.exchangeCode(code);
  const vehicles = await smartcar.getVehicles(access.accessToken);
  // instantiate first vehicle in vehicle list
  const vehicle = new smartcar.Vehicle(
    vehicles.vehicles[0],
    access.accessToken
  );
  // get identifying information about a vehicle
  const attributes = await vehicle.attributes();
  console.log(attributes);
  // {
  //   "id": "36ab27d0-fd9d-4455-823a-ce30af709ffc",
  //   "make": "TESLA",
  //   "model": "Model S",
  //   "year": 2014
  //   "meta": {
  //     "requestId": "ada7207c-3c0a-4027-a47f-6215ce6f7b93"
  //   }
  // }
  res.status(200).json(attributes);
}
