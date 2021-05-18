import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Footer from '../../../components/footer.admin';
import MenuAdmin  from '../../../components/menu.admin';

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
}));


export default function UsersList() {
  const classes = useStyles();

  const [user, setUser] = useState([]);

  useEffect(() => {

    async function loadUser(){

        const response = await api.get('/api/user');

        setUser(response.data);
    }
    loadUser();
  }, []);

  async function handleDelete(id) {

    if(window.confirm("Deseja relmante excluir este usuário ?")){
        let result = await api.delete('/api/user/'+ id)

        if(result.status === 200) {
            window.location.href = '/admin/users'
        } else {
            alert("Algo deu errado. Por favor tente novamente!")
        };
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
          </Grid>
          <Box pt={4}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10}} variant="contained" color="primary" href={'/admin/users/register'}>
                Cadastrar
            </Button>
            <Paper className={classes.paper}>
                <h2>Listagem de Usuários</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Tipo</TableCell>
                                <TableCell align="center">Data de Cadastro</TableCell>
                                <TableCell align="center">Opções</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {user.map((row) => (
                                <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name_user}
                                </TableCell>
                                <TableCell align="center">{row.email_user}</TableCell>
                                <TableCell align="center">{row.type_user === 1 ?
                                    <Chip
                                     label="Administrador"
                                     color="primary"
                                   /> :
                                    <Chip
                                     label="Fucionário"
                                     color="secondary"
                                   />
                                }</TableCell>
                                <TableCell align="center">{ new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup aria-label="outlined primary button group">
                                    <Button color="primary" href={'/admin/users/edit/' + row._id}>
                                        <UpdateIcon />
                                    </Button>
                                    <Button color="secondary" onClick={() => handleDelete(row._id)}><DeleteForeverIcon /></Button>
                                </ButtonGroup>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>

                    </Grid>
                </Grid>
            </Paper>

            </Grid>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}




