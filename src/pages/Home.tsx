import React from "react";
import { Container, AppBar, Toolbar, Typography, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Grid, Button, Avatar } from "@mui/material";
import { Dashboard, AccountCircle, Group, Email, Notifications, Settings } from "@mui/icons-material";
import ChatBoot from "../components/ChatBoot/ChatBoot";
import DynamicBreadcrumbs from "../components/DynamicBreadcrumbs/DynamicBreadcrumbs";

const drawerWidth = 240;

const Home = () => {
  return (
    <div style={{ display: 'flex', boxSizing: 'content-box' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ zIndex: 1100 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Social Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Toolbar />
        <Container>
          <DynamicBreadcrumbs />
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Paper style={{ padding: '20px' }}>
                {/* Main content for the dashboard */}
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper style={{ padding: '20px' }}>
                <Avatar />
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="subtitle1">@johndoe</Typography>
                <Button variant="outlined" fullWidth style={{ marginTop: '10px' }}>
                  Edit Profile
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <ChatBoot />
      </main>
    </div>
  );
}

export default Home;
