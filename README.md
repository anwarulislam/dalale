<p align="center">
  <a href="https://openai.com"><img src="https://i.ytimg.com/vi/lbUluHiqwoA/maxresdefault.jpg" alt="DALL-E 2 API"></a>
</p>

# Dalal-E (dalale)

Dalal-E is a CLI application to generate realistic image using DALL-E 2 AI image generator API

[![NPM version](https://badge.fury.io/js/dalale.svg)](https://npmjs.org/package/dalale)

# Installation

By using [npm](http://npmjs.org) (the recommended way):

```bash
npm install -g dalale # or using yarn: yarn global add dalale
```

And dalale will be installed globally to your system path.

If you are having any issues with installing by running above command try to give sudo permission to the command:

```bash
sudo npm install -g dalale # or using yarn: sudo yarn global add dalale
```

You can use dalale directly without running installation script by running:
`npx dalale generate "elephant is dancing with chicken"`.

## Setup Dalal-E

To setup Dalal-E just run the command `dalale setup`. It will prompt you to enter your DALL-E 2 API. It will remember the API key for further use. eg: The key is being stored locally in your machine. You can reset the key as well.

The specificity is as follows:

- `dalale setup --key AKSFOIE452312SKDFJ` to set API key directly.
- `dalale setup --reset` to reset/replace the current API key.
- `dalale setup --info` to get the current API key.

# Usage

dalale accepts arguments to set options for the image you want to generate:

```bash
dalale generate "here is your imagination"
```

For CLI options, use the `-h` (or `--help`) argument:

```bash
dalale -h
```

You can pass height, width and the number of images you want to generate as arguments.

```bash
dalale generate "here is your imagination" -h 512 -w 512 -n 2
```

## Issues

See the [Issues](https://github.com/anwarulislam/dalale/issues) and please add your own issue or feature request if you think they would help others.
