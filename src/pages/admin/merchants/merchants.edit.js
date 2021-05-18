import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import Footer from '../../../components/footer.admin';
import MenuAdmin  from '../../../components/menu.admin';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useParams} from 'react-router-dom';


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

export default function RegisterMerchants() {
  const classes = useStyles();


  const [name_responsible, setName_responsible] = useState('');
  const [name_marketplace, setName_marketplace] = useState('');
  const [code_client, setCode_client] = useState('');
  const [number_cnpj, setNumber_cnpj] = useState('');
  const [address_state, setAddress_state] = useState('');
  const [address_city, setAddress_city] = useState('');
  const [address_district, setAddress_district] = useState('');
  const [address_street, setAddress_street] = useState('');
  const [address_number, setAddress_number] = useState('');

  const { idMerchant } = useParams();


  useEffect(() => {
      async function getMerchant() {

        let response = await api.get('/api/merchant.details/' + idMerchant);

        setName_responsible(response.data.name_responsible);
        setName_marketplace(response.data.name_marketplace);
        setCode_client(response.data.code_client);
        setNumber_cnpj(response.data.number_cnpj);
        setAddress_state(response.data.address_state);
        setAddress_city(response.data.address_city);
        setAddress_district(response.data.address_district);
        setAddress_street(response.data.address_street);
        setAddress_number(response.data.address_number);


      }
      getMerchant();
  }, []);

  async function hendleSubmit() {

    const  data = {
      name_responsible: name_responsible,
      name_marketplace: name_marketplace,
      code_client: code_client,
      number_cnpj: number_cnpj,
      address_state: address_state,
      address_city: address_city,
      address_district: address_district,
      address_street: address_street,
      address_number: address_number,
      _id: idMerchant
  };

    if(name_responsible !== '' && name_marketplace !== '' && code_client !== '' && number_cnpj !== '' &&
      address_state !== '' && address_city !== '' && address_district !== '' && address_street !== '' &&address_street !== '' && address_number !== '') {

        const response = await api.put('/api/merchant', data);

        if(response.status === 200) {
            window.location.href = '/admin/merchants';
        } else {
            alert('Erro ao editar usuário!');
        }
    } else {
        alert('Por favor, preencha todos os dados!');
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
          <Button style={{marginBottom:10}} variant="contained" color="primary" href={'/admin/merchants'}>
            <ArrowBackIcon />
          </Button>
          <Paper className={classes.paper}>
                <h2>Atualização de Clientes</h2>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="name_responsible"
                        name="name_responsible"
                        label="Nome do Responsável"
                        fullWidth
                        autoComplete="name_responsible"
                        value={name_responsible}
                        onChange={e => setName_responsible(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="name_marketplace"
                        name="name_marketplace"
                        label="Nome do Estabelecimento"
                        fullWidth
                        autoComplete="name_marketplace"
                        value={name_marketplace}
                        onChange={e => setName_marketplace(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="code_client"
                        name="code_client"
                        label="Código do Cliente"
                        fullWidth
                        autoComplete="code_client"
                        value={code_client}
                        onChange={e => setCode_client(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="number_cnpj"
                        name="number_cnpj"
                        label="CNPJ"
                        fullWidth
                        autoComplete="number_cnpj"
                        value={number_cnpj}
                        onChange={e => setNumber_cnpj(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="address_state"
                        name="address_state"
                        label="Estado"
                        fullWidth
                        autoComplete="address_state"
                        value={address_state}
                        onChange={e => setAddress_state(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="address_city"
                        name="address_city"
                        label="Cidade"
                        fullWidth
                        autoComplete="address_city"
                        value={address_city}
                        onChange={e => setAddress_city(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        id="address_district"
                        name="address_district"
                        label="Bairro"
                        fullWidth
                        autoComplete="address_district"
                        value={address_district}
                        onChange={e => setAddress_district(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="address_street"
                        name="address_street"
                        label="Endereço"
                        fullWidth
                        autoComplete="address_street"
                        value={address_street}
                        onChange={e => setAddress_street(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        id="address_number"
                        name="address_number"
                        label="Número"
                        fullWidth
                        autoComplete="address_number"
                        value={address_number}
                        onChange={e => setAddress_number(e.target.value)}
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
              <Box pt={4}>
                <Footer />
              </Box>
            </Container>
      </main>
    </div>
  );
}



