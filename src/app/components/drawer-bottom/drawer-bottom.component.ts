import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Platform, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-drawer-bottom',
  templateUrl: './drawer-bottom.component.html',
  styleUrls: ['./drawer-bottom.component.scss'],
})
export class DrawerBottomComponent implements AfterViewInit {
  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @Output('openStateChanged') openState: EventEmitter<
    boolean
  > = new EventEmitter();

  isOpen = false;
  openHeight = 0;

  constructor(
    private plt: Platform,
    private gestureCtrl: GestureController,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  async ngAfterViewInit() {
    const drawer = this.drawer.nativeElement;
    this.openHeight = (this.plt.height() / 100) * 70;

    const gesture = await this.gestureCtrl.create({
      el: drawer,
      gestureName: 'swipe',
      direction: 'y',
      onMove: (ev) => {
        const deltaY = ev.deltaY;
        if (deltaY < -this.openHeight) return;
        drawer.style.transform = `translateY(${deltaY}px)`;
      },
      onEnd: (ev) => {
        const deltaY = ev.deltaY;
        const currentY = ev.currentY;

        if (deltaY < -50 && !this.isOpen) {
          drawer.style.transition = '.4s ease-out';
          drawer.style.transform = `translateY(${-this.openHeight}px)`;
          this.openState.emit(true);
          this.isOpen = true;
          console.log(this.isOpen);
        } else if (deltaY > 50 && this.isOpen) {
          drawer.style.transition = '.4s ease-out';
          drawer.style.transform = ``;
          this.openState.emit(false);
          this.isOpen = false;
        }

        if (currentY > window.screen.height - 24) {
          drawer.style.transition = '.4s ease-out';
          drawer.style.transform = ``;
          this.openState.emit(false);
          this.isOpen = false;
        }

        this.changeDetectorRef.detectChanges();
      },
    });

    gesture.enable(true);
  }

  toggleDrawer() {
    const drawer = this.drawer.nativeElement;
    this.openState.emit(!this.isOpen);
    if (this.isOpen) {
      drawer.style.transition = '.4s ease-out';
      drawer.style.transform = ``;
      this.isOpen = false;
    } else {
      drawer.style.transition = '.4s ease-out';
      drawer.style.transform = `translateY(${-this.openHeight}px)`;
      this.isOpen = true;
    }
  }
}
