import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import api from '../../services/api'

export default class VisualizaEnquete extends Component {
    constructor() {
        super();

        this.state = {
            dadosEnquete: [],
            idEnquete: '',
            erro: ''
        }

        this.updateStatus = this.updateStatus.bind(this);
    }

    updateStatus(){
        const { match } = this.props
        const id = match.params.id

        const dados = {
            status: "Finalizada"
        }
        api.put(`/enquete/status/${id}`, dados)
        .then((response) => {
            this.props.history.push('/');
        })
        .catch((err) => {
            this.setState({
                erro: "Não foi possivel alterar o status"
            })
        })
    }
    

    buscaRespostas() {
        const { match } = this.props
        const id = match.params.id

        api.get(`/perguntas/enquete/${id}`)
            .then((response) => {
                const data = response.data;
                this.setState({
                    dadosEnquete: data,
                    idEnquete: id
                })
            })
            .catch((err) => {
                this.setState({
                    erro: "Não foi possivel buscar dados"
                })
            })
    }

    componentDidMount() {
        this.buscaRespostas();
    }
    render() {
        const { dadosEnquete, idEnquete} = this.state;
        return (
            <div className="container al-ct">
                <div className="col-xl-8 col-lg-8">
                    <div className="content">
                        <div className="card">
                            <div className="card-header">
                            <h6><strong>Respostas Recebidas</strong></h6>
                            <Link to={`/respostas/pergunta/${idEnquete}`}>
                                    Responder
                            </Link> 
                                <div className="td-buttons">
                                <Link to="/enquete/nova">
                                        <button title="Nova Enquete" className="btn btn-info">Nova</button>
                                </Link>
                                    <button title="Finalizar" onClick={this.updateStatus} className="btn btn-danger">
                                        <i class="material-icons">
                                            close
                                        </i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                            {dadosEnquete.map((item) => {
                                return (
                                    <div class="respostas">
                                        <div class="wrapper col-xl-12">
                                            <h5 class="titulo-pergunta">
                                                <strong>{item.texto_pergunta}</strong>(Total de respostas: {item.votos})
                                                
                                    </h5>
                                        </div>
                                        <div className="quadro-respostas col-xl-12">
                                            {item.respostas.map((item, index) => {
                                                return (
                                                    <h6>Resposta {index + 1}: {item.valor_resposta}</h6>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


