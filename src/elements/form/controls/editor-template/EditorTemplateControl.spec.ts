// APP
import { EditorTemplateControl } from './EditorTemplateControl';

describe('Control: EditorTemplateControl', () => {
    let control;

    beforeEach(() => {
        control = new EditorTemplateControl();
    });

    it('should have the right control type', () => {
        expect(control.controlType).toEqual('editor');
    });
});
