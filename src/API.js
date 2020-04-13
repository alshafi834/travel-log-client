import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}

export async function createTravelEntry(entry) {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return response.json();
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios.post(
    `${API_URL}/api/logs/image-upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(response);
  return response.data;
}
