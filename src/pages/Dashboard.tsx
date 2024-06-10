import React, { useEffect, useState } from "react";
import { Container, AppBar, Toolbar, Typography, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Grid, Button, Avatar } from "@mui/material";
import { AccountCircle, Group, Email, Notifications, Settings, ExitToApp, Home, PostAdd } from "@mui/icons-material";

import ChatBoot from "../components/ChatBoot/ChatBoot";
import DynamicBreadcrumbs from "../components/DynamicBreadcrumbs/DynamicBreadcrumbs";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../store/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../utils/hepers";
import { DocumentData } from "firebase/firestore";
import { logout } from "../store/slices/authSlice";
import ProfileDefault from '../assets/img/person.png'
import { useNavigate } from "react-router-dom";
import { setIsNavigate } from "../store/slices/portalEsgDataSlice";

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const [loggedUser, setLoggedUser]  = useState<DocumentData>({});
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout()).then(() => navigate('/login'));
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserData(user.uid);
        if (userData) {
          setLoggedUser(userData);
        } else {
          navigate('/login');
          dispatch(setIsNavigate(false));
        }
      } else {
        navigate('/login');
        dispatch(setIsNavigate(false));
      }
    });

    return () => unsubscribe();
  }, [user]);

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
              {/* <Dashboard /> */}
              <Home />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Comunidades" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PostAdd />
            </ListItemIcon>
            <ListItemText primary="Postagem" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary="Messagens" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText primary="Notificações" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
          </ListItem>
          <ListItem button={true} onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
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
                <Avatar src={loggedUser.photoURL ? loggedUser.photoURL : ProfileDefault} alt="Foto de perfil" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                {loggedUser && (
                  <>
                    <Typography variant="h6">{loggedUser.displayName}</Typography>
                    <Typography variant="subtitle1">{loggedUser.email}</Typography>
                    <Button variant="outlined" fullWidth style={{ marginTop: '10px' }}>
                      Editar Perfil
                    </Button>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <ChatBoot />
      </main>
    </div>
  );
}

export default Dashboard;
