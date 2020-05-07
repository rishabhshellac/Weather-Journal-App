const url =
  "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "4a95ab35efb0d22c0fa8c5ce3d8fc61f";

let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const getTheData = async (url = "") => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
};

const updateData = async () => {
  const projectData = await getTheData("/data");
  document.getElementById("date").innerHTML = `${projectData.date}`;
  document.getElementById(
    "temp"
  ).innerHTML = `${projectData.temperature} &#8457`;
  document.getElementById("content").innerHTML = projectData.feelings;
};

const generateData = async () => {
  const feelings = document.getElementById("feelings").value;
  const zip = document.getElementById("zip").value;
  const response = await fetch(`${url}${zip}&appid=${apiKey}`);
  try {
    const data = await response.json();
    data.feelings = feelings;
    data.date = newDate;
    await postData("/", data);
    updateData();
  } catch (error) {
    console.error("error", error);
  }
};

document.getElementById("generate").addEventListener("click", generateData);
