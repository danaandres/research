export const dictionaries = [
    {
        customerName : "Customer 1",
        dictionary : [
            { id: 1, domain: 'Stonegrey', range: 'Dark Grey' },
            { id: 2, domain: 'Dark Grey', range: 'Stone grey' },
            { id: 3, domain: 'Mystic Silver', range: 'Silver' },
            { id: 4, domain: 'Mystic Silver', range: 'Silver1' },
            { id: 5, domain: 'Silver', range: 'Silvercrest' }
        ]
    },
    {
        customerName : "Customer 2",
        dictionary : [
            { id: 1, domain: 'Blue', range: 'Dark Grey' },
            { id: 2, domain: 'Dark Grey', range: 'Black' },
            { id: 2, domain: 'Black', range: 'Blue' },
            { id: 3, domain: 'Mystic Silver/Grey', range: 'Silver' },
            { id: 4, domain: 'Mystic Silver/Grey', range: 'Silver' }
        ]
    }
]

export const dictionaryDefinition = [
    { title: 'Domain', field: 'domain' },
    { title: 'Range', field: 'range' },      
    {
      title: 'Valid',
      field: 'valid',
      editable: 'false',
      lookup: { 1: 'Valid', 2: 'Warning', 3:'Error' },
    },
    { title: 'Details', field: 'details' },      

  ]