import React from 'react';
import { element } from 'prop-types';
import Header from '../shared/components/layout/Header';
import Content from '../shared/components/layout/Content';
import Footer from '../shared/components/layout/Footer';
import './App.css';
import aws_exports from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';

Amplify.configure(aws_exports);

const App = props => (
  <div className="App">
    <Header />
    {console.log(props)}
    <Content>
      {props.children}
    </Content>

    <Footer />
  </div>
);



App.propTypes = {
  children: element
};

export default withAuthenticator (App, true)