import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createMuiTheme} from 'material-ui/styles'

import ResourcesCardsView from './components/cardsView.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        type: 'light'
      }
    });
    return (
      <MuiThemeProvider theme={theme}>      
        <ResourcesCardsView title={'Maps'} resources_url={urls.MAPS_API_URL}/>
      </MuiThemeProvider>
    )
  }
}

global.App = App;
global.React = React;
global.ReactDOM = ReactDOM;