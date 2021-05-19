import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { usePromiseTracker } from "react-promise-tracker";
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';


const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    
       return (
        promiseInProgress && 
        <Grid container direction='column' spacing={6} justify='center' alignItems='center'>
            <Grid item>
            <Skeleton variant='rect' width={1000} height={800} style={{borderRadius:6}}></Skeleton>
            </Grid>
            <Grid item>
            <Skeleton variant='rect' width={1000} height={800} style={{borderRadius:6}}></Skeleton>
            </Grid>
        </Grid>
      );  
     }

ReactDOM.render(<div><App /><LoadingIndicator/></div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
