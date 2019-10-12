import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import config from '../Constants/config.json';

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
          return (
            <p key={index} className="logLine">
              {line}
            </p>
          );
        })}
      </div>
    );
  }
}

export default Terminal;
