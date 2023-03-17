import { React, useState } from 'react';
import {Row, Col, Form, Button, Container, FormGroup } from 'react-bootstrap'
//import AddSuggestion from './components/AddSuggestion';

var XMLWriter  = require('xml-writer');

function App() {

  const [ suggestions, setSuggestions ] = useState([])
  const [ breakfast, setBreakfast ] = useState([])

  const [listIdSugg, setListIdSugg] = useState(1)
  const [listIdBreak, setListIdBreak] = useState(1)

  const [formData, setFormData] = useState({
    name: '',
    list_suggestions: [],
    list_breakfast: [],
    id: null
  })

  const updateSuggestion = (suggestionObj) => {
    const updatedSuggestions = formData.list_suggestions.map((suggestion) => {
      if (suggestion.listId === suggestionObj.listId) {
        return suggestionObj
      }
      return suggestion
    })
    setFormData({...formData, list_suggestions: updatedSuggestions})
  }

  const updateBreakfast = (BreakfastObj) => {
    const updatedBreakfast = formData.list_breakfast.map((breakfast) => {
      if (breakfast.listId === BreakfastObj.listId) {
        return BreakfastObj
      }
      return breakfast
    })
    setFormData({...formData, list_breakfast: updatedBreakfast})
  }
  
  const removeSuggestion = (suggestionObj) => {
    const updatedSuggestions = formData.list_suggestions.filter((suggestion) => suggestion.listId !== suggestionObj.listId)
    setFormData({...formData, list_suggestions: updatedSuggestions})
  }

  const removeBreakfast = (breakfastObj) => {
    const updatedBreakfast = formData.list_breakfast.filter((breakfast) => breakfast.listId !== breakfastObj.listId)
    setFormData({...formData, list_breakfast: updatedBreakfast})
  }
  
  const addSuggestion = () => {

    setFormData({...formData, list_suggestions: [
        ...formData.list_suggestions, {
          listId: listIdSugg,
          SuggestionName : ''
        }
      ]
    })
    setListIdSugg(listIdSugg + 1)
  }

  const addBreakfast = () => {

    setFormData({
      ...formData, list_breakfast: [
        ...formData.list_breakfast,{
          listId: listIdBreak,
          BreakfastName : ' '
        }
      ]
    })
    setListIdBreak(listIdBreak + 1)
  }

  function get(object, key, default_value) {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
  }

  const renderSuggestion = formData.list_suggestions.map(suggestion => <AddSuggestion 
    key={suggestion.listId} 
    suggestion={suggestion} 
    listId={listIdSugg - 1} 
    updateSuggestion={updateSuggestion} 
    removeSuggestion={removeSuggestion}
    fieldname={'suggestion' + suggestion.listId} 
  />)

  const renderBreakfast = formData.list_breakfast.map(breakfast => <AddBreakfast
    key={breakfast.listId} 
    breakfast={breakfast} 
    listId={listIdBreak - 1} 
    updateBreakfast={updateBreakfast} 
    removeBreakfast={removeBreakfast} 
    fieldname={'breakfast' + breakfast.listId}
  />)

  const handleSave = () => {
    
    var XMLHttpRequest = require('xhr2');
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://busch.click:3000/user");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    let suggest = "";
    let breakf = "";

    formData.list_suggestions.map(suggestion =>
      suggest = suggest + "," + get(suggestion, "SuggestionName", 'default'))

    formData.list_breakfast.map(brk =>
      breakf = breakf + "," + get(brk, "BreakfastName", 'default'))

    
    suggest = suggest.substring(1);
    breakf = breakf.substring(1);
    const body = JSON.stringify({
      name: formData.name,
      sugg: suggest,
      break: breakf
    });
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 201) {
        console.log(JSON.parse(xhr.responseText));
        alert("Danke, du kannst die Seite jetzt schließen ^^")
        window.location.reload();
      } else {
        alert("Da ist etwas schief gelaufen. Sag Johann Bescheid");
      }
    };
    //console.log(body);
    xhr.send(body);

    /*
    var out = new XMLWriter ;
    out.startDocument();
    out.startElement('user');
    out.writeAttribute('name', formData.name);
    out.startElement('Suggestions');
    formData.list_suggestions.map(suggestion =>
          out.startElement('suggestion').writeAttribute('name', get(suggestion, "SuggestionName", 'default')).endElement()
    )
    out.endElement();
    out.startElement('Breakfast');
    formData.list_breakfast.map(breakfast =>
      out.startElement('breakfast').writeAttribute('name', get(breakfast, "BreakfastName", 'default')).endElement()
    )
    out.endElement();
    out.endElement();
    out.endDocument();
    console.log(out.toString());*/
  }



  return (
    <div>
      <Container>
        
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={formData.name} placeholder="Hier deinen Namen" onChange={e => setFormData({...formData, name: e.target.value})} /> 
            </Form.Group>

            <br></br>
            <a>Hast du Vorschläge was wir die Woche über kochen könnten?</a>
            <br></br>
            <br></br>
            
            {renderSuggestion}
            
            <br></br>

            <Button variant="primary" onClick={addSuggestion}>Essensvorschlag hinzufügen</Button>
            
            <br></br>
            <br></br>
            <a>Was darf für dich beim Frühstück nicht fehlen?</a>
            <br></br>
            <br></br>
            
            {renderBreakfast}
            
            <br></br>

            <Button variant="primary" onClick={addBreakfast}>Frühstück hinzufügen</Button>

            <br></br>
            <br></br>

            <Button variant="primary" onClick={handleSave}>Save</Button>
          </Form>
        
      </Container>
    </div>
    
  );
}

const AddSuggestion = ({ suggestion, updateSuggestion, removeSuggestion, fieldname }) => {

  const handleNameChange = (e) => {
      updateSuggestion({...suggestion, SuggestionName: e.target.value})
  }

return (
  <Row>
    <Col>
      <FormGroup>
        <Form.Control type="text" name={fieldname} onChange={handleNameChange}/>
      </FormGroup>
    </Col>
    <Col xs={'auto'}>
      <Button 
        onClick={e => removeSuggestion(suggestion)} 
        variant='outline-dark'
      >x</Button>
    </Col>
  </Row>
)
}

const AddBreakfast = ({ breakfast, updateBreakfast, removeBreakfast, fieldname }) => {

  const handleNameChange = (e) => {
      updateBreakfast({...breakfast, BreakfastName: e.target.value})
  }

return (
  <div>
    <Row>
      <Col>
        <FormGroup>
          <Form.Control type="text" name={fieldname} onChange={handleNameChange}/>
        </FormGroup>
      </Col>
      <Col xs={'auto'}>
        <Button 
          onClick={e => removeBreakfast(breakfast)} 
          variant='outline-dark'
        >x</Button>
      </Col>
    </Row>
  </div>
)
}

export default App;
