import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ResourcesCardsView from './cardsView.jsx'

export default class App extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    console.log(urls.MAPS_API_URL)
    return (
      <MuiThemeProvider>
        <ResourcesCardsView
          title={'Maps'}
          resources_url={urls.MAPS_API_URL}
        />
      </MuiThemeProvider>
    )
  }
}

global.App = App;
global.React = React;
global.ReactDOM = ReactDOM;