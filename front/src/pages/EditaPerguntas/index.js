import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import api from '../../services/api'

export default class EditaPerguntas extends Component {
    constructor() {
        super();

        this.state = {
            dadosPergunta: [],
            idPergunta: '',
            isDisable: true,
            pergunta: '',
            erro: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.getId = this.getId.bind(this);

    }

    buscapergunta(){
        const { match } = this.props
        const id = match.params.id
        api.get(`/perguntas/enquete/${id}`)
            .then((response) => {
                const data = response.data;
                this.setState({
                    dadosPergunta: data,
                })
            })
            .catch((err) => {
                this.setState({
                    erro: "Não foi possivel buscar dados"
                })
            })
    }

    enviaPergunta(dados){
        const {idPergunta} = this.state
        api.put(`/perguntas/${idPergunta}`, dados)
            .then((response) => {
            })
            .catch((err) => {
                this.setState({
                    erro: "Não foi possivel alterar a pergunta"
                })
        })
    }
    componentDidMount() {
       this.buscapergunta();
    }

    getId(id) {
        this.setState({
            idPergunta: id
        })
    }

    handleChangeText(e) {
        this.setState({
            [e.target.name]: e.target.value,
            isDisable: false
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { pergunta } = this.state;

        const dados = {
            texto_pergunta: pergunta,
        }

        this.enviaPergunta(dados) 

    }

    render() {
        const { dadosPergunta, isDisable } = this.state;
        return (
            <div className="container al-ct">
                <div className="col-xl-8 col-lg-8">
                    <div className="content">
                        <div className="card">
                            <div className="card-header">
                                <h6><strong>Perguntas</strong></h6>
                                <Link to="/">
                                        <button className="btn btn-info">Concluir</button>
                                </Link>
                            </div>
                            <div className="card-body">
                                {dadosPergunta.map((item) => {
                                    return (
                                        <>
                                            <form onSubmit={this.handleSubmit} className="form">
                                                <div className="wrapper">
                                                    <input type="text" name="pergunta" className="form-control col-xl-10 col-sm-9" placeholder={item.texto_pergunta} onChange={this.handleChangeText} />
                                                    <button onClick={() => this.getId(item.id)} disabled={isDisable} className="btn btn-success" type="submit"><i class="material-icons">
                                                    check
                                                    </i>
                                                    </button>
                                                </div>
                                            </form>
                                        </>
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


