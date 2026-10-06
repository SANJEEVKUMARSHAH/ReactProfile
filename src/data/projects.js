// Project data. ProjectCard and ProjectDetails both read from this array.
// Every field after `featured` is optional: a section only shows if the field has content.
// Put screenshots in /public/images/ and point `image` at them.

export const projects = [
  {
    id: "agrolink",
    title: "IoT Based Advanced Farming",
    description:
      "An ESP32-based smart farming system that monitors soil and environmental conditions with sensors and offers monitoring and control through a web dashboard.",
    image: "/images/smart-farming.png",
    technologies: ["ESP32", "C++", "IoT", "Node.js", "MySQL", "JavaScript"],
    github: "https://github.com/SANJEEVKUMARSHAH/iot-smart-farming-esp32",
    demo: null, // no live demo yet, so no button is shown
    featured: true,

    overview:
      "A smart farming setup built around an ESP32 that reads live conditions from a field and lets someone monitor and control it remotely from a web dashboard.",
    problem:
      "Checking on a field normally means being there. I wanted to see how hardware and software fit together in a real system that could read live conditions and let someone monitor and control a field remotely.",
    solution:
      "An ESP32 reads soil and environmental sensors and sends the data to a small backend. Readings are stored in a database and shown on a web dashboard, which can also control a relay-driven pump.",
    hardware: ["ESP32", "Soil and environmental sensors", "Relay and pump"],
    software: [
      "ESP32 firmware written in C++",
      "Node.js backend",
      "MySQL database for readings",
      "JavaScript web dashboard",
    ],
    // TODO: describe exactly which parts you built yourself, since the project was done with a team.
    contribution:
      "I learned to program and wire an ESP32, read data from sensors, connect hardware to a web dashboard, build a small backend, and store readings in a database.",
    challenges: [
      "Getting stable sensor readings",
      "Controlling the relay and pump correctly",
      "Debugging issues that only appeared when the hardware and dashboard ran together",
    ],
    futureImprovements: [], // TODO: add your own ideas, the section appears automatically
  },
  {
    id: "weather-app",
    title: "Weather App",
    description:
      "A React weather app where you search for a city and see its current weather from the OpenWeather API.",
    image: "/images/weather-app.png",
    technologies: ["React", "Vite", "JavaScript", "Material UI", "OpenWeather API"],
    github: null, // TODO: add the repository link
    demo: null, // TODO: add the live link if it is deployed
    featured: false,

    overview:
      "A weather app built to practise React: a search box for a city and an info card that shows the current weather.",
    software: [
      "React with Vite",
      "Material UI components",
      "OpenWeather API for weather data",
      "SearchBox, InfoBox and WeatherApp components",
    ],
  },
];
