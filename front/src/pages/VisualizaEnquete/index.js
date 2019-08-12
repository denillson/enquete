import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import api from '../../services/api'

export default class VisualizaEnquete extends Component {
    constructor() {
        super();

        this.state = {
            dadosEnquete: [],
            erro: ''
        }
    }

    buscaRespostas() {
        const { match } = this.props
        const id = match.params.id
        api.get(`/perguntas/enquete/${id}`)
            .then((response) => {
                const data = response.data;
                this.setState({
                    dadosEnquete: data
                })
                console.log(this.state.dadosEnquete)
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
        const { dadosEnquete } = this.state;
        return (
            <div className="container al-ct">
                <div className="col-xl-8 col-lg-8">
                    <div className="content">
                        <div className="card">
                            <div className="card-header">
                            <h6><strong>Respostas Recebidas</strong></h6>
                                <Link to="/enquete/nova">
                                        <button className="btn btn-info">Nova Enquete</button>
                                </Link>
                            </div>
                            {dadosEnquete.map((item) => {
                                return (
                                    <div class="respostas">
                                        <div class="wrapper col-xl-3">
                                            <h5 class="titulo-pergunta">
                                                <strong>{item.texto_pergunta}</strong>(Total de respostas: {item.votos})
                                    </h5>
                                        </div>
                                        <div className="quadro-respostas col-xl-3">
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
        );
    }
}


