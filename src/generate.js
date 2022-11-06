const { Configuration, OpenAIApi } = require("openai");

const fs = require("fs");
const chalk = require("chalk");

// read config/config.json
const { apiKey } = JSON.parse(
  fs.readFileSync("./config/config.json").toString()
);

const config = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(config);

const generate = async (
  prompt = "An elephant in space",
  numberOfImage = 1,
  size = "1000x1000"
) => {
  const result = await openai.createImage({
    prompt,
    size,
    n: numberOfImage,
  });

  if (result.data.data.length === 1) {
    saveImageFromUrl(result.data.data[0].url);
  } else {
    result.data.data.forEach((image) => {
      saveImageFromUrl(image.url);
    });
  }
};

const saveImageFromUrl = async (uri) => {
  request.head(uri, function (err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", () => {
        console.log(chalk.green("\nImage saved successfully\n"));
      });
  });
};

// export
module.exports = { generate };
