import React from 'react';
import App from './App';
import {dictionaries} from './data'
import {dictionaryDefinition} from './data'
import { Button } from '@material-ui/core';

function DictionaryPanel(props) {
    
    const [state, setState] = React.useState({
      dictionaries:dictionaries,
      
      });

      function addDictionary(e){
        var dictionary = {
            customerName : "Customer 3",
            dictionary : []
        };

        setState(prevState => ({
          dictionaries: [...prevState.dictionaries, dictionary]
        }));
      };

      var items = dictionaries.map((dictionary, idx)=>
          <App  context = {dictionary} definition={dictionaryDefinition}/>
      );

      return (
        <div>
        <div>
          <Button onClick={addDictionary}>Wohoo</Button>
        </div>        
        <div>
          {items}
        </div></div>        
    );
}


export default DictionaryPanel;

