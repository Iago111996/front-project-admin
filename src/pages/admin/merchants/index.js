import React,{ useState, useEffect } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
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

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#3f51b5;',
    '&:hover': {
      backgroundColor: '#3f51b5;',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function UsersList() {
  const classes = useStyles();

  const [merchant, setMerchant] = useState([]);

  const [search, setSearch] = useState('');
  console.log(search)
  useEffect(() => {

    async function loadMerchant(){

        if(!search) {
            const response = await api.get('/api/merchant');
            setMerchant(response.data);
        } else {

        const params = {};
        if(search) {
            params.code_client_like = search;
        }

        const response = await api.get('/api/merchant.search', { params });
        setMerchant(response.data);
        console.log(params);
        }


    }
    loadMerchant();

  }, [search]);

  async function handleDelete(id) {

    if(window.confirm("Deseja relmante excluir este cliente ?")){
        let response = await api.delete('/api/merchant/'+ id)

        if(response.status === 200) {
            window.location.href = '/admin/merchants'
        } else {
            alert("Algo deu errado. Por favor tente novamente!")
        };
    };
  };




  return (
    <div className={classes.root}>
      <CssBaseline />
        <MenuAdmin title={'Clientes'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          </Grid>
          <Box pt={4}>
            <Grid item sm={12}>
                <Grid item sm={6}>
                <Button style={{marginBottom:10}} variant="contained" color="primary" href={'/admin/merchants/register'}>
                Cadastrar
                </Button>
                </Grid>
                <Grid item sm={4}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon color="secondary" />
                    </div>
                    <InputBase
                    placeholder="Código do clente"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    />
                </div>
                </Grid>
            <Paper className={classes.paper}>
                <h2>Listagem de Cliente</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Nome do Responsável</TableCell>
                                <TableCell align="center">Nome da Empresa</TableCell>
                                <TableCell align="center">Código do cliente</TableCell>
                                <TableCell align="center">Número do CNPJ</TableCell>
                                <TableCell align="center">Endereço</TableCell>
                                <TableCell align="center">Opções</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {merchant.map((row) => (
                                <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.name_responsible}
                                </TableCell>
                                <TableCell align="center">{row.name_marketplace}</TableCell>
                                <TableCell align="center">{row.code_client}</TableCell>
                                <TableCell align="center">{row.number_cnpj}</TableCell>
                                <TableCell align="center">{`
                                Cidade: ${row.address_city},
                                Estado: ${row.address_state},
                                Bairro: ${row.address_district},
                                Rua: ${row.address_street},
                                Número: ${row.address_number}`}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup aria-label="outlined primary button group">
                                    <Button color="primary" href={'/admin/merchants/edit/' + row._id}>
                                        <UpdateIcon />
                                    </Button>
                                    <Button color="secondary" onClick={() => handleDelete(row._id)}><DeleteForeverIcon />
                                    </Button>
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




