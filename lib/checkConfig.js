const chalk = require("chalk");
const { store } = require("../config/config");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const saveConfig = (apiKey) => {
  console.log("\nConfiguring...");
  store.set("apiKey", apiKey);
  console.log(
    chalk.green("Your configuration is done! You can now use the CLI")
  );
  process.exit(0);
};

const checkConfig = () => {
  const apiKey = store.get("apiKey");

  if (apiKey) {
    console.log(chalk.green("\nAPI key setup is already done!\n"));
    console.log(
      `Run ${chalk.cyan(
        "dalale setup --info"
      )} to see your current configuration\n`
    );
    process.exit(0);
  }
};

const replaceConfig = () => {
  console.log(
    `You can change your API key here: ${chalk.cyan("https://openai.com/api/")}`
  );

  readline.question("\nAPI key: ", (apiKey) => {
    saveConfig(apiKey);
    readline.close();
  });
};

const setNewConfig = () => {
  checkConfig();

  console.log(
    "Hi, to use this app you need to create a DALL-E 2 App and get your API key."
  );
  console.log(
    `You can create an app here: ${chalk.cyan("https://openai.com/api/")}`
  );
  console.log("Then, enter your API key below.");

  readline.question("\nAPI key: ", (apiKey) => {
    saveConfig(apiKey);
    readline.close();
  });
};

const showConfig = () => {
  const apiKey = store.get("apiKey");

  if (!apiKey) {
    console.log(chalk.red("\nAPI key setup is not done yet!\n"));
    console.log(`Run ${chalk.cyan("dalale setup")} to setup your API key\n`);
    process.exit(0);
  }

  console.log(`\nYour API key is: ${chalk.cyan(apiKey)} \n`);
  process.exit(0);
};

module.exports = {
  checkConfig,
  saveConfig,
  replaceConfig,
  setNewConfig,
  showConfig,
};
