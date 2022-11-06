#!/usr/bin/env node

const chalk = require("chalk");
const fs = require("fs");
const { generate } = require("./../src/generate");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function checkConfig(isNew = true) {
  // if config file exists, return true

  const isConfigExists = fs.existsSync("./config/config.json");

  if (isConfigExists && !isNew) {
    console.log(chalk.green("Setup is already done!\n"));
    console.log("Run dalale info to see your current configuration\n");
    process.exit(0);
  }

  if (isNew) {
    console.log(
      "Hi, to use this app you need to create a DALL-E 2 App and get your API key."
    );
    console.log("You can create an app here: https://openai.com/blog/dall-e/");
    console.log("Then, enter your API key below.");
  } else {
    // change your API key
    console.log(
      "You can change your API key here: https://openai.com/blog/dall-e/"
    );
  }

  readline.question("\nAPI key: ", (apiKey) => {
    // create config file
    console.log("\nConfiguring...");
    fs.writeFileSync("./config/config.json", JSON.stringify({ apiKey }));
    console.log(
      chalk.green("Your configuration is done! You can now use the CLI")
    );
    readline.close();
  });
}

// check if the command is "dalale setup" if yes then run checkConfig()

if (process.argv[2] === "setup") {
  checkConfig();

  // if option -r then run checkConfig(false)

  if (process.argv[3] === "-r") {
    checkConfig(false);
  }
} else {
  generate(process.argv[2]);
}
