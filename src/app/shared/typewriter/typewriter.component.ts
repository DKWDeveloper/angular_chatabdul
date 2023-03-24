import { Component, OnInit, Input, OnChanges, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css']
})
export class TypewriterComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  textToShow!: string;
  currentText = '';
  interval: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.querySelector('.scrollable').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngOnChanges() {
    this.currentText = '';
    if (this.textToShow) {
      this.interval = setInterval(() => {
        this.currentText += this.textToShow.charAt(this.currentText.length);
        if (this.currentText.length === this.textToShow.length) {
          clearInterval(this.interval)
        }
      }, 10);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
