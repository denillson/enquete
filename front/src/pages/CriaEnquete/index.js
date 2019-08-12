import React, { Component } from 'react';
import api from '../../services/api'

export default class CriaEnquete extends Component {
    constructor() {
        super();

        this.state = {
            nome: '',
            dataInicio: '',
            dataTermino: '',
            erro: ''
        }
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChangeText(e) {
        this.setState({
            nome: e.target.value,
            erro: ''
        })
    }
    handleChangeDate(e) {
        this.setState({
            [e.target.name]: e.target.value,
            erro: ''
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const { dataInicio, dataTermino, nome } = this.state;
        
        const dados = {
            data_inicio: dataInicio,
            data_fim: dataTermino,
            nome: nome,
            status : 'Em Andamento',
        }
        api.post('/enquete', dados)
            .then((response) => {
                this.setState({
                    dataTermino: '',
                    dataInicio: '',
                    nome: '',
                    status: ''
                })
                this.props.history.push('/enquete/perguntas');
            })
            .catch((err) => {
                this.setState({
                    erro: "Preencha todos os campos para continuar"
                })
            })
    }
    render() {
        const {erro} = this.state;
        return (
            <div className="container al-ct">
                <div className="col-xl-8 col-lg-8">
                    <div className="content">
                        <div className="card">
                            <div className="card-header">
                                <h6><strong>Nova Enquete</strong></h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit} className="form">
                                    <div className="col-xl-12">
                                        <input type="text" name="nome" className="form-control" placeholder="Nome" onChange={this.handleChangeText} />
                                    </div>
                                    <div className="input-date">
                                        <div className="col-xl-6">
                                            <input type="date" name="dataInicio" className="form-control" onChange={this.handleChangeDate} />
                                        </div>
                                        <div className="col-xl-6">
                                            <input type="date" name="dataTermino" className="form-control" onChange={this.handleChangeDate} />
                                        </div>
                                    </div>
                                    <button type="submit" className="link-btn btn btn-info">Continuar</button>
                                    <div className="erro">
                                        <span>{erro}</span>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


