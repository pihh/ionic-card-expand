import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CardExpandableComponent } from './card-expandable/card-expandable.component';
import { CardInfoHolderComponent } from './card-info-holder/card-info-holder.component';
import { CardContentHolderComponent } from './card-content-holder/card-content-holder.component';
import { DrawerBottomComponent } from './drawer-bottom/drawer-bottom.component';

const __DECLARATIONS_EXPORTS__ = [
  CardExpandableComponent,
  CardInfoHolderComponent,
  CardContentHolderComponent,
  DrawerBottomComponent,
];

@NgModule({
  declarations: __DECLARATIONS_EXPORTS__,
  exports: __DECLARATIONS_EXPORTS__,
  imports: [CommonModule, IonicModule],
})
export class ComponentsModule {}
