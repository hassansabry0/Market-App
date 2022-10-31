import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.component.html',
  styleUrls: ['./select-categories.component.css'],
})
export class SelectCategoriesComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: string[] = [];
  @Output() selectedValue = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  detectChanges(event: any) {
    this.selectedValue.emit(event);
  }
}
