import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import config from '../Constants/config.json';
import substringsToRemove from '../Constants/substringsToRemove.json';
import userColors from '../Constants/colorConfig.json';
import linesToIgnore from '../Constants/linesToIgnore.json';

const colorConfig: { [key: string]: any } = userColors;
const colorValues = Object.keys(colorConfig);
const { websocketHost, websocketPort } = config;

const client = new W3CWebSocket(
  `ws://${websocketHost}:${websocketPort}`,
  'echo-protocol'
);

type Props = {};

type State = {
  logHistory: string[];
};

class Terminal extends Component {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      logHistory: []
    };
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('Connected to log file.');
    };
    client.onmessage = message => {
      const { logHistory } = this.state;
      logHistory.unshift(message.data);
      if (logHistory.length > 100) {
        logHistory.pop();
      }
      this.setState({
        logHistory
      });
    };
  }

  render() {
    const { logHistory } = this.state;

    return (
      <div className="terminal">
        {logHistory.map((line, index) => {
          // don't print empty messages
          if (line.trim() === '') {
            return null;
          }

          // ignore the line if it is in linesToIgnore.json
          let showLine: boolean = true;
          linesToIgnore.forEach((string: string) => {
            if (line.includes(string)) {
              console.log('nope nope nope!');
              showLine = false;
            }
          });
          if (!showLine) {
            return null;
          }

          // let's determine the log color based on colorConfig.json
          let logColor: string = '';
          colorValues.forEach((color: string) => {
            const { strings } = colorConfig[color];
            strings.forEach((string: string) => {
              if (line.includes(string)) {
                logColor = colorConfig[color].class;
              }
            });
          });

          // Trim substrings that are in the substringsToRemove.json file
          let logText: string = line;
          substringsToRemove.forEach(string => {
            logText = logText.replace(string, '');
          });

          // finally print the log message
          return (
            <span key={index} className={`is-family-monospace ${logColor}`}>
              {logText}
            </span>
          );
        })}
      </div>
    );
  }
}

export default Terminal;
