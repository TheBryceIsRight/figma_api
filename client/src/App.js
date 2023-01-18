import React, { Component } from 'react'
import './App.css'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TableOfContents from './TableOfContents';
import Skeleton from '@material-ui/lab/Skeleton';
import { trackPromise } from 'react-promise-tracker';
import BackToTop from './BackToTop';
import Status from './Status';


var imgStyle = {
  maxWidth: '100%',
}

const containerHuge = {
  maxWidth: '80rem',
  padding: '0 1rem',
  margin: '0 auto 6rem'
};


class App extends Component {
  state = { images: [
    { name: '', url:''  }
  ]
}



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
      <AppBar position="static">
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
        <Grid item>
        { this.state.images.map(
            (frame,i) =>
            <Grid container spacing={2} direction='column'>
            <Grid item >
            <Typography variant='h3' id={frame.name}>{frame.name}</Typography>
            </Grid>
            <Grid item key={i}>
            <img src={frame.url} style={imgStyle} alt={frame.name}/>
            </Grid>
            <br/>
            </Grid>
          )}
        </Grid>
      </Grid>
      </div>
      </React.Fragment>
    )
  }
}

export default App;
