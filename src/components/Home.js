import React, { useState, useEffect, useCallback } from "react";
import ReactMapGL from "react-map-gl";
import { listLogEntries } from "../API";
import MapMarker from "./MapMarker";
import AddLocation from "./AddLocation";
import Credit from "./Credit";
import Instruction from "./Instruction";
import Search from "./Search";

const Home = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopUp, setShowPopUp] = useState({});
  const [addLocation, setAddLocation] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 23.7805733,
    longitude: 90.279239,
    zoom: 6.5,
  });

  const getTravelEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getTravelEntries();
  }, []);

  const markVisited = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddLocation({
      latitude,
      longitude,
    });
  };

  /* const setCoordinate = useCallback((event) => {
    console.log(event);
  }, []); */

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/alshafi/ck8vtun262o8b1iqkhxrdqeti"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={markVisited}
    >
      <MapMarker
        logEntries={logEntries}
        viewport={viewport}
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
      />

      <Instruction />

      <Search setViewport={setViewport} />

      <AddLocation
        addLocation={addLocation}
        viewport={viewport}
        setAddLocation={setAddLocation}
        getTravelEntries={getTravelEntries}
      />

      <Credit />
    </ReactMapGL>
  );
};

export default Home;
