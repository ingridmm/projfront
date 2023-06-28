import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import View from './components/view';
import CreateFornecedor from './components/createFornecedor';
import ReadFornecedor from './components/readFornecedor';
import UpdateFornecedor from './components/updateFornecedor';
import ViewFornecedor from './components/viewFornecedor';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios';
import { Button, Divider, Segment } from 'semantic-ui-react'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';


function App() {
  return (
    <div>
      <Router>
        <div className="main">
          <h2 className="main-header">Cad Company</h2>
          <Segment inverted textAlign='center'>
          <Link to={`/read`}>
            <Button basic inverted color='olive' content='Olive'>Empresas</Button>
            </Link>
            <Divider horizontal>--</Divider>
            <Button basic inverted color='olive' content='Olive'>Fornecedores</Button>
          </Segment>
          <div>
            <Route exact path='/create' component={Create} />
          </div>
          <div style={{ marginTop: 20 }}>
            <Route exact path='/read' component={Read} />
          </div>
          <div>
            <Route path="/update/:id" component={Update} />
          </div>
          <div>
            <Route exact path="/view/:id" component={View} />
          </div>
          <div>
            <Route exact path='/createFornecedor' component={CreateFornecedor} />
          </div>
          <div>
            <Route exact path='/readFornecedor' component={ReadFornecedor} />
          </div>
          <div>
            <Route exact path='/updateFornecedor/:id' component={UpdateFornecedor} />
          </div>
          <div>
            <Route exact path='/viewFornecedor/:id' component={ViewFornecedor} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
