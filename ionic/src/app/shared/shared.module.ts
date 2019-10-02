import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent, TabsComponent } from './components';

@NgModule({
    declarations: [
        HeaderComponent,
        TabsComponent
    ],
    imports: [],
    exports: [
        HeaderComponent,
        TabsComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }


