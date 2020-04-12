import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createTravelEntry } from "../API";

const LogEntryForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      data.latitude = props.coordinates.latitude;
      data.longitude = props.coordinates.longitude;
      const response = await createTravelEntry(data);
      props.onFormClose();
      console.log(response);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3 className="errormsg">{error.message}</h3> : null}
      <label htmlFor="title">Place Name: </label>
      <input name="title" type="text" required ref={register} />
      <label htmlFor="description">Description: </label>
      <textarea
        name="description"
        id=""
        cols="2"
        rows="3"
        ref={register}
      ></textarea>
      <label htmlFor="comments">Comment: </label>
      <textarea
        name="comments"
        id=""
        cols="2"
        rows="3"
        ref={register}
      ></textarea>
      <label htmlFor="visitDate">Visit Date: </label>
      <input name="visitDate" type="date" required ref={register} />
      <label htmlFor="image">Image: </label>
      <input
        name="image"
        type="text"
        ref={register}
        placeholder="Pase an image URL"
      />
      <label htmlFor="rating">Rating: </label>
      <input name="rating" type="range" min="0" max="10" ref={register} />
      <button disabled={loading} type="submit">
        {loading ? "Creating..." : "Create Travel Log"}
      </button>
    </form>
  );
};

export default LogEntryForm;
