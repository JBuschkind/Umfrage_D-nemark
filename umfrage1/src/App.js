import { React, useState, useEffect, TextField } from 'react';
import { Stack, Row, Col, Form, Button, FloatingLabel, Container } from 'react-bootstrap'
//import AddSuggestion from './components/AddSuggestion';

var XMLWriter  = require('xml-writer');

function App() {

  const [ suggestions, setSuggestions ] = useState([])
  const [ breakfast, setBreakfast ] = useState([])

  const [listIdSugg, setListIdSugg] = useState(1)
  const [listIdBreak, setListIdBreak] = useState(1)

  const [formData, setFormData] = useState({
    name: ' ',
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
          Breakfast_id: 0,
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
    console.log(out.toString());
  }



  return (
    <Container>
      
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Hier deinen Namen" 
            />
          </FloatingLabel>

          <Row>
            <br></br>
          </Row>
            {renderSuggestion}
          <Row>
            <br></br>
            <Button 
              variant='warning' 
              onClick={addSuggestion}
            >Hinzufgen</Button>
          </Row>
          <br></br>
          <Row>
            <br></br>
          </Row>
            {renderBreakfast}
          <Row>
            <br></br>
            <Button 
              variant='warning' 
              onClick={addBreakfast}
            >Hinzufgen</Button>
          </Row>
          <Button variant='warning' onClick={handleSave}>Save</Button>
        </Form>
      
    </Container>
    
  );
}

const AddSuggestion = ({ suggestion, updateSuggestion, removeSuggestion, fieldname }) => {

  const handleNameChange = (e) => {
      updateSuggestion({...suggestion, SuggestionName: e.target.value})
  }

return (
  <Row>
    <Col>
      <input type="text" name={fieldname} onChange={handleNameChange}/>
    </Col>
    <Col xs={1}>
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
  <Row>
    <Col>
      <input type="text" name={fieldname} onChange={handleNameChange}/>
    </Col>
    <Col xs={1}>
      <Button 
        onClick={e => removeBreakfast(breakfast)} 
        variant='outline-dark'
      >x</Button>
    </Col>
  </Row>
)
}

export default App;
