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
        groupTitle: 'Edges',
        buttons:[
            { 
                name: 'Color: -ve', 
                funct: function(){settings.links.colNeg=this.value;},
                type: 'textForm',
                default: 'blue',
                size: 8,
                id: 'e-cn',
            },
            { 
                name: 'Color: +ve', 
                funct: function(){settings.links.colPos=this.value;},
                type: 'textForm',
                default: 'red',
                size: 8,
                id: 'e-cp',
            },
            { 
                name: 'Width', 
                funct: function(){
                    settings.links.scaleToBeta.minWidth=Number(this.value);
                    settings.links.scaleToBeta.scaleFactor=Number(this.value)*3;
                },
                type: 'textForm',
                default: 1,
                size: 2,
                id: 'e-w',
            },
            { 
                name: 'Width: Scale to beta', 
                funct: function(){
                    settings.links.scaleToBeta.method = 'none'; 
                    settings.links.width = function(){return(settings.links.scaleToBeta.minWidth)};
                },
                type: 'checkbox',
                default: true,  
                id: 'e-s2b',
            },
            { 
                name: 'Opacity', 
                funct: function(){settings.links.opacity=this.value;},
                type: 'textForm',
                default: '90%',
                size: 4,
                id: 'e-o',
            },
            { 
                name: 'Filter: By method', 
                funct: function(){settings.data.mrMethods=this.value;},
                type: 'textForm',
                default: 'all methods',
                size: 20,
                id: 'e-f',
            },
            { 
                name: 'Causal data', 
                funct: function(){settings.data.observational = this.value},
                type: 'radio',
                default: true,
                value: 'Causal data',
                group: 'Data',
                id: 'e-dc',
            },
            { 
                name: 'Observational data*', 
                funct: function(){settings.data.observational = this.value},
                type: 'radio',
                default: false,
                value: 'Observational data',
                group: 'Data',
                id: 'e-do',
            },
            { 
                name: 'Arrows: Bi-directional arrows', 
                funct: function(){
                    settings.links.bidirectional.enabled = !(settings.links.bidirectional.enabled);
                    settings.links.multiEdges.enabled = !(settings.links.bidirectional.enabled);
                },
                type: 'checkbox',
                default: true,  
                id: 'e-abi',
            },
        ]
    },
    {
        groupTitle: 'Labels',
        buttons:[
            { 
                name: 'Color: Background', 
                funct: function(){settings.nodes.labels.background=this.value;},
                type: 'textForm',
                default: 'none',
                size: 10,
                id: 'l-cbg',
            },
            { 
                name: 'Color: Text shadow', 
                funct: function(){settings.nodes.labels.outlineColor=this.value;},
                type: 'textForm',
                default: 'none',
                size: 10,
                id: 'l-ts',
            },
            { 
                name: 'Display names', 
                funct: function(){
                    settings.nodes.labels.enabled = true;
                    settings.nodes.labels.content=d => d[this.value];
                    settings.nodes.icons.enabled = false;},
                type: 'radio',
                default: true,
                value: 'label',
                group: 'Trait labels',
                id: 'l-dn',
            },
            { 
                name: 'Display IDs', 
                funct: function(){
                    settings.nodes.labels.enabled = true;
                    settings.nodes.labels.content=d => d[this.value];
                    settings.nodes.icons.enabled = false;},
                type: 'radio',
                default: false,
                value: 'id',
                group: 'Trait labels',
                id: 'l-did',
            },
            { 
                name: 'Display Icons*', 
                funct: function(){
                    settings.nodes.labels.enabled = false;
                    settings.nodes.icons.enabled = true; },
                type: 'radio',
                default: false,
                value: 'icon',
                group: 'Trait labels',
                id: 'l-dic',
            },
            { 
                name: 'Better names: Rename traits', 
                funct: function(){settings.data.cleaning.enabled = toggleSetting(settings.data.cleaning.enabled);console.log(settings.data.cleaning.enabled)},
                type: 'checkbox',
                default: true,
                id: 'l-bn',
            },
            { 
                name: 'Position right', 
                funct: function(){settings.nodes.labels.posX = 16; settings.nodes.labels.anchor = this.value;},
                type: 'radio',
                default: true,
                value: 'none',
                group: 'Label placement',
                id: 'l-pr',
            },
            { 
                name: 'Position in middle', 
                funct: function(){settings.nodes.labels.posX = 0; settings.nodes.labels.anchor = this.value;},
                type: 'radio',
                default: false,
                value: 'middle',
                group: 'Label placement',
                id: 'l-pm',
            },
        ]
    },
    {
        groupTitle: 'Nodes',
        buttons:[
            { 
                name: 'Color: Fill', 
                funct: function(){settings.nodes.fill=this.value;},
                type: 'textForm',
                default: 'white',
                size: 8,
                id: 'n-cf',
            },
            { 
                name: 'Color: Outline', 
                funct: function(){settings.nodes.strokeColor=this.value;},
                type: 'textForm',
                default: 'black',
                size: 8,
                id: 'n-co',
            },
            { 
                name: 'Opacity', 
                funct: function(){settings.nodes.opacity=this.value;},
                type: 'textForm',
                default: '100%',
                size: 4,
                id: 'n-o',
            },
            { 
                name: 'Size', 
                funct: function(){settings.nodes.circleRadius=this.value;},
                type: 'textForm',
                default: 15,
                size: 4,
                id: 'n-s',
            },
            { 
                name: 'Per-node coloring*', 
                funct: function(){settings.nodes.fillFromCSV = true; settings.nodes.fill = d => d.color;},
                type: 'checkbox',
                default: false,
                id: 'n-cpn',  
            },
        ]
    },
    {
        groupTitle: 'General',
        buttons:[
            { 
                name: 'Background color', 
                funct: function(){
                    document.getElementById('svg-main').style.backgroundColor=this.value;
                    document.body.style.backgroundColor=this.value;
                },
                type: 'textForm',
                default: 'ghostwhite',
                size: 8,
                id: 'g-cbg',
            },
            { 
                name: 'Font', 
                funct: function(){settings.nodes.labels.font=this.value;},
                type: 'textForm',
                default: 'Rubik, sans-serif',
                size: 15,
                id: 'g-ff',
            },
            { 
                name: 'Font size', 
                funct: function(){settings.nodes.labels.fontSize=this.value;},
                type: 'textForm',
                default: 19,
                size: 3,
                id: 'g-fs',
            },
            { 
                name: 'Text color', 
                funct: function(){settings.nodes.labels.color=this.value;},
                type: 'textForm',
                default: 'black',
                size: 10,
                id: 'g-fc',
            },
            { 
                name: 'Node spacing', 
                funct: function(){settings.simulation.strength=this.value;},
                type: 'textForm',
                default: -3000,
                size: 5,
                id: 'g-s',
            },
        ]
    }
]

// Presets
function loadPreset(style){

    // Reset settings
    setPreset([
        {formId: 'sett-btn-e-cn', value: 'blue'},
        {formId: 'sett-btn-e-cp', value: 'red'},
        {formId: 'sett-btn-e-w', value: 1},
        {formId: 'sett-btn-e-o', value: '90%'},
        {formId: 'sett-btn-l-pr', value: true, checkbox: true},
        {formId: 'sett-btn-l-cbg', value: 'none'},
        {formId: 'sett-btn-n-o', value: '100%'},
        {formId: 'sett-btn-n-cf', value: 'white'},
        {formId: 'sett-btn-n-co', value: 'black'},
        {formId: 'sett-btn-n-s', value: 15},
        {formId: 'sett-btn-g-ff', value: 'Rubik, sans-serif'},
        {formId: 'sett-btn-g-fs', value: 19},
        {formId: 'sett-btn-g-fc', value: 'black'},
        {formId: 'sett-btn-g-s', value: -3000},
        {formId: 'sett-btn-g-cbg', value: 'white'},
    ]);

    // Identify preset
    switch(style){
        case 0:
            break;
        case 1:
            setPreset([
                {formId: 'sett-btn-l-pm', value: true, checkbox: true},
                {formId: 'sett-btn-l-cbg', value: 'yellow'},
                {formId: 'sett-btn-n-o', value: '0%'},
                {formId: 'sett-btn-e-o', value: '100%'},
                {formId: 'sett-btn-e-w', value: 2},
                {formId: 'sett-btn-n-s', value: 30},
                {formId: 'sett-btn-g-ff', value: 'Times new roman'},
                {formId: 'sett-btn-g-fs', value: 24},
                {formId: 'sett-btn-g-s', value: -4000},
            ]);
            break;
        case 2:
            setPreset([
                {formId: 'sett-btn-l-pm', value: true, checkbox: true},
                {formId: 'sett-btn-e-cn', value: '#008891'},
                {formId: 'sett-btn-e-cp', value: '#b83b5e'},
                {formId: 'sett-btn-e-w', value: 2},
                {formId: 'sett-btn-e-o', value: '100%'},
                {formId: 'sett-btn-n-o', value: '0%'},
                {formId: 'sett-btn-n-s', value: 30},
                {formId: 'sett-btn-g-ff', value: 'Helvetica'},
            ]);
            break;
        case 3:
            setPreset([
                {formId: 'sett-btn-e-cn', value: '#646464'},
                {formId: 'sett-btn-e-cp', value: '#ff9642'},
                {formId: 'sett-btn-e-o', value: '100%'},
                {formId: 'sett-btn-n-cf', value: 'black'},
                {formId: 'sett-btn-n-co', value: 'none'},
                {formId: 'sett-btn-n-s', value: 5},
                {formId: 'sett-btn-g-ff', value: 'Segoe UI'},
            ]);
            break;
        case 4:
            setPreset([
                {formId: 'sett-btn-l-pm', value: true, checkbox: true},
                {formId: 'sett-btn-e-cn', value: '#b9fffc'},
                {formId: 'sett-btn-e-cp', value: 'white'},
                {formId: 'sett-btn-e-o', value: '100%'},
                {formId: 'sett-btn-n-cf', value: '#01c5c4'},
                {formId: 'sett-btn-n-co', value: 'none'},
                {formId: 'sett-btn-n-s', value: 50},
                {formId: 'sett-btn-e-w', value: 2},
                {formId: 'sett-btn-g-cbg', value: '#132743'},
                {formId: 'sett-btn-g-fc', value: 'white'},
                {formId: 'sett-btn-g-s', value: -5000},
            ]);
            break;
        case 5:
            setPreset([
                {formId: 'sett-btn-e-cn', value: '#0f3057'},
                {formId: 'sett-btn-e-cp', value: '#008891'},
                {formId: 'sett-btn-e-o', value: '100%'},
                {formId: 'sett-btn-n-cf', value: '#e7e7de'},
                {formId: 'sett-btn-n-co', value: '#00587a'},
                {formId: 'sett-btn-n-s', value: 10},
                {formId: 'sett-btn-e-w', value: 1},
                {formId: 'sett-btn-g-cbg', value: '#e7e7de'},
            ]);
            break;
    }

    // Apply preset
    function setPreset(settings){
        for(const setting of settings){
            var ele = document.getElementById(setting.formId);
                if(setting.checkbox){ele.checked = setting.value}
                else{ele.value = setting.value;}
                ele.dispatchEvent(new Event('change'));
        }
    }
}