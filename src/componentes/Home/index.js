import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { Navbar, Input, Button, InputGroup, InputGroupAddon, Container, Col, Form, Card, CardImg, CardBody, Spinner, CardTitle, CardSubtitle, CardText, Row } from 'reactstrap'
import { MdSearch , MdStar} from 'react-icons/md'

class Home extends Component {
    state = {
        carregando: false,
        infoNasa: []
    }
    stalkear = async (evento) => {

        evento.preventDefault()
        this.setState({ carregando: true })
        const form = evento.target
        const inputGroup = form.children[0]
        const input = inputGroup.children[0]
        const infoNasa = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=oCu39fA87BgU7MnXVyM3eZHDrmcXKFxxbF1fVQsr`)
        //const seguidores = await axios( `https://api.github.com/users/${input.value}/followers`) 
        // const {seguidores: data} = await axios( `https://api.github.com/users/${i nput.value}/followers`) 
        this.setState({ infoNasa: [infoNasa.data, ...this.state.infoNasa], carregando: false })

        console.log(infoNasa.data)

    }


    render() {
        return (
            <>
            <Navbar color="dark">
            <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <img className="rounded-circle border border-white mr-3" width="50"
                            src="https://www.thispersondoesnotexist.com/image" alt="pessoa aleatória"/>
                           <span className="text-light">
                               Logado como <Link className="text-white font-weight-bold ml-3"  to="/">{this.props.match.params.usuario }</Link> </span> 
                        </Col>
                    </Container>
            </Navbar>
                <Navbar color="dark" fixed="bottom">
                    <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.stalkear}>
                                <InputGroup  >
                                    <Input type="date" />
                                    <InputGroupAddon addonType="append">
                                        <Button color="danger">
                                            {this.state.carregando ? (<Spinner color="light" size="sm" />) : (<MdSearch size="20px" />)}
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                </Navbar>

                {this.state.carregando ?
                            (
                                <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                                    <Spinner color="dark" size="lg" />
                                    <span>Carregando...</span>

                                </Container>
                            ) : (
                                <Container className="mt-3 mb-5">
                                    <Row>
                                        {this.state.infoNasa.map((infoNasa) => (
                                            <Col xs="12" md="4" className="d-flex">
                                                <Card color="dark" className="text-light mb-4">
                                                    <CardImg top width="100%" height="30%" src={infoNasa.url} alt={infoNasa.title} />
                                                    <CardBody>
                                                        <CardTitle className="h3 text-center">{infoNasa.title}</CardTitle>
                                                        <CardSubtitle className="text-muted text-center">{infoNasa.date.split('-').reverse().join('/')}</CardSubtitle>
                                                        <CardText className="text-justify ">{infoNasa.explanation}</CardText>
                                                    </CardBody>
                                                </Card>
                                            </Col>))}
                                    </Row>
                                </Container>
                            )
                } 
                {this.state.infoNasa.length ===0 &&(
                   <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                   <MdStar color="dark" size="150" />
                   <span>Coloque uma data e receba as informações da Nasa</span>

               </Container>
               ) }
            
            
                {/* {this.state.carregando && (
                    <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                        <Spinner color="dark" size="lg" />
                        <span>Carregando...</span>

                    </Container>
                )} */}

            </>
        )
    }
}
export default Home;