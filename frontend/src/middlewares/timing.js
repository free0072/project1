exports.useTime = async (data) => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date = new Date(data);
  const hours = date.getHours().toString().padStart(2, "0"); // Get hours and ensure 2-digit format
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and ensure 2-digit format
  return [`${hours}:${minutes}`, date.toLocaleDateString("en-US", options)];
};
