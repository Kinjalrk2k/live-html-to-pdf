import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://live-html-to-pdf-backend.herokuapp.com"
      : "http://localhost:5000",
});
