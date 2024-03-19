import axios from "axios";

const notificationsServiceAPI = "http://192.168.1.17:8080/notifications/";

const sendNotifications = async (notifications) => {
  try {
    console.log("Sending notifications:", notifications);
    const response = await axios.post(
      notificationsServiceAPI + "send-notifications",
      notifications
    );
    return response.data;
  } catch (error) {
    console.error("Error sending notifications:", error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
      console.error("Error data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error("No response was received", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    console.error("Config:", error.config);
  }
};

export { sendNotifications };
