import React from 'react';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


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
      <AppBar style={{backgroundColor:'White', color:'Black'}}>

        <Toolbar>

                <Grid justify="space-between" container spacing={12}>

                    <Grid item sm={10}>

                        <IconButton edge="start" color="inherit" aria-label="menu" size="medium">

                            <MenuIcon fontSize="large" onClick={()=>{this.openDrawer()}} />

                              <Drawer anchor="left" variant="temporary" onClick={()=>{this.openDrawer()}} open={this.state.drawerOpen}>
                                <List style={{width:'300px', padding:'10px'}}>
                                  <ListItem button>
                                    <ListItemText primary={'Close'} onClick={()=>{this.openDrawer()}} />
                                  </ListItem>
                                  <ListItem button  component={Link} to="/" >
                                    <ListItemText primary={'Home'}/>
                                  </ListItem>
                                  <ListItem button>
                                    <ListItemText primary={'Music'} />
                                  </ListItem>
                                  <ListItem button>
                                    <ListItemText primary={'Instagram'} />
                                  </ListItem>
                                  </List>
                              </ Drawer>

                        </IconButton>

                       { this.state.loggedIn && ( 
                        <a href="/login" onClick={this.handleLogout}>logout</a>
                        )}


                  </Grid>

                  <Grid item sm={2}>

                      <IconButton href="/purchase" aria-label="cart">
                            Checkout    
                        <Badge badgeContent={this.props.cartCount} color="secondary">

                           <ShoppingCartIcon />
                        
                        </Badge>

                     </IconButton>

                 </Grid>

              </Grid>

        </Toolbar>


      </AppBar>
              

    </div>
  }
}

export default NavBar;
