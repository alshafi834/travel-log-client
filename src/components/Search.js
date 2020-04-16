import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { searchPlace } from "../API";

const Search = (props) => {
  const { register, handleSubmit } = useForm();
  const [searchResult, setSearchResult] = useState(null);
  //const [cords, setCords] = useState({});

  let placesResponse;
  const onSubmit = async (data) => {
    try {
      placesResponse = await searchPlace(data.location);
      console.log(placesResponse);
      setSearchResult(placesResponse);
    } catch (error) {
      console.log(error);
    }
  };
  //console.log("testing");
  /* const setCoordinate = useCallback((cords) => {
    console.log(cords);
  }, []); */

  /* useEffect(() => {
    console.log(cords);
    return () => {
      setSearchResult(null);
    };
  }, [cords]); */

  return (
    <div className="searchLocation">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="searchtool">
          <input
            type="text"
            placeholder="Search place"
            name="location"
            ref={register}
          />
          <button type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
        {searchResult ? (
          <ul>
            {searchResult.map((place) => (
              <li
                key={place.id}
                onClick={() => {
                  props.setViewport({
                    width: "100vw",
                    height: "100vh",
                    latitude: place.geometry.coordinates[1],
                    longitude: place.geometry.coordinates[0],
                    zoom: 8.5,
                  });
                  setSearchResult(null);
                }}
              >
                <div>
                  {place.place_name.substr(0, 26)}
                  {place.place_name.length > 26 ? "..." : null}
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {/* <p>{searchResult ? searchResult[0].place_name : " "}</p> */}
      </form>
    </div>
  );
};

export default Search;
