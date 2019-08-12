import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import api from '../../services/api'

export default class CriaRespostas extends Component {
    constructor() {
        super();

        this.state = {
            dadosPergunta: [],
            idPergunta: '',
            isDisable: 'false',
            resposta: '',
            erro: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.getId = this.getId.bind(this);

    }

    buscaResposta() {
        const { match } = this.props
        const id = match.params.id
        api.get(`/perguntas/enquete/${id}`)
            .then((response) => {
                const data = response.data;
                this.setState({
                    dadosPergunta: data
                })
            })
            .catch((err) => {
                this.setState({
                    erro: "Não foi possivel buscar dados"
                })
            })
    }

    enviaVoto(idPergunta) {
        api.post(`/pergunta/${idPergunta}/voto`)
            .then((response) => {
            })
            .catch((err) => {
                this.setState({
                    erro: "Não foi possivel criar dados"
                })
            })
    }

    enviaResposta(dados) {
        api.post('/resposta', dados)
            .then((response) => {
            })
            .catch((err) => {
                this.setState({
                    erro: "Não foi possivel criar dados"
                })
            })
    }
    componentDidMount() {
        this.buscaResposta();
    }


    getId(id) {
        this.setState({
            idPergunta: id
        })
    }

    handleChangeText(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { idPergunta, resposta } = this.state;

        const dados = {
            valor_resposta: resposta,
            pergunta_id: idPergunta
        }

        this.buscaResposta()
        this.enviaResposta(dados)
        this.enviaVoto(idPergunta)


    }

    render(){
        const { dadosPergunta } = this.state;
        return (
            <div className="container al-ct">
                <div className="col-xl-8 col-lg-8">
                    <div className="content">
                        <div className="card">
                            <div className="card-header">
                                <h6><strong>Respostas</strong></h6>
                                <Link to="/">
                                        <button className="btn btn-info">Todas Enquetes</button>
                                </Link>
                            </div>
                            <div className="card-body">
                                {dadosPergunta.map((item) => {
                                    return (

                                        <form key={item.id} onSubmit={this.handleSubmit} className="form">
                                            <div className="wrapper">
                                                <h6 className="perguntas"><strong>{item.texto_pergunta}</strong>({item.votos} votos)</h6>
                                            </div>
                                            <div className="data-it">
                                                <span>Data de Inicio: <Moment format="DD/MM/YYYY">{item.data_inicio}</Moment></span>
                                                <span> / Data de Término: <Moment format="DD/MM/YYYY">{item.data_fim}</Moment></span>
                                            </div>
                                            <div className="wrapper">
                                                <input type="text" name="resposta" className="form-control col-xl-10 col-sm-9" placeholder="Resposta" onChange={this.handleChangeText} />
                                                <button onClick={() => this.getId(item.id)} className="btn btn-success" type="submit"><i className="material-icons">check</i></button>
                                            </div>
                                        </form>

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


