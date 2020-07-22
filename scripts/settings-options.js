/*

Options
=======
Description:
This file contains options for the visualisation.

Use:
The main file uses this collection of options to populate buttons using methods from settings-btn-builder.

*/

// List of options {label on btn:, function to run:, type of btn:,}
const options = [ 
    { 
        name: '-ve links:', 
        funct: function(){settings.links.colNeg=this.value;},
        type: 'textForm',
        default: true,
    },
    { 
        name: '+ve links:', 
        funct: function(){settings.links.colPos=this.value;},
        type: 'textForm',
        default: true,
    },
    { 
        name: 'Scale line width to beta', 
        funct: function(){settings.links.width = d => d.b},
        type: 'checkbox',
        default: false,  
    },
    { 
        name: 'Names', 
        funct: function(){settings.nodes.labels.content=d => d[this.value]},
        type: 'radio',
        default: true,
        value: 'label',
        group: 'Trait labels',
    },
    { 
        name: 'IDs', 
        funct: function(){settings.nodes.labels.content=d => d[this.value]},
        type: 'radio',
        default: false,
        value: 'id',
        group: 'Trait labels',
    },
    { 
        name: 'Data cleaning: Better names', 
        funct: function(){settings.data.cleaning.enabled = toggleSetting(settings.data.cleaning.enabled);console.log(settings.data.cleaning.enabled)},
        type: 'checkbox',
        default: true,
    },
]

/*

{ 
    name: 'Label nodes by ID', 
    funct: function(){settings.nodes.content=d => d.id},
    type: 'radio',
},

// Full data cleaning options
removeHyphens: true, // Data cleaning, removes hyphens from IDs
removeMRBaseId: true, // Remove MR base ID from name (e.g., default R output name)
removeCategory: true, // Remove identified categories following structure typical for UKB variables (cat:name)
shorten: true, // Shorten names if over n chars



*/