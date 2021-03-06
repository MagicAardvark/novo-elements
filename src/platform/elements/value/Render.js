"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
// APP
var novo_label_service_1 = require("../../services/novo-label-service");
var Countries_1 = require("../../utils/countries/Countries");
var EntityUtils_1 = require("../../utils/entity-utils/EntityUtils");
/**
 * @class RenderPipe
 * @classdesc
 * Renders data appropriately based on the data type found in Meta
 * All data types defined by bullhorn should be supported:
 *
 * - **String**: trims value and returns
 * - **Integer**: return value
 * - **Double**: return value fixed to 2 decimals
 * - **BigDecimal**: return value fixed to 2 decimals
 * - **Address**: only city and/or state returned
 * - **Address1**: only city and/or state returned
 * - **AddressWithoutCountry**: only city and/or state returned
 * - **Currency**: put a $ in front
 * - **Percentage**: divide by 100 fix to 2 decimals place and return
 * - **Options**: returns the appropriate 'label' for the 'value' from 'options'
 * - **Array**: returns list comma separated
 * - **DateTime**: formats the date
 * - **TimeStamp**: formats the date
 * - **ToOne**: return the entity specific name (ie. name, firstName lastName, title, ...)
 * - **ToMany**: return an array of the entity specific names (ie. name, firstName lastName, title, ...)
 *
 * @example
 * ```
 * {{ expression | render:field }}
 * ```
 */
var RenderPipe = (function () {
    function RenderPipe(changeDetector, sanitizationService, labels) {
        this.changeDetector = changeDetector;
        this.sanitizationService = sanitizationService;
        this.labels = labels;
    }
    RenderPipe.prototype.equals = function (objectOne, objectTwo) {
        if (objectOne === objectTwo) {
            return true;
        }
        if (objectOne === null || objectTwo === null) {
            return false;
        }
        if (objectOne !== objectOne && objectTwo !== objectTwo) {
            return true;
        }
        var t1 = typeof objectOne;
        var t2 = typeof objectTwo;
        var length;
        var key;
        var keySet;
        if (t1 === t2 && t1 === 'object') {
            if (Array.isArray(objectOne)) {
                if (!Array.isArray(objectTwo)) {
                    return false;
                }
                length = objectOne.length;
                if (length === objectTwo.length) {
                    for (key = 0; key < length; key++) {
                        if (!this.equals(objectOne[key], objectTwo[key])) {
                            return false;
                        }
                    }
                    return true;
                }
            }
            else {
                if (Array.isArray(objectTwo)) {
                    return false;
                }
                keySet = Object.create(null);
                for (key in objectOne) {
                    if (objectOne[key]) {
                        if (!this.equals(objectOne[key], objectTwo[key])) {
                            return false;
                        }
                        keySet[key] = true;
                    }
                }
                for (key in objectTwo) {
                    if (!(key in keySet) && typeof objectTwo[key] !== 'undefined') {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    };
    /**
     * Define the fields to set or retrieve for the given entity. Getter and Setter methods will automagically
     * be set up on the entity once the fields are defined.
     * @name fields
     * @memberOf Entity#
     * @param value
     * @param {args} args - fields can either be sent as a list of arguments or as an Array
     * @return text
     */
    RenderPipe.prototype.render = function (value, args) {
        var type = null;
        var text = value;
        var rezonedTime;
        // Handle when we don't have meta, but passing an entity
        if (value && value._subtype && !args) {
            return EntityUtils_1.EntityUtils.getEntityLabel(value, value._subtype);
        }
        // Stop logic for nulls
        if (value === undefined || value === null || !args) {
            return text;
        }
        if (args.formatter && (typeof args.formatter === 'function')) {
            return args.formatter(value, args);
        }
        // TODO move this to a service
        // Determine TYPE because its not just 1 value that determines this.
        if (args.type === 'TO_MANY') {
            type = 'ToMany';
        }
        else if (args.type === 'TO_ONE') {
            type = args.associatedEntity.entity;
        }
        else if (args.dataSpecialization === 'DATETIME') {
            type = 'DateTime';
        }
        else if (args.dataSpecialization === 'YEAR') {
            type = 'Year';
        }
        else if (args.dataType === 'Timestamp') {
            type = 'Timestamp';
        }
        else if (['mobile', 'phone', 'phone1', 'phone2', 'phone3', 'workPhone'].indexOf(args.name) > -1) {
            type = 'Phone';
        }
        else if (args.name && args.name.substring(0, 5) === 'email') {
            type = 'Email';
        }
        else if (args.name && args.name === 'address.countryID' || args.optionsType === 'Country') {
            type = 'Country';
        }
        else if (args.optionsType === 'SkillText') {
            type = 'SkillText';
        }
        else if (args.options || args.inputType === 'SELECT') {
            type = 'Options';
        }
        else if (['MONEY', 'PERCENTAGE', 'HTML', 'SSN'].indexOf(args.dataSpecialization) > -1) {
            type = this.capitalize(args.dataSpecialization.toLowerCase());
        }
        else {
            type = args.dataType || 'default';
        }
        // Transform data here
        switch (type) {
            case 'Address':
            case 'Address1':
            case 'AddressWithoutCountry':
                var country = Countries_1.findByCountryId(Number(value.countryName));
                text = ("\n                    " + (value.address1 || '') + "\n                    " + (value.address2 || '') + "<br />\n                ").trim();
                text += "\n                    " + (value.city || '') + " " + (value.state || '') + " " + (value.zip || '') + (value.city || value.state || value.zip ? '<br />' : '') + "\n                    " + (country ? country.name : (value.countryName || '')) + (country || value.countryName ? '<br />' : '') + "\n                ";
                text = this.sanitizationService.bypassSecurityTrustHtml(text.trim());
                break;
            case 'DateTime':
            case 'Timestamp':
                text = this.labels.formatDateShort(value);
                break;
            case 'Year':
                text = new Date(value).getFullYear();
                break;
            case 'Phone':
            case 'Email':
                text = value;
                break;
            case 'Money':
                text = this.labels.formatCurrency(value);
                break;
            case 'Percentage':
                text = this.labels.formatNumber((parseFloat(value)).toString(), { style: 'percent', minimumFractionDigits: 2 });
                break;
            case 'Double':
            case 'BigDecimal':
                text = this.labels.formatNumber(value, { minimumFractionDigits: this.getNumberDecimalPlaces(value) });
                break;
            case 'Integer':
                text = value;
                break;
            case 'BusinessSector':
            case 'Category':
            case 'Certification':
            case 'ClientCorporation':
            case 'CorporationDepartment':
            case 'DistributionList':
            case 'Skill':
            case 'Tearsheet':
            case 'Specialty':
                text = value.label || value.name || '';
                break;
            case 'SkillText':
                text = Array.isArray(value) ? value.join(', ') : value;
                break;
            case 'Lead':
            case 'Candidate':
            case 'ClientContact':
            case 'CorporateUser':
            case 'Person':
                text = value.label || (value.firstName || '') + " " + (value.lastName || '');
                break;
            case 'Opportunity':
            case 'JobOrder':
            case 'Placement':
                text = value.label || value.title || '';
                break;
            case 'JobSubmission':
                text = value.label || (value.jobOrder ? value.jobOrder.title + " - " : '') + " " + (value.candidate ? value.candidate.firstName : '') + " " + (value.candidate ? value.candidate.lastName : '');
                break;
            case 'WorkersCompensationRate':
                text = (value.compensation ? value.compensation.code + " - " : '') + " " + (value.compensation ? value.compensation.name : '');
                break;
            case 'Options':
                text = this.options(value, args.options);
                break;
            case 'ToMany':
                if (['Candidate', 'CorporateUser', 'Person'].indexOf(args.associatedEntity.entity) > -1) {
                    text = this.concat(value.data, 'firstName', 'lastName');
                    if (value.data.length < value.total) {
                        text = text + ', ' + this.labels.getToManyPlusMore({ quantity: value.total - value.data.length });
                    }
                }
                else if (['Category', 'BusinessSector', 'Skill', 'Specialty', 'ClientCorporation', 'CorporationDepartment'].indexOf(args.associatedEntity.entity) > -1) {
                    text = this.concat(value.data, 'name');
                    if (value.data.length < value.total) {
                        text = text + ', ' + this.labels.getToManyPlusMore({ quantity: value.total - value.data.length });
                    }
                }
                else if (args.associatedEntity.entity === 'MailListPushHistoryDetail') {
                    text = this.concat(value.data, 'externalListName');
                }
                else {
                    text = "" + (value.total || '');
                }
                break;
            case 'Country':
                var countryObj = Countries_1.findByCountryId(Number(value));
                text = countryObj ? countryObj.name : value;
                break;
            case 'Html':
                if (Array.isArray(value)) {
                    value = value.join(' ');
                }
                text = this.sanitizationService.bypassSecurityTrustHtml(value.replace(/\<a/gi, '<a target="_blank"'));
                break;
            case 'CandidateComment':
                text = value.comments ? this.labels.formatDateShort(value.dateLastModified) + " (" + value.name + ") - " + value.comments : '';
                break;
            default:
                text = value.trim ? value.trim() : value;
                break;
        }
        return text;
    };
    RenderPipe.prototype.updateValue = function (value, args) {
        this.value = this.render(value, args);
        this.changeDetector.markForCheck();
    };
    RenderPipe.prototype.transform = function (value, args) {
        if (value === undefined || value === null) {
            return '';
        }
        if (this.equals(value, this.lastValue) && this.equals(args, this.lastArgs)) {
            return this.value;
        }
        this.lastValue = value;
        this.lastArgs = args;
        this.updateValue(this.lastValue, this.lastArgs);
        return this.value;
    };
    /**
     * Simple function concat a list of fields from a list of objects
     * @name options
     * @param {Array} list - the list of values to use
     * @param {Array} fields - list of fields to extract
     * @return {String}
     */
    RenderPipe.prototype.concat = function (list) {
        var fields = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            fields[_i - 1] = arguments[_i];
        }
        var data = [];
        for (var _a = 0, list_1 = list; _a < list_1.length; _a++) {
            var item = list_1[_a];
            var label = [];
            for (var _b = 0, fields_1 = fields; _b < fields_1.length; _b++) {
                var field = fields_1[_b];
                label.push("" + item[field]);
            }
            data.push(label.join(' '));
        }
        return data.join(', ');
    };
    /**
     * Simple function to look up the **label** to display from options
     * @name options
     * @param {Object} value - the value to find
     * @param {Array} list - list of options (label/value pairs)
     * @return {String}
     */
    RenderPipe.prototype.options = function (value, list) {
        try {
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var item = list_2[_i];
                if (item.value === value) {
                    return item.label;
                }
            }
        }
        catch (e) {
            // do nothing
        }
        return value;
    };
    RenderPipe.prototype.getNumberDecimalPlaces = function (value) {
        var decimalPlaces;
        if (value) {
            var numberString = parseFloat(value).toString();
            var decimalPlace = (numberString || '').split('.')[1] || '';
            decimalPlaces = decimalPlace.length;
        }
        return decimalPlaces || 1;
    };
    /**
     * Capitalizes the first letter
     * @param string
     * @returns {string}
     */
    RenderPipe.prototype.capitalize = function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    };
    return RenderPipe;
}());
RenderPipe.decorators = [
    { type: core_1.Pipe, args: [{
                name: 'render',
                pure: false,
            },] },
    { type: core_1.Injectable },
];
/** @nocollapse */
RenderPipe.ctorParameters = function () { return [
    { type: core_1.ChangeDetectorRef, },
    { type: platform_browser_1.DomSanitizer, },
    { type: novo_label_service_1.NovoLabelService, },
]; };
exports.RenderPipe = RenderPipe;
//# sourceMappingURL=Render.js.map