const user = {
  name: "Alex",
  age: 28,
  skills: ["JavaScript", "HTML", "CSS"]
};

// 2. Convert it into a JSON string
const jsonString = JSON.stringify(user);
const ayam = JSON.parse(jsonString);
console.log(ayam.name);
