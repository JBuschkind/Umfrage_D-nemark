import './App.css';
import {Col, Form, Button, Container, FormGroup } from 'react-bootstrap'

var XMLWriter  = require('xml-writer');

function App() {

  const handleSave = () => {

    var XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://busch.click:3000/user");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");


    var name = document.getElementById("name").value;
    var bitstring = ""
    for (let i = 0; i < 21; i++) {
      if(document.getElementById("food" + i).checked){
        bitstring += "1";
      }else{
        bitstring += "0"
      }
    } 
    
    const body = JSON.stringify({
      name: name,
      bitstring: bitstring
    });

    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 201) {
        console.log(JSON.parse(xhr.responseText));
        alert("Danke, du kannst die Seite jetzt schließen ^^")
        window.location.reload();
      } else {
        alert("Da ist etwas schief gelaufen. Sag Johann Bescheid");
      }
    };
    console.log(body);
    xhr.send(body);

  }


  return (
    <div>
      <Col xs={'auto'}>
        <Container>
          <Form  onSubmit={e => { e.preventDefault(); }}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="textarea" placeholder="Hier deinen Namen eintragen" />
            </Form.Group>
            <FormGroup controlId='food0'>
              <Form.Check type="checkbox" label="Asia Pfanne" />
            </FormGroup>
            <FormGroup controlId='food1'>
              <Form.Check type="checkbox" label="Burger" />
            </FormGroup>
            <FormGroup controlId='food2'>
              <Form.Check type="checkbox" label="Burritos" />
            </FormGroup>
            <FormGroup controlId='food3'>
              <Form.Check type="checkbox" label="Champignonpfanne mit Knobibrot" />
            </FormGroup>
            <FormGroup controlId='food4'>
              <Form.Check type="checkbox" label="Chilli(con/sin carne)" />
            </FormGroup>
            <FormGroup controlId='food5'>
              <Form.Check type="checkbox" label="Curry" />
            </FormGroup>
            <FormGroup controlId='food6'>
              <Form.Check type="checkbox" label="Fisch" />
            </FormGroup>
            <FormGroup controlId='food7'>
              <Form.Check type="checkbox" label="Gemüsepfanne" />
            </FormGroup>
            <FormGroup controlId='food8'>
              <Form.Check type="checkbox" label="Gemüseauflauf" />
            </FormGroup>
            <FormGroup controlId='food9'>
              <Form.Check type="checkbox" label="Kartoffel Auflauf" />
            </FormGroup>
            <FormGroup controlId='food10'>
              <Form.Check type="checkbox" label="Lasagne" />
            </FormGroup>
            <FormGroup controlId='food11'>
              <Form.Check type="checkbox" label="Lauchsuppe" />
            </FormGroup>
            <FormGroup controlId='food12'>
              <Form.Check type="checkbox" label="Mac'n Cheese" />
            </FormGroup>
            <FormGroup controlId='food13'>
              <Form.Check type="checkbox" label="Milchreis" />
            </FormGroup>
            <FormGroup controlId='food14'>
              <Form.Check type="checkbox" label="Nudeln(diverse Soßen)" />
            </FormGroup>
            <FormGroup controlId='food15'>
              <Form.Check type="checkbox" label="Ofenkartoffeln" />
            </FormGroup>
            <FormGroup controlId='food16'>
              <Form.Check type="checkbox" label="Pfannkuchen" />
            </FormGroup>
            <FormGroup controlId='food17'>
              <Form.Check type="checkbox" label="Risotto" />
            </FormGroup>
            <FormGroup controlId='food18'>
              <Form.Check type="checkbox" label="Salatbuffet mit Knobibrot" />
            </FormGroup>
            <FormGroup controlId='food19'>
              <Form.Check type="checkbox" label="Sushi" />
            </FormGroup>
            <FormGroup controlId='food20'>
              <Form.Check type="checkbox" label="Wraps" />
            </FormGroup>
            <Button variant="primary" onClick={handleSave}>
              Submit
            </Button>
          </Form>
        </Container>
      </Col>
    </div>
  );
}

export default App;
