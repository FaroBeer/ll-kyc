// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import Home from './components/Home';
import Error404 from './components/Error/404';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Authenticator, Greetings, SignIn, ConfirmSignIn, RequireNewPassword, SignUp, ConfirmSignUp, VerifyContact, ForgotPassword, TOTPSetup } from 'aws-amplify-react';

import { AmplifyTheme } from 'aws-amplify-react';
import Background from './shared/images/bg_kyc/14122018-01.JPG';


console.log(AmplifyTheme);

const MyFormSection = Object.assign({}, AmplifyTheme.formSection, {marginTop: 50, marginBottom: 50,})
const MySectionContainer = Object.assign({}, AmplifyTheme.sectionContainer, {padding: 0})
const MyFormContainer = Object.assign({}, AmplifyTheme.formContainer, {
          background: `url(${Background})`,
          minHeight: document.documentElement.clientHeight,
          width: document.documentElement.clientWidth,
          margin: 0,
})
const MyTheme = Object.assign( {}, AmplifyTheme, { 
          formSection: MyFormSection,
          sectionContainer: MySectionContainer,
          formContainer: MyFormContainer
});

const AppRoutes = () => (
  <Authenticator theme={MyTheme} hideDefault={true}>
    <SignIn/>
    <ConfirmSignIn/>
    <RequireNewPassword/>
    <SignUp/>
    <ConfirmSignUp/>
    <VerifyContact/>
    <ForgotPassword/>
    <TOTPSetup/>
    
    <App>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route component={Error404} />
      </Switch>
    </App>
  </Authenticator>
);

export default AppRoutes;
