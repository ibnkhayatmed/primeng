import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'size-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>When no panelSizes are defined, panels are split 50/50, use the <i>panelSizes</i> property to give relative widths e.g. [25, 75].</p>
        </app-docsectiontext>
        <div class="card">
            <p-splitter [panelSizes]="[25, 75]" [style]="{ height: '300px' }" class="mb-8">
                <ng-template #panel>
                    <div class="flex items-center justify-center h-full">Panel 1</div>
                </ng-template>
                <ng-template #panel>
                    <div class="flex items-center justify-center h-full">Panel 2</div>
                </ng-template>
            </p-splitter>
        </div>
        <app-code [code]="code" selector="splitter-size-demo"></app-code>
    `
})
export class SizeDoc {
    code: Code = {
        basic: `<p-splitter [panelSizes]="[25, 75]" [style]="{ height: '300px' }" class="mb-8">
    <ng-template #panel>
        <div class="flex items-center justify-center h-full">Panel 1</div>
    </ng-template>
    <ng-template #panel>
        <div class="flex items-center justify-center h-full">Panel 2</div>
    </ng-template>
</p-splitter>`,

        html: `<div class="card">
    <p-splitter [panelSizes]="[25, 75]" [style]="{ height: '300px' }" class="mb-8">
        <ng-template #panel>
            <div class="flex items-center justify-center h-full">Panel 1</div>
        </ng-template>
        <ng-template #panel>
            <div class="flex items-center justify-center h-full">Panel 2</div>
        </ng-template>
    </p-splitter>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';

@Component({
    selector: 'splitter-size-demo',
    templateUrl: './splitter-size-demo.html',
    standalone: true,
    imports: [SplitterModule]
})
export class SplitterSizeDemo {}`
    };
}
