import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Zoom from "@material-ui/core/Zoom";
import Tooltip from '@material-ui/core/Tooltip';



const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1,
  }
}));

function ScrollTop(props:any) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = (event:any) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired
};

export default function BackToTop() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
      <Tooltip title={"Back to top"}>
      <Fab color="primary" size="small" aria-label="scroll back to top">
          <ArrowUpwardIcon />
        </Fab>
        </Tooltip>
      </ScrollTop>
        
    </React.Fragment>
  );
}