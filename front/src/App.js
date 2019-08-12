import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './css/bootstrap.min.css';
import './css/custom.css';
import ListaEnquete from './pages/ListaEnquete';
import CriaEnquete from './pages/CriaEnquete';
import CriaPerguntas from './pages/CriaPerguntas';
import EditaEnquete from './pages/EditaEnquete';
import CriaRespostas from './pages/CriaRespostas';
import VisualizaEnquete from './pages/VisualizaEnquete';
import EditaPerguntas from './pages/EditaPerguntas';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ListaEnquete}></Route>
          <Route path="/enquete/nova" component={CriaEnquete}></Route>
          <Route path="/enquete/editar/:id" component={EditaEnquete}></Route>
          <Route path="/enquete/perguntas" component={CriaPerguntas}></Route>
          <Route path="/perguntas/enquete/:id" component={EditaPerguntas}></Route>
          <Route path="/enquete/visualiza/:id" component={VisualizaEnquete}></Route>
          <Route path="/respostas/pergunta/:id" component={CriaRespostas}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
