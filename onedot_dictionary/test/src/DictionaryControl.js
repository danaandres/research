import React from 'react';
import MaterialTable from 'material-table';
import MaterialIcons from 'material-icons';
import styled from 'styled-components';


function saveDictionaries(state, data){ 
  var dictionaries = state.dictionaryCatalog;
  
  var updatedDictionaries = dictionaries.map((d, _)=>{
    if(d.customerName == state.customerName){    
      d.dictionary = data;
    }

    return d;
  });
  localStorage.setItem("data", JSON.stringify(updatedDictionaries));
}

function DictionaryControl({ context, definition, entireCatalog }) {
  Validate(context.dictionary);

  const [state, setState] = React.useState({
    columns: definition,
    customerName: context.customerName,
    data: context.dictionary,
    dictionaryCatalog:entireCatalog
  });

  const Button = styled.button`
    color: grey;
    font-size: 15px;
    hover: pointer;
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif`

  return (
    <div>
      <MaterialTable
        title={state.customerName}
        columns={state.columns}
        data={state.data}

        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.push(newData);
                Validate(data);       

                setState({ ...state, data });
                saveDictionaries({...state}, data);
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                var data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                Validate(data);

                setState({ ...state, data });                
                saveDictionaries({...state}, data);
                
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                Validate(data);

                setState({ ...state, data });
                saveDictionaries({...state}, data);
              }, 600);
            }),
        }}
        options={{
          headerStyle: {
            backgroundColor: 'grey',
            color: 'grey',
            fontFamily: '"Trebuchet MS", Arial, Helvetica, sans-serif',
          }
        }}
        options={{
          rowStyle: {
            backgroundColor: 'whitesmoke',
            textAlign: 'center',
            fontFamily: '"Trebuchet MS", Arial, Helvetica, sans-serif',
            borderCollapse: 'collapse',
            border: '3px solid #ddd',
            width: '80%',

          }
        }}
      />
    </div>

  );

}



function Validate(dictionary) {
  dictionary.map((entry, idx) => {
    dictionary.map((compareEntry, compareIdx) => {
      if (idx === compareIdx) {
        return;
      }

      if (entry.domain === compareEntry.domain && entry.range !== compareEntry.range) {
        entry.valid = 2;
        entry.details = 'Fork detected'
      }

      if (entry.range === compareEntry.range && entry.domain === compareEntry.domain) {
        entry.valid = 2;
        entry.details = 'Domain and range duplicated'
      }

      if (entry.range === compareEntry.domain) {
        entry.valid = 2;
        entry.details = "Chains with " + compareEntry.domain;
      }

    });
  });

  dictionary.map((entry, idx) => {
    var evaluatedIndexes = [idx];
    var chain = [entry];
    ValidatesCycles(dictionary, entry, idx, evaluatedIndexes, chain);
  });


}

function ValidatesCycles(dictionary, entry, idx, evaluatedIdx, chain) {
  var chains = dictionary.map((compareEntry, compareIdx) => {
    if (idx === compareIdx) {
      return;
    }

    if (entry.range !== compareEntry.domain) {
      return;
    }

    if (chain[0].domain === compareEntry.range) {
      entry.valid = 3;
      entry.details = "Cycles";
    }

    if (evaluatedIdx.includes(compareIdx) === false) {
      evaluatedIdx.push(compareIdx);
      chain.push(compareEntry);
      ValidatesCycles(dictionary, compareEntry, compareIdx, evaluatedIdx, chain);
    }

  });
}

export default DictionaryControl