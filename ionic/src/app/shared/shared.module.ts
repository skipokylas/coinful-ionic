import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent, ChartComponent } from './components';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        HeaderComponent,
        ChartComponent
    ],
    imports: [ChartsModule],
    exports: [
        HeaderComponent,
        ChartComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }


