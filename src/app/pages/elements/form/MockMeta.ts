export const MockMeta = {
    entity: 'ENTITY_NAME',
    entityMetaUrl: '',
    label: 'ENTITY_LABEL',
    fields: [
        {
            name: 'firstName',
            type: 'text',
            label: 'First Name',
            required: true,
            sortOrder: 10,
            maxLength: 10,
            description: 'First Name, Yo!'
        },
        {
            name: 'groupedItems',
            type: 'group',
            label: 'Groupd Items',
            sortOrder: 11,
            icon: 'section',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    label: 'Label',
                    sortOrder: 10,
                    maxLength: 10
                },
                {
                    name: 'description',
                    type: 'text',
                    label: 'Description',
                    sortOrder: 20
                }
            ]
        },
        {
            name: 'lastName',
            type: 'text',
            label: 'Last Name',
            hint: 'Last Name, Yo!',
            description: 'Last Name, Yo!',
            sortOrder: 20
        },
        {
            name: 'number',
            type: 'number',
            label: 'Number',
            required: true,
            disabled: true,
            sortOrder: 40
        },
        {
            name: 'dateFounded',
            type: 'number',
            label: 'Date Founded',
            dataSpecialization: 'YEAR',
            sortOrder: 40,
            description: 'Year when this company was founded',
        },
        {
            name: 'float',
            type: 'float',
            label: 'Float',
            required: true,
            sortOrder: 50
        },
        {
            name: 'currency',
            type: 'money',
            label: 'Cost',
            currencyFormat: 'USD',
            sortOrder: 60
        },
        {
            name: 'percent',
            type: 'percentage',
            label: 'Percentage',
            required: true,
            sortOrder: 70
        },
        {
            name: 'date',
            type: 'date',
            label: 'Date',
            required: true,
            sortOrder: 90,
            defaultValue: new Date(2016, 1, 1)
        },
        {
            name: 'time',
            type: 'time',
            label: 'Time',
            required: true,
            sortOrder: 100
        },
        {
            name: 'datetime',
            type: 'date-time',
            label: 'DateTime',
            dataSpecialization: 'DATETIME',
            required: true,
            sortOrder: 110
        },
        {
            name: 'status',
            type: 'select',
            dataType: 'String',
            maxLength: 200,
            confidential: false,
            label: 'Status',
            options: [
                {
                    value: 'Open',
                    label: 'Open'
                },
                {
                    value: 'Qualifying',
                    label: 'Qualifying'
                },
                {
                    value: 'Negotiating',
                    label: 'Negotiating'
                },
                {
                    value: 'TRIGGER',
                    label: 'TRIGGER'
                }
            ],
            sortOrder: 120
        },
        {
            name: 'nextAction',
            type: 'tiles',
            dataType: 'String',
            label: 'Next Action',
            required: true,
            options: [
                {
                    value: 'none',
                    label: 'None'
                },
                {
                    value: 'task',
                    label: 'Task'
                },
                {
                    value: 'appointment',
                    label: 'Appointment'
                }
            ],
            sortOrder: 130
        },
        {
            name: 'state',
            type: 'picker',
            dataType: 'String',
            maxLength: 200,
            confidential: false,
            label: 'State',
            required: true,
            // TODO: Align picker with META by passing META obj into picker
            // options: [ /* flat array of states */ ]
            options: {
                options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
                    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
                    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
                    'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
                    'West Virginia', 'Wisconsin', 'Wyoming']
            },
            sortOrder: 530
        }, {
            name: 'startDate',
            type: 'datetime',
            dataType: 'Timestamp',
            label: 'Start Date',
            disabled: true,
            required: true,
            sortOrder: 540
        }, {
            name: 'quota',
            type: 'number',
            dataType: 'Integer',
            label: 'Quota',
            required: true,
            sortOrder: 550
        }, {
            name: 'secret',
            type: 'hidden',
            dataType: 'String',
            label: 'Top Secret',
            required: true,
            defaultValue: 'The secret code is: 08322',
            sortOrder: 560
        }, {
            name: 'categories',
            type: 'picker',
            confidential: false,
            optional: false,
            label: 'Categories',
            required: true,
            readOnly: false,
            multiValue: true,
            inputType: 'SELECT',
            options: [
                {
                    value: 'Open',
                    label: 'Open'
                },
                {
                    value: 'Qualifying',
                    label: 'Qualifying'
                },
                {
                    value: 'Negotiating',
                    label: 'Negotiating'
                },
                {
                    value: 'TRIGGER',
                    label: 'TRIGGER'
                }
            ],
            sortOrder: 570
        }, {
            name: 'owner',
            type: 'entity',
            confidential: false,
            optional: false,
            label: 'Owner',
            required: false,
            readOnly: true,
            multiValue: false,
            inputType: 'SELECT',
            optionsType: 'CorporateUser',
            optionsUrl: '/options/CorporateUser',
            hideFromSearch: false,
            associatedEntity: {
                entity: 'CorporateUser',
                label: 'Corporate User'
            },
            sortOrder: 580
        }, {
            name: 'address',
            type: 'address',
            dataType: 'Address',
            dataSpecialization: 'SYSTEM',
            confidential: false,
            optional: true,
            label: 'Address',
            required: false,
            readOnly: false,
            multiValue: false,
            hideFromSearch: true,
            tooltip: 'Address Block',
            fields: [
                {
                    name: 'address1',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 40,
                    confidential: false,
                    optional: true,
                    label: 'Addressxxx',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    hideFromSearch: false,
                    defaultValue: '100 Summer St'
                },
                {
                    name: 'address2',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 40,
                    confidential: false,
                    optional: true,
                    label: 'Address 2',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    hideFromSearch: false,
                    defaultValue: 'apt 25'
                },
                {
                    name: 'city',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 40,
                    confidential: false,
                    optional: true,
                    label: 'City',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    hideFromSearch: false
                },
                {
                    name: 'state',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 30,
                    confidential: false,
                    optional: true,
                    label: 'State',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    inputType: 'SELECT',
                    optionsType: 'StateText',
                    optionsUrl: 'http://optimus-backend.bh-bos2.bullhorn.com:8181/rest-services/1hs/options/StateText',
                    hideFromSearch: false
                },
                {
                    name: 'zip',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 15,
                    confidential: false,
                    optional: true,
                    label: 'Zip',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    hideFromSearch: false
                },
                {
                    name: 'countryID',
                    type: 'SCALAR',
                    dataType: 'Integer',
                    confidential: false,
                    optional: false,
                    label: 'Country',
                    required: false,
                    readOnly: false,
                    multiValue: false,
                    inputType: 'SELECT',
                    optionsType: 'Country',
                    optionsUrl: 'http://optimus-backend.bh-bos2.bullhorn.com:8181/rest-services/1hs/options/Country',
                    defaultValue: 2260,
                    hideFromSearch: false
                },
                {
                    name: 'countryCode',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 0,
                    optional: true
                },
                {
                    name: 'countryName',
                    type: 'SCALAR',
                    dataType: 'String',
                    maxLength: 0,
                    optional: true
                }
            ],
            sortOrder: 590
        },
        {
            name: 'checkbox',
            type: 'checkbox',
            label: 'Checkbox',
            sortOrder: 600
        },
        {
            name: 'checklist',
            type: 'checklist',
            label: 'CheckList',
            options: ['Morning', 'Day', 'Night', 'Overnight'],
            required: true,
            sortOrder: 610
        },
        {
            name: 'address',
            type: 'address',
            label: 'Address',
            required: true,
            sortOrder: 620
        },
        {
            name: 'attachments',
            type: 'file',
            label: 'Attachments',
            multiValue: true,
            required: true,
            sortOrder: 630
        },
        {
            name: 'attachments',
            type: 'file',
            label: 'Attachments',
            multiValue: true,
            required: true,
            sortOrder: 630
        }, {
            defaultValue: 'Cold',
            inputType: 'RADIO',
            label: 'Types/Ratings',
            maxLength: 100,
            multiValue: false,
            name: 'type',
            optional: true,
            options: [
                {
                    value: 'Hot',
                    label: 'Hot'
                },
                {
                    value: 'Cold',
                    label: 'Cold'
                },
                {
                    value: 'Eh...',
                    label: 'Eh...'
                }
            ],
            required: true,
            sortOrder: 9000
        }, {
            inputType: 'RADIO',
            label: 'Like?',
            maxLength: 100,
            multiValue: false,
            name: 'like',
            optional: true,
            options: [
                {
                    value: 'Yes',
                    label: 'Yes',
                    icon: 'check'
                },
                {
                    value: 'No',
                    label: 'No',
                    icon: 'times'
                }
            ],
            required: true,
            sortOrder: 9000
        }, {
            name: 'comments',
            type: 'textarea',
            label: 'Comments',
            required: true,
            sortOrder: 9010,
            maxLength: 150,
            description: 'Comments, Please'
        }, {
            name: 'customfield',
            label: 'Custom Component',
            required: true,
            description: 'This is a custom component you can use instead'
        }, {
            name: 'htmlFieldFullEditor',
            label: 'CK Editor - Full',
            required: true,
            sortOrder: 9011,
            dataSpecialization: 'HTML',
            type: 'SCALAR',
            dataType: 'String'
        }, {
            name: 'htmlFieldMinimalEditor',
            label: 'CK Editor - Minimal',
            required: true,
            sortOrder: 9012,
            dataSpecialization: 'HTML-MINIMAL',
            type: 'SCALAR',
            dataType: 'String'
        }
    ]
};
export const MockMetaHeaders = {
    sectionHeaders: [{
        'label': 'Section With Custom Icon',
        'name': 'sectionHeader3',
        'sortOrder': 600,
        'enabled': true,
        'icon': 'bhi-certification'
    }, {
        'label': 'Section 2',
        'name': 'sectionHeader2',
        'sortOrder': 500,
        'enabled': true
    }, {
        'label': 'Section 1',
        'name': 'sectionHeader1',
        'sortOrder': 45,
        'enabled': true
    }],
};
Object.assign(MockMetaHeaders, MockMeta);
