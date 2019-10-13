# react-log-printer

A front-end for my websocket-tail websocket server, written in react.

## Setup

### Dependencies

- nodejs v10.x
- typescript (npm i -g typescript)
- yarn package manager
- websocket-tail server (<https://github.com/ExtraHash/websocket-tail)>

### Installation

Clone the repository:

```shell
git clone https://github.com/ExtraHash/react-log-printer
```

Change the directory into the repository you've cloned:

```shell
cd react-log-printer
```

Install the dependencies

```shell
yarn
```

Copy the example config file and fill it out with your own websocket host and port (the ones from your websocket-tail server you have running)

```shell
cp ./src/Constants/config-example.json ./src/Constants/config.json
nano ./src/Constants/config.json
```

You don't have to edit it in nano, you can use whatever text editor you'd prefer.

Finally, start the application:

```shell
yarn start
```

## Customization

You can customize the log output. Three methods of customization are currently available:

### Colors

You can color the log output based on a JSON file of values you provide, which is at `src/Constants/colorConfig.json`. Here's an example colorConfig.json:

```json
{
  "success": {
    "strings": ["TurtleCoin", "[checkpoints]", "added to main chain"],
    "class": "has-text-success has-text-weight-bold"
  },
  "danger": {
    "strings": ["ERROR"],
    "class": "has-text-danger has-text-weight-bold"
  },
  "primary": {
    "strings": ["Stop signal sent"],
    "class": "has-text-primary has-text-weight-bold"
  },
  "violet": {
    "strings": ["==="],
    "class": "has-text-violet has-text-weight-bold"
  }
}
```

You can name the values anything you'd like. If the log has contains any of the strings in the `strings` array, it will apply the CSS class of whatever is in the `class`.

Example: if my log output contains "TurtleCoin", a css class will be applied to the line of "has-text-success has-text-weight-bold".

### Removing substrings

Sometimes you might have substrings you want to completely remove from the log output. You can include an array of substrings at `src/Constants/substringsToRemove.json` and react-tail-printer will trim them out of the log. Here's an example:

```json
[
  "[protocol]",
  "[Core]",
  "[daemon]",
  "[node_server]",
  "[RocksDBWrapper]",
  "http://chat.turtlecoin.lol"
]
```

## Ignoring lines

Sometimes you may not want to display specific lines at all in the log output. You can add any strings to an array at `src/Constants/linesToIgnore.json` and if the log output contains any of the provided strings, it will not be displayed to the user. In this example, i'm removing some ASCII art by removing any lines that contain these specific characters:

```json
[
  "█",
  "═",
  "_",
  "|"
]
```


