import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
//import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Filter1 from '@material-ui/icons/Filter1'
//import axios from 'axios';
import  { Auth, API } from 'aws-amplify';
//import Amplify, { Auth, Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import {  FormControlLabel } from "@material-ui/core";
//import { FormControl, InputLabel, FormControlLabel } from "@material-ui/core";
import Background from '../../shared/images/bg_kyc/14122018-02.JPG';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    marginTop: -150,
  },
  input: {
    display: 'none',
  },
  card: {
    marginTop: 175,
    marginBottom: 40,
    minWidth: 275,
    minHeight: 650,
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  dense: {
    marginTop: 19
  },
  selectOp: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class TextFields extends Component {

  state = {
    email:'',
    firstName:'',
    middleName:'',
    surname:'',
    address:'',
    city:'',
    zipCode:'',
    regionState:'',  
    countryCitizenship:'',
    countryResidence:'',
    dateBirth:'',
    occupation:'',
    amount:'',
    accreditedInvestor:'',
  };

  _handleSubmit(e) {
    e.preventDefault();
    this.post();
    console.log('posting');
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  post = async () => {
    console.log('calling api');

    if(this.state.amount==='' || this.state.accreditedInvestor===''){
          alert('Please complete all required fields'); 
          return false;
  
    } else {

      let middleName = this.state.middleName !== '' ? this.state.middleName : null;
      const response = await API.post('preKYCapi', '/items', {
        body: {         //passing all state vars because it's a post not an update  
          email:this.state.email,
          step1:true,
          firstName:this.state.firstName,
          middleName:middleName,
          surname:this.state.surname,          
          address:this.state.address,
          city:this.state.city,
          zipCode:this.state.zipCode,
          regionState:this.state.regionState,
          countryCitizenship:this.state.countryCitizenship,
          countryResidence:this.state.countryResidence,
          dateBirth:this.state.dateBirth,
          occupation:this.state.occupation,         
          step2:true,
          amount:this.state.amount,
          accreditedInvestor:this.state.accreditedInvestor,
          registered:true,
        }
      });
      //if(response) console.log(response);
      window.location.href='/';
  }
}

  getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
    console.log (JSON.stringify(response));
    //if(response.step2 === true && response.amount !=='') window.location.href='/';
    
    this.setState({   
      step1:true,
      firstName:response.firstName,
      middleName:response.middleName,
      surname:response.surname,
      address:response.address,
      city:response.city,
      zipCode:response.zipCode,
      regionState:response.regionState,
      countryCitizenship:response.countryCitizenship,
      countryResidence:response.countryResidence,
      dateBirth:response.dateBirth,
      occupation:response.occupation,      
    });

     
  } 

  render() {

  Auth.currentAuthenticatedUser({
      bypassCache: false 
  }).then(user => {
    this.setState({
      email: user.attributes.email
    });
    //this.getUser().bind(this);
  })
  .catch(err => console.log(err));
  
  const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardContent>
                <Filter1 /><h2>Personal Details</h2>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                 
                  <RadioGroup
                    aria-label="accre"
                    name="accreditedInvestor"
                    placeholder="Are you an accredited investor (under US law parameters *) ?"
                    className={classes.group}
                    value={this.state.accreditedInvestor}
                    onChange={this.handleChange("accreditedInvestor")}
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>

                  <RadioGroup
                    aria-label="accre"
                    name="amount"
                    placeholder="Please select the size of potential investment you are considering for Look Lateral STO:"
                    className={classes.group}
                    value={this.state.amount}
                    onChange={this.handleChange("amount")}
                  >
                    <FormControlLabel value="less than 5,000 usd" control={<Radio />} label="less than 5,000 usd" />
                    <FormControlLabel value="5,000 - 49,999 usd" control={<Radio />} label="5,000 - 49,999 usd" />
                    <FormControlLabel value="50,000 - 199,999 usd" control={<Radio />} label="50,000 - 199,999 usd" />
                    <FormControlLabel value="200,000 - 499,999 usd" control={<Radio />} label="200,000 - 499,999 usd" />
                    <FormControlLabel value="more than 500,000 usd" control={<Radio />} label="more than 500,000 usd" />
                  </RadioGroup>

                </form>
                <Button className="submitButton" 
                  variant="contained"
                  component="span"
                  onClick={(e)=>this._handleSubmit(e)}>
                  SUBMIT
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);