const Conf = require("conf");

const schema = {
  apiKey: {
    type: "string",
  },
};

const store = new Conf({ schema });

module.exports = { store };
