import React from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import classNames from "classnames";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  }
});

class ErrorSnack extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={this.props.open}
        autoHideDuration={6000}
        onClose={this.props.onClose}
      >
        <SnackbarContent
          className={classes.error}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <ErrorIcon
                className={classNames(classes.icon, classes.iconVariant)}
              />
              {this.props.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.props.onClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(ErrorSnack);
