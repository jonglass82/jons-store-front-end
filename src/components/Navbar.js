import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class NavBar extends React.Component{

  constructor(props){
    super(props);
    this.state={
      drawerOpen: false
    }
  }

    openDrawer = () => {
   this.state.drawerOpen ? this.setState({drawerOpen: false}) : this.setState({drawerOpen: true})
  }


  render(){
    return  <div >
      <AppBar position="fixed">
        <Toolbar>
        
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon onClick={()=>{this.openDrawer()}} />
                          <Drawer style={{width: 'auto'}} anchor="left" variant="temporary" open={this.state.drawerOpen}>
                            <ListItem button>
                              <ListItemText primary={'close'} onClick={()=>{this.openDrawer()}} />
                            </ListItem>
                            <ListItem button>
                              <ListItemText primary={'Home'} />
                            </ListItem>
                          </ Drawer>
                    </IconButton>

                     { this.state.loggedIn && ( 
                      <a href="/login" onClick={this.handleLogout}>logout</a>
                      )}

                    <Link to="/">
                        <Typography variant="h6">
                          A Cool Breeze
                        </Typography>
                    </Link>


                    <IconButton href="/purchase" aria-label="cart">
                      <Badge badgeContent={this.props.cartCount} color="secondary">
                    <ShoppingCartIcon />
                    </Badge>
                   </IconButton>

        </Toolbar>
      </AppBar>
    </div>
  }
}

export default NavBar;
