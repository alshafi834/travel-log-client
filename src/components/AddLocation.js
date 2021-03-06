import React from "react";
import { Marker, Popup } from "react-map-gl";

import LogEntryForm from "./LogEntryForm";

const AddLocation = (props) => {
  const { addLocation, viewport, setAddLocation, getTravelEntries } = props;
  return (
    <div>
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
                height: `${4 * viewport.zoom}`,
                width: `${4 * viewport.zoom}`,
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
    </div>
  );
};

export default AddLocation;
