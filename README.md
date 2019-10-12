# react-log-printer

A front-end for my websocket-tail websocket server, written in react.

## Dependencies

- nodejs v10.x
- typescript (npm i -g typescript)
- yarn package manager
- websocket-tail server (<https://github.com/ExtraHash/websocket-tail)>

## Setup

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
