import { Component, Input, OnInit } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Paginator {
  totalCount: number
  totalPage: number
  perPage: number
  nowPage: number
  rowStart: number
  rowEnd: number
}

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() source: DataSource;
  @Input() paginator: Paginator;
  constructor() { }

  ngOnInit(): void {
    if(!!this.source){
      this.source.onChanged().subscribe(()=>{
        this.paginator.totalCount = this.source.count();
        let page =this.source.getPaging().page;
        let perPage = this.source.getPaging().perPage;
        this.paginator.nowPage = page;
        this.paginator.totalPage = Math.ceil(this.paginator.totalCount/perPage);
        this.paginator.rowStart = (page - 1) * perPage + 1;
        this.paginator.rowEnd = this.paginator.totalPage !== page ? page * perPage : Math.max((page-1), 1) * perPage + this.paginator.totalCount % perPage;
      });
    }
  }
}
