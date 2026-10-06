// Levels use the same words as my existing portfolio. No percentage bars.
// IMPORTANT: edit these so they stay honest. Items marked "added" were not on the
// old site, so I picked cautious levels for you. Change them if they're wrong.

export const levels = {
  Comfortable: "I use it regularly and can build with it on my own.",
  Practicing: "I'm using it in projects and getting better.",
  Learning: "I've started and am working through the fundamentals.",
  Exploring: "I'm looking into it and trying small things.",
};

export const skillCategories = [
  {
    title: "Programming",
    items: [
      { name: "C", level: "Comfortable" },
      { name: "C++", level: "Comfortable" },
      { name: "Python", level: "Exploring" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "HTML", level: "Comfortable" },
      { name: "CSS", level: "Comfortable" },
      { name: "JavaScript", level: "Practicing" },
      { name: "React", level: "Learning" }, // added
      { name: "Tailwind CSS", level: "Learning" }, // added
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", level: "Learning" },
      { name: "Express", level: "Learning" }, // added
    ],
  },
  {
    title: "Database",
    items: [
      { name: "SQL", level: "Practicing" },
      { name: "MySQL", level: "Practicing" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", level: "Comfortable" },
      { name: "GitHub", level: "Comfortable" },
      { name: "VS Code", level: "Comfortable" },
      { name: "Hoppscotch", level: "Learning" }, // added
    ],
  },
  {
    title: "IoT / Robotics",
    items: [
      { name: "ESP32", level: "Practicing" },
      { name: "Sensors", level: "Practicing" },
      { name: "Embedded Systems", level: "Learning" },
      { name: "Arduino", level: "Learning" }, // added
      { name: "Blynk", level: "Exploring" }, // added
    ],
  },
  {
    title: "Exploring",
    items: [
      { name: "Artificial Intelligence", level: "Exploring" },
      { name: "Machine Learning", level: "Exploring" },
      { name: "Data Structures & Algorithms", level: "Exploring" },
    ],
  },
];
