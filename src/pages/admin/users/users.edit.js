import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import Footer from '../../../components/footer.admin';
import MenuAdmin  from '../../../components/menu.admin';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useParams } from 'react-router-dom';

import api from '../../../services/api';






const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

export default function RegisterUsers() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');

  const { idUser } = useParams();

  useEffect(() => {
    async function getUser() {

      let response = await api.get('/api/user.details/' + idUser);

      setName(response.data.name_user);
      setEmail(response.data.email_user);
      setType(response.data.type_user);
      setPassword(response.data.password_user);

    }
    getUser();
}, []);

  async function hendleSubmit() {

    const data = {
        name_user: name,
        email_user: email,
        type_user: type,
        password_user: password,
        _id: idUser
    };

    if(name !== '' && email !== '' && type !== '' & password !== '') {

        const response = await api.put('/api/user', data);

        if(response.status === 200) {
            window.location.href = '/admin/users';
        } else {
            alert('Erro ao atualizar usuário!');
        }
    } else {
        alert('Por favor, preencha todos os dados!');
    };


  };


  return (
    <div className={classes.root}>
      <CssBaseline />
        <MenuAdmin title={'Usuários'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10}} variant="contained" color="primary" href={'/admin/users'}>
            <ArrowBackIcon />
          </Button>
                <Paper className={classes.paper}>
                <h2>Atualização de Usuários</h2>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Nome completo"
                        fullWidth
                        autoComplete="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="labelType">Tipo</InputLabel>
                            <Select
                            labelId="labelType"
                            id="type"
                            value={type}
                            onChange={e => setType(e.target.value)}
                            >
                                <MenuItem value={1}>Administrador</MenuItem>
                                <MenuItem value={2}>Fucionário</MenuItem>
                            </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        type="password"
                        required
                        id="password"
                        name="password"
                        label="Senha"
                        fullWidth
                        autoComplete="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    </Grid>
                        <Grid item xs={12} sm={12}>
                        <Button variant="contained" color="primary"onClick={hendleSubmit}>
                            Salvar
                        </Button>
                        </Grid>
                    </Grid>
                </Paper>
                </Grid>
                </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}




