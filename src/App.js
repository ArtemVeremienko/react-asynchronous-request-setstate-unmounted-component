import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNews: true,
    };
  }

  onToggle = () => {
    this.setState(state => ({ showNews: !state.showNews }));
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.onToggle}>
          Toggle
        </button>

        {this.state.showNews && <News />}
      </div>
    );
  }
}

class News extends Component {
  _isMounted = false;
  // throttle time
  ms = 2000;

  constructor(props) {
    super(props);

    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;

    axios
      .get('https://hn.algolia.com/api/v1/search?query=react')
      .then(response => new Promise(res => setTimeout(() => res(response), this.ms)))
      .then(result => {
        if (this._isMounted) {
          this.setState({
            news: result.data.hits,
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <ul>
        {this.state.news.map(topic => (
          <li key={topic.objectID}>{topic.title}</li>
        ))}
      </ul>
    );
  }
}

export default App;
