import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BackButtonComponent } from '../buttons/back-button/back-button.component';


@NgModule({
    declarations: [
        BackButtonComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        BackButtonComponent
    ]
})
export class ButtonsModule { }