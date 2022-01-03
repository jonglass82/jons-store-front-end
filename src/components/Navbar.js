import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';


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

    const flexContainer = {
      display: 'flex',
      flexDirection: 'row'
    };

    return  <div>
      <AppBar style={{backgroundColor:'White', color:'Black'}}>

        <Toolbar>

                <Grid justifyContent="space-between" container spacing={10}>

                    <Grid item lg={6}>

                            <MenuIcon fontSize="large" onClick={()=>{this.openDrawer()}}  />

                              <Drawer anchor="left" variant="temporary" onClick={()=>{this.openDrawer()}} open={this.state.drawerOpen}>
                                <List style={{width:'300px', padding:'10px'}}>
                                  <ListItem button>
                                    <ListItemText primary={'Close'} onClick={()=>{this.openDrawer()}} />
                                  </ListItem>
                                  <ListItem button component={Link} to="/" >
                                    <ListItemText primary={'Shop'}/>
                                  </ListItem>
                                  <ListItem button component={Link} to="/music" >
                                    <ListItemText primary={'Music'} />
                                  </ListItem>

                                  <ListItem button component={Link} to="/projects" >
                                    <ListItemText primary={'Projects'} />
                                  </ListItem>

                                  <ListItem button component={Link} to="/not-for-sale" >
                                    <ListItemText primary={'Not For Sale'} />
                                  </ListItem>

                                  <ListItem button component="a" href="https://www.instagram.com/jonglasss/?hl=en">
                                    <ListItemText primary={'Instagram'} />
                                  </ListItem>

                                  <ListItem button component="a" href="https://github.com/jonglass82">
                                    <ListItemText primary={'GitHub'} />
                                  </ListItem>

                                  </List>
                              </ Drawer>

                       { this.state.loggedIn && ( 
                        <a href="/login" onClick={this.handleLogout}>logout</a>
                        )}


                  </Grid>


                  <Grid item lg={6}>

                    <List style={flexContainer}>

                        <ListItem button component={Link} to="/" className="desktopNav" >
                          <ListItemText primary={'Shop'}/>
                        </ListItem>
                        <ListItem button className="desktopNav" component="a" href="/music">
                          <ListItemText primary={'Music'} />
                        </ListItem>

                        <ListItem button className="desktopNav" component="a" href="/projects">
                          <ListItemText primary={'Projects'} />
                        </ListItem>

                        <ListItem button className="desktopNav" component="a" href="/not-for-sale">
                          <ListItemText primary={'Not For Sale'} />
                        </ListItem>

                        <ListItem className="desktopNav" button component="a" href="https://www.instagram.com/jonglasss/?hl=en">
                          <ListItemText primary={<InstagramIcon/>} />
                        </ListItem>

                        <ListItem className="desktopNav" button component="a" href="https://github.com/jonglass82">
                          <ListItemText primary={<GitHubIcon/>} />
                        </ListItem>

                        <ListItem>

                        <IconButton style={{float:'right'}} disabled={this.props.cartCount > 0 ? false : true} href="/purchase" aria-label="cart">

                            <Badge badgeContent={this.props.cartCount} color="secondary">

                               <ShoppingCartIcon />
                            
                            </Badge>

                        </IconButton>

                         </ListItem> 

                      </List>

                 </Grid>

              </Grid>

        </Toolbar>


      </AppBar>
              

    </div>
  }
}

export default NavBar;
