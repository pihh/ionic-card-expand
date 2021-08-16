import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { AnimationController, createAnimation } from '@ionic/angular';
import { $offset, $height, $width, $data } from '../../utils/vanilla-jquery';

const animationTimingExpand = 400;
const animationTimingCollapse = 200;
const animationTopOverflow = '-20vh';

@Component({
  selector: 'app-card-expandable',
  templateUrl: './card-expandable.component.html',
  styleUrls: ['./card-expandable.component.scss'],
})
export class CardExpandableComponent implements OnInit {
  @ViewChild('card') card: ElementRef;
  @ViewChild('cardContent') cardContent: ElementRef;
  @ViewChild('cardContentHolder') cardContentHolder: ElementRef;
  @ViewChild('innerContent') innerContent: ElementRef;
  @ViewChild('collapseButton') collapseButton: ElementRef;
  @ViewChild('bannerHolder') bannerHolder: ElementRef;
  @ViewChild('banner') banner: ElementRef;

  @Input('img') img: string;
  @Input('title') title: string;
  @Input('date') date: string;
  @Input('category') category: string;
  @Input('liked') liked = false;
  @Input('bookmarked') bookmarked = false;
  @Input('likeCount') likeCount = 0;

  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {}

  get ionContent() {
    return this.card.nativeElement.closest('ion-content');
  }

  private isClosing = false;
  private isExpanded = false;
  async expandElement() {
    if (this.isExpanded) return;

    /**
      1. bloqueia scroll no ion-content
      2. Marca posições e medidas do card
      3. Muda o layout do card adicionando open
        - aparece o button
        - as arestas endireitam
        - o content fica redondo
      4. Expande o tamanho do banner para max possivel + 10%

      5. Expande o tamanho do card para 100vh
      6. Arrasta o card para o topo da página
      7. Expande o tamanho do banner para max possivel + 0%
      8. Envia sinal de expansão completa
    */

    let $ionContent = this.ionContent;
    let $card = this.card.nativeElement;
    let $cardContent = this.cardContent.nativeElement;

    // 1. Bloqueia scroll no ion-content
    $ionContent.classList.add('lock');

    // 2. Marca posicõe e medidas do card ?

    // 3. Muda o layout do card adicionando open
    this.isExpanded = true;

    // 4. Expande o tamanho do banner
    // Feito com css

    // 5. Expande e arrasta ate 10 %mais

    const initialCardWidth = $cardContent.offsetWidth + 'px';
    const initialCardPositionTop = $offset($cardContent).top + 'px';
    const initialCardPositionLeft = $offset($cardContent).left + 'px';

    $cardContent.style.width = initialCardWidth;
    $cardContent.style.position = 'fixed';

    const initialExpandAnimation = this.animationCtrl
      .create()
      .addElement($cardContent)
      .duration(animationTimingExpand)
      .fromTo('width', initialCardWidth, '100vw')
      .fromTo('top', initialCardPositionTop, animationTopOverflow)
      .fromTo('left', initialCardPositionLeft, 0)
      .easing('ease-out');

    await initialExpandAnimation.play();
    // Expande até 0% mais
    const finalExpandAnimation = this.animationCtrl
      .create()
      .addElement($cardContent)
      .duration(animationTimingExpand / 3)
      .fromTo('top', animationTopOverflow, 0)
      .easing('ease-in');
    finalExpandAnimation.play();
  }

  async collapseElement() {
    if (!this.isExpanded) return;
    this.isClosing = true;
    /*
      Leave:
      1. Scroll conteúdo para cima devagar
      2. Começa a diminuir o container para 0 tamanho e largura do card
      3. Começa a posicionar o container para o card
      4. Remove o open do card
      5. Desbloqueia o scroll
     */

    // 1. Scroll conteúdo para cima devagar
    this.cardContentHolder.nativeElement.scrollTop = 0;

    // 2. Começar a diminuir o container para tamanho e largura do card
    // 3. Começa a posicionar o container para o card
    const $card = this.card.nativeElement;
    const $ionContent = this.ionContent;
    const $cardContent = this.cardContent.nativeElement;
    const initialCardWidth = $card.offsetWidth + 'px';
    const initialCardPositionTop = $offset($card).top + 'px';
    const initialCardPositionLeft = $offset($card).left + 'px';

    const collapseAnimation = this.animationCtrl
      .create()
      .addElement($cardContent)
      .duration(animationTimingCollapse)
      .fromTo('width', '100vw', initialCardWidth)
      .fromTo('top', 0, initialCardPositionTop)
      .fromTo('left', 0, initialCardPositionLeft)
      .easing('ease-out');

    setTimeout(() => {
      this.isExpanded = false;
    });
    await collapseAnimation.play();
    this.isClosing = false;
    $cardContent.style.position = 'initial';
    $ionContent.classList.remove('lock');
  }

  onScroll($event) {
    const target = $event.target;
    const scrollTop = target.scrollTop;
    if (scrollTop > this.banner.nativeElement.offserHeight) return;
    this.banner.nativeElement.style.transform = `translateY(-${
      scrollTop / 2
    }px)`;
  }
}
