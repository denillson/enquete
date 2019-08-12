import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api'

export default class CriaPerguntas extends Component {
    constructor() {
        super();

        this.state = {
            dadosEnquete: [],
            idEnquete: 'Enquete',
            erro: '',
            pergunta: '',
            isDisable: true,
            textDisable: false,
            textoOpcao: []
        }
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectEnquete = this.selectEnquete.bind(this)

    }

    componentDidMount() {
        const {idEnquete} = this.state;
        if(idEnquete === 'Enquete'){
            this.setState({
                textDisable : true
            })
        }
        api.get('/enquetes')
            .then((response) => {
                const data = response.data;
                this.setState({
                    dadosEnquete: data
                })
        })
    }

    handleChangeText(e) {
        this.setState({
            [e.target.name]: e.target.value,
            isDisable: false
        })

        if([e.target.value] === ''){
            this.setState({
                isDisable: true,
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            textoOpcao: [...this.state.textoOpcao, this.state.pergunta],
        });

        const { pergunta, idEnquete} = this.state

        const dados = {
            texto_pergunta: pergunta,
            enquete_id: idEnquete
        }


        api.post("/pergunta", dados)
            .then((response) => {
            })
            .catch((err) => {
                this.setState({
                    erro: 'Erro ao criar dados',
                })
            })

    }

    selectEnquete(e) {
        this.setState({
            idEnquete: e.target.value,
            textDisable: false
        });

    }
    render() {
        const { dadosEnquete, idEnquete, textoOpcao, isDisable, textDisable } = this.state;
        let link;

        if( textoOpcao.length >= 3){
            link = <Link to="/"><button className="btn btn-info">Concluir</button></Link>
        }
  
        return (
            <div className="container al-ct">
                <div className="col-xl-8 col-lg-8">
                    <div className="content">
                    <div className="card">
                                <div className="card-header">
                                    <h6><strong>Perguntas</strong></h6>
                                    <div className="col-xl-6 col-md-6 col-sm-8">
                                        <select className="form-control form-select" value={idEnquete} onChange={this.selectEnquete}>
                                        <option value="">Selecione a Enquete</option>
                                            {dadosEnquete.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.nome}</option>
                                                )
                                            })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit} className="form">
                                        <div className="wrapper">
                                            <input type="text" name="pergunta" disabled={textDisable} className="form-control col-xl-11 col-sm-10 col-md-10" placeholder="Pergunta" onChange={this.handleChangeText} />
                                            <button type="submit" disabled={isDisable} className="btn btn-info"><i className="material-icons">
                                            add
                                            </i>
                                            </button>
                                        </div>
                                    </form>
                                    <div className="wrapper">
                                      <span>* Para continuar deve ter no minimo três questões</span> 
                                    </div>
                                    <h4>Questões</h4>            
                                    <div className="quadro-perguntas">
                                        {textoOpcao.map((item, index) => {
                                            return (
                                                <div key={index} className="question-row">
                                                    {item}
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                    {link}
                                </div>

                            </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}


