import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  }
};

class Header extends React.Component {
  state = {
    anchorEl: null,
    newPoll: false
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleActions = index => {
    switch (index) {
      case 1:
        this.setState({ newPoll: true, anchorEl: null });
        break;
      case 2:
        break;
      case 3:
        break;
    }
  };
  render() {
    const open = Boolean(this.state.anchorEl);
    const { classes, loggedIn } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                Voting
              </Link>
            </Typography>

            {this.props.loggedIn && (
              <div style={{ marginLeft: "90%" }}>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.handleActions(1)}>
                    Add new poll
                  </MenuItem>
                  <MenuItem onClick={() => this.handleActions(2)}>
                    Delete poll
                  </MenuItem>
                  <MenuItem onClick={() => this.handleActions(3)}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {this.state.newPoll && <Redirect to="/addNewPoll" />}
      </div>
    );
  }
}

export default withStyles(styles)(Header);
