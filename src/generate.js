const { Configuration, OpenAIApi } = require("openai");

const fs = require("fs");
const chalk = require("chalk");
const request = require("request");

// read config/config.json
const apiKey = "";

try {
  JSON.parse(fs.readFileSync("./config/config.json").toString());
} catch (error) {}

const config = new Configuration({
  apiKey,
});

// const openai = new OpenAIApi(config);

const generate = async (
  prompt = "An elephant in space",
  numberOfImage = 1,
  size = "1024x1024"
) => {
  openai
    .createImage({
      prompt,
      size,
      n: numberOfImage,
    })
    .then((res) => {
      if (result.data.data.length === 1) {
        saveImageFromUrl(result.data.data[0].url);
      } else {
        result.data.data.forEach((image) => {
          saveImageFromUrl(image.url);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const saveImageFromUrl = async (uri) => {
  console.log(uri);

  request.head(uri, function (err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    request(uri)
      .pipe(fs.createWriteStream(Date.now() + ".png"))
      .on("close", () => {
        console.log(chalk.green("\nImage saved successfully\n"));
      });
  });
};

// export
module.exports = { generate };
