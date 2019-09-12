import React from 'react';
import MaterialTable from 'material-table';
import MaterialIcons from 'material-icons';


function App({context, definition}) {
  Validate(context.dictionary);

  const [state, setState] = React.useState({
    columns: definition,
    title:context.customerName,
    data:context.dictionary
    });

  return (
    <MaterialTable
      title={state.title}
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
            }, 600);
          }),
      }}
    />
  );
}

export default App;

function Validate(dictionary){
  dictionary.map((entry, idx)=>{
    dictionary.map((compareEntry, compareIdx)=>{
      if(idx===compareIdx){
        return;
      }

      if(entry.domain===compareEntry.domain && entry.range!==compareEntry.range ){
        entry.valid=2;
        entry.details = 'Fork detected'
      }

      if(entry.range===compareEntry.range && entry.domain===compareEntry.domain){
        entry.valid=2;
        entry.details = 'Domain and range duplicated'
      }

      if(entry.range===compareEntry.domain){
        entry.valid=2;
        entry.details = "Chains with "+ compareEntry.domain;
      }

    });
  });

  dictionary.map((entry, idx)=>{
    var evaluatedIndexes=[idx];
    var chain=[entry];
    ValidatesCycles(dictionary, entry, idx, evaluatedIndexes, chain);
  });
}

function ValidatesCycles(dictionary, entry, idx, evaluatedIdx, chain){
    var chains = dictionary.map((compareEntry, compareIdx)=>{
      if(idx===compareIdx){
        return;
      }
      
      if(entry.range!==compareEntry.domain){
        return;
      }
      
      if(chain[0].domain===compareEntry.range)
      {
        entry.valid=3;
        entry.details="Cycles";
      }

      if(evaluatedIdx.includes(compareIdx) === false) {
        evaluatedIdx.push(compareIdx);
        chain.push(compareEntry);
        ValidatesCycles(dictionary, compareEntry, compareIdx, evaluatedIdx, chain);                
      }

  });
}