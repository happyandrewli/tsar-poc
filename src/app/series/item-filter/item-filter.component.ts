import { Component, OnInit, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { valueFunctionProp } from 'ng-zorro-antd';

@Component({
  selector: 'steps-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>ItemFilterComponent),
      multi: true
    }
  ]
})
export class ItemFilterComponent implements OnInit, ControlValueAccessor {
  visible: boolean;
  items = [
    { label: '789934', value: '789934', checked: false },
    { label: '789935', value: '789935', checked: false },
    { label: '789936', value: '789936', checked: false },
    { label: '789937', value: '789937', checked: false },
    { label: '789938', value: '789938', checked: false }
  ];
  writeValue(values: string[]): void {
    if (values !== undefined) {
      values.forEach(val => {
        this.items.find(item => item.value == val).checked = true;
      })
    }
  }

  propagateChange = (_: any) => { };
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    //throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    //throw new Error("Method not implemented.");
  }

  constructor() { }

  ngOnInit() {
  }

  save():void{
    this.visible=false;
    console.log(this.items.filter(item=>item.checked==true).map(item=>item.value));
  }

  close():void{
    //console.log(this.items);
  }
}
