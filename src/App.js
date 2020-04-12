import React, { useState, useEffect } from "react";
import "./App.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./API";
import LogEntryForm from "./components/LogEntryForm";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopUp, setShowPopUp] = useState({});
  const [addLocation, setAddLocation] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 4,
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

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/alshafi/ck8vtun262o8b1iqkhxrdqeti"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={markVisited}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <svg
              className="marker"
              style={{
                height: `${6 * viewport.zoom}`,
                width: `${6 * viewport.zoom}`,
              }}
              viewBox="0 0 24 24"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={() => {
                setShowPopUp({
                  [entry._id]: true,
                });
              }}
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
          {showPopUp[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => {
                setShowPopUp({});
              }}
              anchor="top"
            >
              <div className="popup">
                <h3>Place Name: {entry.title}</h3>
                <p>Comment: {entry.comments}</p>
                <p>
                  {entry.rating ? <span>Rating: {entry.rating}</span> : null}
                </p>
                <p>
                  Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                </p>
                {entry.image ? (
                  <img className="placeImg" src={entry.image} alt="place" />
                ) : null}
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}

      {addLocation ? (
        <>
          <Marker
            latitude={addLocation.latitude}
            longitude={addLocation.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <svg
              className="marker"
              style={{
                height: `${6 * viewport.zoom}`,
                width: `${6 * viewport.zoom}`,
              }}
              viewBox="0 0 24 24"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
          <Popup
            latitude={addLocation.latitude}
            longitude={addLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => {
              setAddLocation(null);
            }}
            anchor="top"
          >
            <div className="popup">
              <LogEntryForm
                coordinates={addLocation}
                onFormClose={() => {
                  setAddLocation(null);
                  getTravelEntries();
                }}
              />
            </div>
          </Popup>{" "}
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
