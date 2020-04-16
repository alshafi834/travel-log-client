import React from "react";
import { Marker, Popup } from "react-map-gl";

const MapMarker = (props) => {
  return (
    <div>
      {props.logEntries.map((entry) => (
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
                height: `${3 * props.viewport.zoom}`,
                width: `${3 * props.viewport.zoom}`,
              }}
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => {
                props.setShowPopUp({
                  [entry._id]: true,
                });
              }}
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
          {props.showPopUp[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => {
                props.setShowPopUp({});
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
    </div>
  );
};

export default MapMarker;
