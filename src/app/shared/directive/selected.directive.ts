import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSelected]'
})
export class SelectedDirective implements OnChanges{
  @Input() public appSelected!: boolean;
  @HostBinding('style.backgroundColor') private bgC!:string;
  @HostBinding('style.fontWeigth') private fw!:string;
  @HostBinding('style.color') private color!:string;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.appSelected){
      this.bgC = 'var(--primary)';
      this.fw = '500';
      this.color = 'white';
    }else{
      this.bgC = 'white';
      this.fw = '400';
      this.color = 'black';
    }
  }

}
