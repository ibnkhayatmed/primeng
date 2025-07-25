import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'controlled-doc',
    standalone: false,
    template: ` <app-docsectiontext>
            <p>Expansion state is controlled with <i>expandedKeys</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-button (click)="toggleApplications()" label="Toggle Applications" />
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }" class="mt-6">
                    <ng-template #header>
                        <tr>
                            <th style="width:34%;">Name</th>
                            <th style="width:34%;">Size</th>
                            <th style="width:34%;">Type</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData">
                        <tr [ttRow]="rowNode">
                            <td style="width:34%;">
                                <p-treetable-toggler [rowNode]="rowNode" />
                                {{ rowData.name }}
                            </td>
                            <td style="width:34%;">{{ rowData.size }}</td>
                            <td style="width:34%;">{{ rowData.type }}</td>
                        </tr>
                    </ng-template>
                </p-treetable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-controlled-demo"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlledDoc {
    files!: TreeNode[];

    constructor(
        private nodeService: NodeService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => {
            this.files = files.slice(0, 5);
            this.cd.markForCheck();
        });
    }

    toggleApplications() {
        if (this.files && this.files.length > 0) {
            const newFiles = [...this.files];
            newFiles[0] = { ...newFiles[0], expanded: !newFiles[0].expanded };
            this.files = newFiles;
        }
    }

    code: Code = {
        basic: `<p-button (click)="toggleApplications()" label="Toggle Applications" />
<p-treetable [value]="files" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }" class="mt-6">
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode">
            <td>
                <p-treetable-toggler [rowNode]="rowNode" />
                {{ rowData.name }}
            </td>
            <td>{{ rowData.size }}</td>
            <td>{{ rowData.type }}</td>
        </tr>
    </ng-template>
</p-treetable>`,

        html: `<div class="card">
<p-button (click)="toggleApplications()" label="Toggle Applications" />
<p-treetable [value]="files" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }" class="mt-6">
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData">
        <tr [ttRow]="rowNode">
            <td>
                <p-treetable-toggler [rowNode]="rowNode" />
                {{ rowData.name }}
            </td>
            <td>{{ rowData.size }}</td>
            <td>{{ rowData.type }}</td>
        </tr>
    </ng-template>
</p-treetable>
</div>`,

        typescript: `import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'tree-table-controlled-demo',
    templateUrl: './tree-table-controlled-demo.html',
    standalone: true,
    imports: [TreeTableModule, ButtonModule],
    providers: [NodeService]
})
export class TreeTableControlledDemo implements OnInit {
    files!: TreeNode[];

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => {
            this.files = files.slice(0, 5);
            this.cd.markForCheck();
        });
    }

    toggleApplications() {
        if (this.files && this.files.length > 0) {
            const newFiles = [...this.files];
            newFiles[0] = { ...newFiles[0], expanded: !newFiles[0].expanded };
            this.files = newFiles;
        }
    }
}`,

        service: ['NodeService']
    };
}
