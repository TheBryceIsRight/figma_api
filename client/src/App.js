import React, { Component } from 'react'
import './styles/App.css'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { trackPromise } from 'react-promise-tracker';
import BackToTop from './components/BackToTop';
import Status from './components/Status';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';

// var imgStyle = {
//   maxWidth: '100%',
// }

// var rectStyle = {
//   width: '200px',
//   height: '200px'}

const containerHuge = {
  maxWidth: '80rem',
  padding: '0 1rem',
  margin: '0 auto 6rem'
};


class App extends Component {
  state = { 
    images: [
      { name: '', url:''  }
    ],
    value: 'Does this even work?',
    copied: false,
    open: false,
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

 componentDidMount() {
  trackPromise(fetch('/frames')
      .then(res => res.json())
      .then(data => this.setState({ images: data }))
      .catch(error => console.log(error)));
  }

  render() {
    return (
      <React.Fragment>
      <Status/>
      <AppBar position="static" elevation={0} color={'transparent'}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Figma Automation
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={containerHuge}>
      <Grid container spacing={7} direction='column' alignItems='center' justify='space-between'>
        <Grid item>
        <BackToTop/>
        </Grid>
        {/* <Grid item>
        <Typography variant='h3' id="Images">Images</Typography>
        { this.state.images.map(
            (frame,i) =>
            <Grid container spacing={2} direction='column'>
            <Grid item >
            <Typography variant='h5' id={frame.name}>{frame.name}</Typography>
            </Grid>
            <Grid item key={i}>
            <img src={frame.url} style={imgStyle} alt={frame.name}/>
            </Grid>
            <br/>
            </Grid>
          )}
        </Grid> */}
        
        <Grid item>
        { this.state.images.map(
            (frame,i) =>
            <Grid container spacing={2} direction='column'>
            <Grid item >
            <Typography variant='h5' id={frame.name}>{frame.name}</Typography>
            </Grid>
            <Grid item key={i}>
            <CopyToClipboard text={frame.name}
              onCopy={() => this.setState({copied: true, open: true, value: frame.name})}>
              <Button style={{
                minWidth: '200px',
                minHeight: '200px', 
                backgroundColor: frame.name,
              }} alt={frame.name}/>
            </CopyToClipboard>
            {/* <Button style={{
                minWidth: '200px',
                minHeight: '200px', 
                backgroundColor: frame.name,
              }} alt={frame.name} ripple/> */}
            </Grid>
            <br/>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <Alert onClose={this.handleClose} severity="success">
            Copied {this.state.value}!
        </Alert>
      </Snackbar>
      </div>
      </React.Fragment>
    )
  }
}

export default App;
