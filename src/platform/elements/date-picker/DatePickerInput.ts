// NG
import { ChangeDetectorRef, Component, ElementRef, forwardRef, Host, Input, Inject, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TAB, ENTER, ESCAPE } from '@angular/cdk/keycodes';
// Vendor
import { TextMaskModule } from 'angular2-text-mask';
// App
import { NovoDatePickerElement } from './DatePicker';
import { NovoOverlayTemplate } from '../overlay/Overlay';
import { NovoLabelService } from '../../services/novo-label-service';
import { DateFormatService } from '../../services/date-format/DateFormat';
import { Helpers } from '../../utils/Helpers';


// Value accessor for the component (supports ngModel)
const DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoDatePickerInputElement),
    multi: true
};

@Component({
    selector: 'novo-date-picker-input',
    providers: [DATE_VALUE_ACCESSOR],
    template: `
        <input type="text" [name]="name" [value]="formattedValue" [textMask]="maskOptions" [placeholder]="placeholder" (focus)="openPanel()" (keydown)="_handleKeydown($event)" (input)="_handleInput($event)" #input/>
        <i *ngIf="!hasValue" (click)="openPanel()" class="bhi-calendar"></i>
        <i *ngIf="hasValue" (click)="clearValue()" class="bhi-times"></i>

        <novo-overlay-template [parent]="element">
            <novo-date-picker inline="true" (onSelect)="setValueAndClose($event)" [ngModel]="value"></novo-date-picker>
        </novo-overlay-template>
  `
})
export class NovoDatePickerInputElement implements ControlValueAccessor {
    public value: any;
    public formattedValue: any;

    /** View -> model callback called when value changes */
    _onChange: (value: any) => void = () => { };

    /** View -> model callback called when autocomplete has been touched */
    _onTouched = () => { };

    @Input() name: string;
    @Input() placeholder: string;
    @Input() maskOptions: any;
    /** Element for the panel containing the autocomplete options. */
    @ViewChild(NovoOverlayTemplate) overlay: NovoOverlayTemplate;

    constructor(
        public element: ElementRef,
        public labels: NovoLabelService,
        private dateFormatService: DateFormatService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.maskOptions = {
            mask: this.dateFormatService.getDateMask(),
            keepCharPositions: true,
            guide: false
        };
        this.placeholder = this.labels.dateFormatPlaceholder;
    }

    /** BEGIN: Convienient Panel Methods. */
    openPanel(): void {
        this.overlay.openPanel();
    }
    closePanel(): void {
        this.overlay.closePanel();
    }
    get panelOpen(): boolean {
        return this.overlay && this.overlay.panelOpen;
    }
    /** END: Convienient Panel Methods. */

    _handleKeydown(event: KeyboardEvent): void {
        if ((event.keyCode === ESCAPE || event.keyCode === ENTER || event.keyCode === TAB) && this.panelOpen) {
            this.closePanel();
            event.stopPropagation();
        }
    }

    _handleInput(event: KeyboardEvent): void {
        if (document.activeElement === event.target) {
            this._onChange((event.target as HTMLInputElement).value);
            let [dateTimeValue, formatted] = this.dateFormatService.parseString((event.target as HTMLInputElement).value, false, 'date');
            if (dateTimeValue && dateTimeValue.getTime() > 0) {
                this._setTriggerValue(dateTimeValue);
            }
            this.openPanel();
        }
    }

    writeValue(value: any): void {
        Promise.resolve(null).then(() => this._setTriggerValue(value));
    }
    registerOnChange(fn: (value: any) => {}): void {
        this._onChange = fn;
    }
    registerOnTouched(fn: () => {}) {
        this._onTouched = fn;
    }

    private _setTriggerValue(value: any): void {
        const toDisplay = value;

        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        const inputValue = toDisplay !== null ? toDisplay : '';

        this.value = inputValue;
        this.formattedValue = this.formatDateValue(inputValue);
        this._changeDetectorRef.markForCheck();
    }

    /**
    * This method closes the panel, and if a value is specified, also sets the associated
    * control to that value. It will also mark the control as dirty if this interaction
    * stemmed from the user.
    */
    public setValueAndClose(event: any | null): void {
        if (event && event.date) {
            this._setTriggerValue(event.date);
            this._onChange(event.date);
        }
        this.closePanel();
    }

    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    public clearValue(skip: any) {
        this.writeValue(null);
        this._onChange(null);
    }

    public formatDateValue(value) {
        if (!value) {
            return '';
        }
        return this.labels.formatDateWithFormat(value, {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    }

    public get hasValue() {
        return !Helpers.isEmpty(this.value);
    }

}
