// NG2
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// APP
import { NovoCKEditorTemplateElement } from './CKEditorTemplate';
import { NovoCategoryDropdownModule } from './../category-dropdown/CategoryDropdown.module';

@NgModule({
    imports: [CommonModule, FormsModule, NovoCategoryDropdownModule],
    declarations: [NovoCKEditorTemplateElement],
    exports: [NovoCKEditorTemplateElement]
})
export class NovoCKEditorTemplateModule {
}
