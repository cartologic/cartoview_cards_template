import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles'
import {red, cyan} from 'material-ui/colors';

import ResourcesCardsView from './components/cardsView.jsx'

export default class MaterialComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        type: 'light',
        primary:{...cyan},
        error:{...red},
      }
    });
    return (
      <MuiThemeProvider theme={theme}>      
        <ResourcesCardsView {...this.props}/>
      </MuiThemeProvider>
    )
  }
}

global.MaterialComponent = MaterialComponent;
global.React = React;
global.ReactDOM = ReactDOM;