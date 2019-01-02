import React from 'react';
import Header from '../shared/components/layout/Header';
import Content from '../shared/components/layout/Content';
import Footer from '../shared/components/layout/Footer';
import './App.css';
import aws_exports from '../aws-exports';
//import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth, API } from 'aws-amplify';

Amplify.configure(aws_exports);

class App extends React.Component {
  constructor(props/*, context*/) {
    super(props/*, context*/);
    this.state = {
      registered:false,
      approved:false,
      step1:false,
      step2:false,
      step3:false,
      email:'',
      firstName:'',
      middleName:'',
      surname:'',
      address:'',
      city:'',
      zipCode:'',
      regionState:'',
      occupation:'',
      countryCitizenship:'',
      countryResidence:'',
      dateBirth:'',
      accreditedInvestor: false,
      amount:'',
      activeStep:'0'
    }
  }
  

  getUser = async () => {
    const response = await API.get('kycApi', '/items/users/' + this.state.email);
    console.log(response)
    //if(response) console.log (JSON.stringify(response));

    this.setState({
      registered:response.registered,
      approved:response.approved,
      step1:response.step1,
      step2:response.step2,
      step3:response.step3,
      email:response.email,
      firstName:response.firstName,
      middleName:response.middleName,
      surname:response.surname,
      address:response.address,
      city:response.city,
      zipCode:response.zipCode,
      regionState:response.regionState,
      occupation:response.occupation,
      countryCitizenship:response.countryCitizenship,
      countryResidence:response.countryResidence,
      dateBirth:response.dateBirth,
      accreditedInvestor:response.accreditedInvestor,
      amount:response.amount,
      activeStep:response.activeStep
    })

    /*if(response.amount && response.amount !== this.state.amount) { //enough to say step2 done
      this.setState({    // we don't need to set all the state!!      
        step2:true,
        accreditedInvestor:response.accreditedInvestor,
        amount:response.amount,
      });
    }*/
  }
  

  render() {


    if( this.state.email === ''){
      
      Auth.currentAuthenticatedUser({
        bypassCache: false
      }).then(user => {
          this.setState({
            email: user.attributes.email
          });
        this.getUser();
      })
      .catch(err => console.log(err));
   
    } else {
      this.getUser();
    }

    if (this.props.authState === "signedIn") {
      return (
        
        <div className="App">
          <Header userState={this.state} />

          <Content children={this.props.children} userState={this.state} />
            
          <Footer  userState={this.state} />
        </div>
      );
    } else {
      return null;
    }
  }

}

//export default withAuthenticator (App);
export default App;
