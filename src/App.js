import React from 'react';
import { Switch } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Visualisation from './Visualisation';
import Empty from './Empty';
import registerFontAwesomeIcons from './registerFontAwesomeIcons';
import { PropsRoute } from './utils/PropsRoute';
import './App.css'

// Register the FontAwesome Icons
registerFontAwesomeIcons();

const App = props => {
  return (
    <>
      <div className="App">
        <Header />
        <main className="App-content">
          <Switch>
            <PropsRoute
              exact
              path="/visualisation"              
              component={Visualisation}
              albumId={13}
            />
            <PropsRoute
              path="/"
              component={Empty}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App;