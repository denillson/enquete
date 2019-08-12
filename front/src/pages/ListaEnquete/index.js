import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import api from '../../services/api'

export default class ListaEnquete extends Component {
    constructor() {
        super();

        this.state = {
            dadosEnquete: [],
            erro: '',
            color: ''
        }

        this.deleteEnquete = this.deleteEnquete.bind(this)
    }

    buscaEnquete(){
        api.get('/enquetes')
            .then((response) => {
                const data = response.data;
                this.setState({
                    dadosEnquete: data
                })
            })
            .catch((err) => {
                this.setState({
                    erro: "Erro ao buscar dados"
                })
            })
    }

    deleteEnquete(id){
        api.delete(`/enquete/${id}`)
        .then((response)=>{
            this.buscaEnquete();
        })
        .catch((err)=>{

        })
    }
    componentDidMount() {
        this.buscaEnquete();
    }
    render() {
        const { dadosEnquete } = this.state;
        return (
            <div className="container al-ct">
                <div className="col-xl-12 col-lg-12">
                    <div className="content">
                        <div class="table-responsive table--no-card m-b-30">
                            <div className="card">
                                <div className="card-header">
                                    <h6>Enquetes</h6>
                                    <Link to="/enquete/nova">
                                        <button className="btn btn-info">Nova</button>
                                    </Link>
                                </div>
                                <table class="table table-borderless table-striped table-earning">
                                    <thead className="thead-bg">
                                        <tr>
                                            <th>Nome</th>
                                            <th>Data de Inicio</th>
                                            <th>Data de Término</th>
                                            <th>Status</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dadosEnquete.map((item) => {
                                            return (
                                                <tr>
                                                    <td>{item.nome}</td>
                                                    <td><Moment format={'DD/MM/YYYY'}>{item.data_inicio}</Moment></td>
                                                    <td><Moment format={'DD/MM/YYYY'}>{item.data_fim}</Moment></td>
                                                    <td>{(item.status === "Em Andamento"  ? 
                                                    (
                                                        <span className="badge badge-success">{item.status}</span>
                                                    ) 
                                                    : (
                                                        <span className="badge badge-danger">{item.status}</span>
                                                    ) 
                                                    )}</td>
                                                    <td className="td-buttons col-xl-3 col-lg-4">
                                                    <Link to={`/enquete/editar/${item.id}`}>
                                                        <button className="btn btn-info">
                                                            <i class="material-icons">
                                                                edit
                                                            </i>
                                                        </button>
                                                        </Link>
                                                        <Link to={`/enquete/visualiza/${item.id}`}>
                                                        <button className="btn btn-success">
                                                            <i class="material-icons">
                                                                remove_red_eye
                                                            </i>
                                                        </button>
                                                        </Link>
                                                        <button onClick={() => this.deleteEnquete(item.id)} className="btn btn-warning">
                                                            <i class="material-icons">
                                                                delete
                                                            </i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


