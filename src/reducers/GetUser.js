user = {
  name: "Johanna",
  lname: "Smith",
  username: "johannasmith",
  quote: "Lorem ipsum dolor sit amet",
  slinks: [
    { name: "fb", url: "http://facebook.com" },
    { name: "twt", url: "http://facebook.com" },
    { name: "ln", url: null },
    { name: "inst", url: "http://facebook.com" }
  ],
  sex: "Female",
  country: "Kazakhstan",
  fdata: {
    weight: 65,
    mood: "Happy",
    hbeat: 78,
    todos: 8
  },
  todo: [
    {
      name: "Wash dishes",
      text: "Wash dishes in the kitchen",
      alarm: null
    },
    {
      name: "Wash dishes",
      text: "Wash dishes in the kitchen",
      alarm: "DATE OBJECT"
    }
  ],
  stat: {
    chart1: {
      name: "Bla bla",
      data: [5, 4, 55, 4, 55, 4, 565, 9, 5, 6, 6, 9, 8, 98, 48, 5]
    }
  }
};

export default () => user;
