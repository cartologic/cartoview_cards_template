import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ResourcesCardsView from './cardsView.jsx'

export default class App extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <ResourcesCardsView
          title={'Layers'}
          resources_url={urls.LAYERS_API_URL}
        />
      </MuiThemeProvider>
    )
  }
}

global.App = App;
global.React = React;
global.ReactDOM = ReactDOM;