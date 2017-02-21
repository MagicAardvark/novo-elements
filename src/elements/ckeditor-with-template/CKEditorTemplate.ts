// NG2
import { Component, Input, Output, ViewChild, EventEmitter, NgZone, forwardRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NovoCKEditorElement } from './../ckeditor/CKEditor';
import { NovoCategoryDropdownElement } from './../category-dropdown/CategoryDropdown';

// Value accessor for the component (supports ngModel)
const CKEDITORTEMPLATE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoCKEditorTemplateElement),
    multi: true
};

/**
 * CKEditor component
 * Usage :
 *  <novo-editor [(ngModel)]="data" [config]="{...}" debounce="500"></novo-editor>
 */
@Component({
    selector: 'novo-editor-template',
    providers: [CKEDITORTEMPLATE_CONTROL_VALUE_ACCESSOR],
    template: `
        <novo-category-dropdown *ngIf="options" [categories]="options" (itemSelected)="select($event)" [footer]="footerConfig" search="true" closeOnSelect="true">
            <button type="button" theme="dialogue" icon="collapse"><i class="bhi-calender"></i> my title</button>
        </novo-category-dropdown>
        <textarea [name]="name" [id]="name" #host></textarea>
    `
})
export class NovoCKEditorTemplateElement extends NovoCKEditorElement implements OnDestroy, AfterViewInit {
    @Input() config;
    @Input() debounce;
    @Input() name;

    @Output() change = new EventEmitter();
    @Output() ready = new EventEmitter();
    @Output() blur = new EventEmitter();
    @Output() focus = new EventEmitter();
    @Output() paste = new EventEmitter();
    @Output() loaded = new EventEmitter();
    @ViewChild('host') host;

    _value: string = '';
    instance;
    debounceTimeout;
    options = {
  'My Templates': [{
      'label': 'Desiree Test - Delete Me If I Am Not the Owner',
      'value': 59
    }],
  'My Departments Templates': [
    {
      'label': 'Desiree Test - Delete Me If I Am Not the Owner',
      'value': 59
    },
    {
      'label': 'Smoke Test00 - does this show up',
      'value': 77
    },
    {
      'label': 'Smoke Test00 - Testing File attachment',
      'value': 86
    },
    {
      'label': 'Smoke Test00 - Testing Font',
      'value': 102
    }
  ],
  'All Templates': [
    {
      'label': 'Bansri R x-Browser - cross browser test',
      'value': 130
    },
    {
      'label': 'Laura Nimon - New Hire Welcome',
      'value': 119
    },
    {
      'label': 'Courtney Test - New Leads Thank You',
      'value': 44
    },
    {
      'label': 'Ryan Lopes - one two three',
      'value': 79
    },
    {
      'label': 'shawnedge smoketest - SIMBA TEST',
      'value': 91
    },
    {
      'label': 'Steve Smoketest - Template attachment test 2',
      'value': 80
    },
    {
      'label': 'Steve Smoketest - Templete to test file attachments',
      'value': 78
    },
    {
      'label': 'Hc Test - Test Template (Hc Test)',
      'value': 41
    },
    {
      'label': 'Abraham Smoketest - Test template -Abe',
      'value': 105
    }
  ]
};

    constructor(zone: NgZone) {
        super(zone);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }
}
