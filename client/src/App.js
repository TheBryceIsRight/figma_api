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

var containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 24,
  height: '100vh',
}


var imgStyle = {
  maxWidth: 1440,
}


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
      <Grid container spacing={7} direction='column' alignItems='center' justify='flex-start'>
        <Grid item>
        </Grid>
        <Grid item>
        {this.state.images ? (
          this.state.images.map(
            (frame,i) =>
            <Grid container spacing={2} direction='column'>
            <Grid item >
            <Typography variant='h3' id={frame.name}>{frame.name}</Typography>
            </Grid>
            <Grid item key={i}>
            <img src={frame.url} style={imgStyle} alt={frame.name}/>
            </Grid>
            <br/>
            <br/>
            </Grid>
            
          )
        ) : (
          <Skeleton variant="rect" width={1440} height={800} />
        )}
        </Grid>
      </Grid>
      </React.Fragment>
    )
  }
}

export default App;
