import { Component } from '@angular/core';

@Component({
  selector: 'tag-column',
  template: `
    <nb-tag-list>
        <nb-tag status="primary" appearance="outline" text="#001"></nb-tag>
        <nb-tag status="primary" appearance="outline" text="#002"></nb-tag>
        <nb-tag status="primary" appearance="outline" text="#003"></nb-tag>
        <nb-tag status="primary" appearance="outline" text="#004"></nb-tag>
        <nb-tag status="primary" appearance="outline" text="#005"></nb-tag>
    </nb-tag-list>
  `,
})
export class TagColumnComponent {
}

