import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../images/Logo-Look-Lateral.png';
import { Auth } from 'aws-amplify';
//import Amplify, { Auth, Analytics, Storage, API, graphqlOperation } from 'aws-amplify';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  AppHeader: {
    height: 150,
    backgroundColor: '#282c34',
    opacity: 0.9,
    padding: 50,
  },

  linkLogo: {
    width:'70vw',
    paddingLeft: '15vw'
  },
  divlogo: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logo: {
    maxWidth: 530,
    maxHeight: 150,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  /*  registerButton: {
    textDecoration: 'none',
    position: 'relative',
    right: 20
  }, 
  register: {
    color: '#fff',
    fontSize: 15,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 4,
    border: 2,
  },*/
  signout: {
    color: '#fff',
    fontSize: 14,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 4,
    border: 2,
    //marginLeft: 15,
    position: 'relative',
    right: -20,
    whiteSpace: 'nowrap'
  },

};

function signOut(){
  console.log(Auth);
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  window.location.reload();
}

function NavBar(props) {
  
  const { classes } = props;
  //let url = '/register'; let label = 'Register';

  

/*  if(props.userState.step1 === false) {
     url = '/register'; label = 'Register';
  //} else if(props.userState.step1 === true && props.userState.step2 === false) {
  //  url = '/investor'; label = 'Register'; 
  } else {
    url = '/dashboard'; label = 'Dashboard';
  }*/
  
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppHeader}>
        <Toolbar>
          
          <a href="https://www.looklateral.com/" className={classes.linkLogo}>
          <div className={classes.divlogo}>
            <img src={Logo} className={classes.logo}></img> 
          </div>
          </a>
          <Button className={classes.signout} onClick={signOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);