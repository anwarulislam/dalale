const { Configuration, OpenAIApi } = require("openai");

const fs = require("fs");
const chalk = require("chalk");
const request = require("request");
const { store } = require("../config/config");

// read config/config.json
let apiKey = "";

try {
  apiKey = store.get("apiKey");
} catch (error) {
  console.log(error);
  console.log(
    chalk.red(
      "Please run 'dalale setup' to set up your API key. You can get your API key from https://openai.com/\n"
    )
  );
  process.exit(0);
}

const config = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(config);

const SIZES = [256, 512, 1024];

const generate = async (
  prompt = "An elephant in space",
  options = {
    height: 1024,
    width: 1024,
    number: 1,
  }
) => {
  const { height, width, number } = options;

  let size = "1024x1024";

  // check if height and width are valid integer and in the range of 256, 512, 1024
  if (
    !Number.isInteger(+height) ||
    !Number.isInteger(+width) ||
    !SIZES.includes(+height) ||
    !SIZES.includes(+width)
  ) {
    console.log(
      chalk.yellow(
        `\nWarning: Height and width must be an integer and in the range of ${SIZES.join(
          ", "
        )}\n`
      )
    );
    // continue with default size
    console.log(chalk.yellow(`Using default size: ${size}\n`));
  } else {
    size = `${height}x${width}`;
  }

  console.log(chalk.green("\nGenerating image...\n"));
  console.log(`It will take a while, please wait...\n`);

  openai
    .createImage({
      prompt,
      size,
      n: Number.isInteger(+number) ? +number : 1,
    })
    .then((result) => {
      if (result.data.data.length === 1) {
        saveImageFromUrl(result.data.data[0].url);
      } else {
        result.data.data.forEach((image) => {
          saveImageFromUrl(image.url);
        });
      }
    })
    .catch((err) => {
      // your API key is invalid
      console.log(chalk.red("\nUnfortunately image is not generated\n"));
      console.log(
        chalk.red(
          "Please check your API key. It might be invalid. You can reset your API by running 'dalale setup --reset'\n"
        )
      );
      process.exit(0);
    });
};

const saveImageFromUrl = async (uri) => {
  console.log(chalk.bold(`\nImage is successfully generated!`));

  console.log("\nOnline URL: " + chalk.cyan(`${uri}\n`));

  console.log(`Downloading image...\n`);

  request.head(uri, function (err, res, body) {
    // current directory from where the script is run
    const dir = process.cwd();

    // Variable to save downloading progress
    var received_bytes = 0;
    var total_bytes = 0;

    request(uri)
      .on("error", function (err) {
        console.log(chalk.red("\nUnfortunately stopped...\n"));
        process.exit(0);
      })
      .on("response", function (data) {
        total_bytes = parseInt(data.headers["content-length"]);
      })
      .on("data", function (chunk) {
        received_bytes += chunk.length;
        showDownloadingProgress(received_bytes, total_bytes);
      })
      .on("close", () => {
        const imagePath = `file:/${dir}/${Date.now()}.png`;

        console.log("\n\nLocal Path: " + chalk.cyan(imagePath));

        console.log(chalk.green("\nImage saved successfully\n"));
        process.exit(0);
      })
      .pipe(fs.createWriteStream(`${dir}/${Date.now()}.png`));
  });
};

function showDownloadingProgress(received, total) {
  var platform = "win32"; // Form windows system use win32 for else leave it empty
  var percentage = ((received * 100) / total).toFixed(2);
  process.stdout.write(platform == "win32" ? "\033[0G" : "\r");
  process.stdout.write(
    percentage +
      "% | " +
      received +
      " bytes downloaded out of " +
      total +
      " bytes."
  );
}

// export
module.exports = { generate, saveImageFromUrl };
