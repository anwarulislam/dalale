#!/usr/bin/env node

const chalk = require("chalk");
const program = require("commander");
const minimist = require("minimist");
const {
  saveConfig,
  setNewConfig,
  replaceConfig,
  showConfig,
} = require("../lib/checkConfig");

program
  .command("generate <describe>")
  .description("Write down your imagination and hit enter")
  .option(
    "-h, --height <height>",
    "Set the height of the image in px [256, 512, 1024] (default: 1024)"
  )
  .option(
    "-w, --width <width>",
    "Set the width of the image in px [256, 512, 1024] (default: 1024)"
  )
  .option(
    "-n, --number <number>",
    "Set the number of images to generate (default: 1). Max: 4 at a time"
  )
  .action((value, options) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "\n Info: You provided more than one argument. The first one will be used as the image description, the rest are ignored."
        )
      );
    }

    const { generate } = require("./../src/generate");

    generate(value, options);
  });

program
  .command("setup")
  .description("Setup your DALL-E 2 API key")
  .option("-k, --key <keyString>", "Set your API key")
  .option("-r, --reset", "Enter your API key")
  .option("-i, --info", "Show current configuration")
  .action((options) => {
    if (Object.keys(options).length === 0) {
      setNewConfig();
    }
    if (options.reset) {
      replaceConfig();
    } else if (options.key) {
      saveConfig(options.key);
    } else if (options.info) {
      showConfig();
    }
  });

// add some useful info on help
program.on("--help", () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(
      `dalale <command> --help`
    )} for detailed usage of given command.`
  );
  console.log();
});

program.commands.forEach((c) => c.on("--help", () => console.log()));

program.parse(process.argv);
