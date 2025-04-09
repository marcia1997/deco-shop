import axios from "axios";

export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Base URL from your .env file
  headers: {
    "Content-Type": "application/json",
  },
});