import React, { useState } from 'react';
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
    paddingTop: theme.spacing(4),
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
  textField_code_request: {
    width: '35%',
  }
}));

export default function RegisterRequests() {
  const classes = useStyles();

    const [code_request, setCode_request] = useState('');
    const [form_pay, setForm_pay] = useState('');
    const [type_invoice, setType_invoice] = useState('');
    const [state_request, setState_request] = useState('');

    async function hendleSubmit() {

      const data = {
        code_request: code_request,
        form_pay: form_pay,
        type_invoice: type_invoice,
        state_request: state_request
      };

      if(code_request !== '' && form_pay !== '' && type_invoice !== '' & state_request !== '') {

          const response = await api.post('/api/request', data);

          if(response.status === 200) {
              window.location.href = '/admin/requests';
          } else {
              alert('Erro ao cadastrar usuário!');
          }
      } else {
          alert('Por favor, preencha todos os dados!');
      };


    };

  return (
    <div className={classes.root}>
      <CssBaseline />
        <MenuAdmin title={'Pedidos'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10}} variant="contained" color="primary" href={'/admin/requests'}>
            <ArrowBackIcon />
          </Button>
                <Paper className={classes.paper}>
                <h2>Cadastro de Pedidos</h2>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                    className={classes.textField_code_request}
                        required
                        id="code_request"
                        name="code_request"
                        label="Código do Pedido"
                        fullWidth
                        autoComplete="code_request"
                        value={code_request}
                        onChange={e => setCode_request(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="labelForm_pay">Forma de Pagamento</InputLabel>
                            <Select
                            labelId="labelForm_pay"
                            id="form_pay"
                            value={form_pay}
                            onChange={e => setForm_pay(e.target.value)}
                            >
                                <MenuItem value={'Boleto'}>Boleto</MenuItem>
                                <MenuItem value={'Cartão de crédito'}>Cartão de crédito</MenuItem>
                                <MenuItem value={'Pix'}>Pix</MenuItem>
                                <MenuItem value={'Transferência'}>Transferência</MenuItem>
                                <MenuItem value={'Depósito'}>Depósito</MenuItem>
                            </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="labelState_request">Estado do Pedido</InputLabel>
                            <Select
                            labelId="labelState_request"
                            id="state_request"
                            value={state_request}
                            onChange={e => setState_request(e.target.value)}
                            >
                                <MenuItem value={'Opção1'}>Opção1</MenuItem>
                                <MenuItem value={'Opção2'}>Opção2</MenuItem>
                                <MenuItem value={'Opção3'}>Opção3</MenuItem>
                                <MenuItem value={'Opção4'}>Opção4</MenuItem>
                                <MenuItem value={'Opção5'}>Opção5</MenuItem>
                            </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="labelType_invoice">Tipo de Nota Fiscal</InputLabel>
                            <Select
                            labelId="labelType_invoice"
                            id="type_invoice"
                            value={type_invoice}
                            onChange={e => setType_invoice(e.target.value)}
                            >
                                <MenuItem value={'Sem CNPJ na nota'}>Sem CNPJ na nota</MenuItem>
                                <MenuItem value={'Cupom fiscal'}>Cupom fiscal</MenuItem>
                                <MenuItem value={'DANFE'}>DANFE</MenuItem>
                            </Select>
                    </FormControl>
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

