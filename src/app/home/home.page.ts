import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cards = [
    getRandomCard('Silky Woman'),
    getRandomCard('The Trembling Vision'),
    getRandomCard('Truth of Flames'),
    getRandomCard('The Soul of the Healer'),
  ];

  constructor() {}
}

function getRandomCard(title) {
  return {
    src: 'https://picsum.photos/200/300',
    title: title,
    date: `Apr ${getRandomIntInclusive(1, 30)} ${getRandomIntInclusive(
      2020,
      2021
    )}`,
    category: 'Category',
    liked: true,
    bookmarked: false,
    likeCount: getRandomIntInclusive(),
    content: DUMMY_CONTENT,
  };
}

function getRandomIntInclusive(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const DUMMY_CONTENT = `<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu
  leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
  Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio
  dui. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec
  ullamcorper nulla non metus auctor fringilla.
</p>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu
  leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
  Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio
  dui. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec
  ullamcorper nulla non metus auctor fringilla.
</p>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu
  leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
  Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio
  dui. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec
  ullamcorper nulla non metus auctor fringilla.
</p>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu
  leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
  Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio
  dui. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec
  ullamcorper nulla non metus auctor fringilla.
</p>`;
