import React, {useState} from 'react';
import './calculadora.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CalculadoraService from './calculadora.service';



function Calculadora() {

  const [calcular,concatenarNumero,SOMA,SUBTRACAO,DIVISAO,MULTIPLICACAO] = CalculadoraService();

  const [txtNumeros, setTxtNumeros] = useState('0');
  const [numero1, setNumero1] = useState('0');
  const [numero2, setNumero2] = useState(null);
  const [operacao, setOperacao] = useState(null);
  //essa função é para digitar os numeros na tela
  function adicionarNumero(numero){
    let resultado;
    if(operacao === null){
      resultado = concatenarNumero(numero1,numero);
      setNumero1(resultado);
    }else{
      resultado = concatenarNumero(numero2,numero);
      setNumero2(resultado);
    }
    setTxtNumeros(resultado);
  }
  function definirOperacao(op){
    //apensa define a operação caso ela não exista
      if(operacao === null){
        setOperacao(op);
        return;
      }
    //caso a operação estiver definida e numero 2 selecionado,realiza o calculo da operação
      if(numero2 !== null){
        const resultado = calcular(parseFloat(numero1), parseFloat(numero2), operacao);
        setOperacao(op);
        setNumero1(resultado.toString());
        setNumero2(null);
        setTxtNumeros(resultado.toString());
      }
  }
  function acaoCalcular(){
    if(numero2 == null){
      return;
    }
    const resultado = calcular(parseFloat(numero1),parseFloat(numero2),operacao);
    setTxtNumeros(resultado);
  }

  function limpar(){
    setTxtNumeros('0');
    setNumero1('0');
    setNumero2(null);
    setOperacao(null);
  }

  return (
   <Jumbotron style={{
     background: 'transparent !important',
     backgroundColor: '#007bff',
     padding: '5px',
     margin: '5px',
     width: '400px'
    }}>
      <Container>
        <Row>
         <Col xs="3">
          <Button variant="danger"
          onClick={limpar}> C </Button>

         </Col>
          
        <Col xs="9">
          <Form.Control type="text" 
                        name="txtNumeros" 
                        className="text-right" 
                        readOnly="readonly" 
                        value={txtNumeros}
                        data-testid="txtNumeros" />
        </Col>
     </Row>
     <Row>
      <Col>
        <Button variant="light"
        onClick={()=>adicionarNumero('7')}>7</Button>
        
      </Col>

       <Col>
      <Button variant="light"
       onClick={()=>adicionarNumero('8')}>8</Button>
      </Col>

       <Col>
      <Button variant="light"
       onClick={()=>adicionarNumero('9')}>9</Button>
      </Col>

       <Col>
      <Button variant="warning"
       onClick={()=>definirOperacao('/')}>/</Button>
      </Col>
     </Row>

      <Row>
      <Col>
        <Button variant="light"
         onClick={()=>adicionarNumero('4')}>4</Button>
        
      </Col>

       <Col>
      <Button variant="light"
       onClick={()=>adicionarNumero('5')}>5</Button>
      </Col>

       <Col>
      <Button variant="light"
       onClick={()=>adicionarNumero('6')}>6</Button>
      </Col>

       <Col>
      <Button variant="warning"
       onClick={()=>definirOperacao('*')}>*</Button>
      </Col>
     </Row>
      <Row>
      <Col>
        <Button variant="light"
         onClick={()=>adicionarNumero('1')}>1</Button>
        
      </Col>

       <Col>
      <Button variant="light"
       onClick={()=>adicionarNumero('2')}>2</Button>
      </Col>

       <Col>
      <Button variant="light"
       onClick={()=>adicionarNumero('3')}>3</Button>
      </Col>

       <Col>
      <Button variant="warning"
      onClick={()=>definirOperacao('-')}>-</Button>
      </Col>
     </Row>
      <Row>
      <Col>
        <Button variant="light"
         onClick={()=>adicionarNumero('0')}>0</Button>
        
      </Col>

       <Col>
      <Button variant="light"
       onClick={()=>adicionarNumero('.')}>.</Button>
      </Col>

       <Col>
      <Button variant="success"
       onClick={acaoCalcular}>=</Button>
      </Col>

       <Col>
      <Button variant="warning"
       onClick={()=>definirOperacao('+')}>+</Button>
      </Col>
     </Row>
    </Container>
   
   </Jumbotron>
  );
}

export default Calculadora;
