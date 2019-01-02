import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
//import axios from 'axios';
//import './FileUpload.css'
import { Auth, API } from 'aws-amplify';
//import Amplify, { Auth, Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import Background from '../../shared/images/bg_kyc/14122018-03.JPG';



const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${Background})`,
    marginTop: -150,
  },
  card: {
    marginTop: 175,
    marginBottom: 40,
    minWidth: 275,
    //minHeight: 650,
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
  tableHome: {
    width: '100%',
    height: '100%',
    marginBottom: 50,
  },
  tdImage: {
    width: '50%',
    padding: 5,
  },
  tdText: {
    width: '50%',
    padding: 10,
    textAlign: 'center',
    verticalAlign: 'center',
  },
  imageThanks: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 25,
    color: 'rgb(0,0,256,0.9)',
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    color: 'rgb(0,0,256,0.54)',
  },
});

class Dashboard extends Component {

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
    step1: '',

    url: '/register',
    label: 'Register',

    open: false,
    buttonIsHovered: false,
  };

  
  getUser = async () => {
    const response = await API.get('preKYCapi', '/items/object/' + this.state.email);
    console.log (JSON.stringify(response));

    if(response.step1 === true && response.email !== '') {}
    else window.location.href= '/';

    /*this.state.email = response.email;
    this.state.firstName = response.firstName;
    this.state.middleName = response.middleName;
    this.state.surname = response.surname;
    this.state.amount = response.amount;
    this.state.occupation = response.occupation;
    this.state.phone = response.phone;
    this.state.country = response.country;*/
  } 

  

  render() {

    const { classes } = this.props;
    
    Auth.currentAuthenticatedUser({
      bypassCache: false  
    }).then(user => {
      
      if(this.state.email !== user.attributes.email)
        this.setState({
          email: user.attributes.email
        });
      this.getUser();
    })
    .catch(err => console.log(err));

    return (
      <div className={classes.root}>
      <Grid container spacing={24}>
      <Grid item xs></Grid>
      <Grid item xs={6}>
      <Card className={classes.card}>
        <CardContent>
          
          
          <table className={classes.tableHome}>
            <tr>
              <td className={classes.tdImage}>
                <CardMedia
                  className={classes.imageThanks}
                  component='img' 
                  image={require("../../shared/images/18122018-thanks_page02.JPG")} 
                  title="Look Lateral KYC"
                />
              </td>
              <td className={classes.tdText}>
                <Typography className={classes.title} gutterBottom>
                THANK YOU FOR YOUR APPLICATION
                </Typography>
                
                <Typography className={classes.text} gutterBottom>
                We will review your information as soon as possible and we will let you know if you are qualified to proceed to the second step of the KYC.
                </Typography>
              </td>
            </tr>
          </table>

        </CardContent>
      </Card>
      </Grid>
      <Grid item xs></Grid>
      </Grid>
      </div>
    );

    
  }
}

export default withStyles(styles)(Dashboard);
