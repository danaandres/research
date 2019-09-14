import React from 'react';
import App from './App';
import {predefinedDictionaries} from './data';
import {dictionaryDefinition} from './data';
import styled from 'styled-components';

function loadDictionaries(){
  return JSON.parse(localStorage.getItem("data")|| JSON.stringify(predefinedDictionaries));
}

function saveDictionaries(dictionaries){
  localStorage.setItem("data",JSON.stringify(dictionaries));
}

class DictionaryPanel extends React.Component {
  constructor(props) {
      super(props);

      var workingDictionaries = loadDictionaries();
            
      this.state ={
        dictionaries:workingDictionaries,         
        };
        
        this.addDictionary = this.addDictionary.bind(this);
    }

    addDictionary(){
        var dictionary = {
            customerName : 'Customer '+(this.state.dictionaries.length+1),
            dictionary : []
        }
        
        var state = this.state;

        state.dictionaries.push(dictionary);
        
        saveDictionaries(state.dictionaries);

        this.setState(state);  

      }

      render(){

        var items = this.state.dictionaries.map((dictionary, idx)=>
            <App  context = {dictionary} definition={dictionaryDefinition} entireCatalog={this.state.dictionaries}/>
        );

         const CounterContainer= styled.div`
           width: 80%;`

        return (
            <CounterContainer>
            <div>
             <Button onClick={this.addDictionary} >Add Customer</Button>
            </div>        
            <div>
              {items}
            </div>
            </CounterContainer>        
        );
      }
}
export const Button = styled.button `
color: grey;
font-size: 15px;
hover: pointer;
font-family: "Trebuchet MS", Arial, Helvetica, sans-serif`

export default DictionaryPanel;

