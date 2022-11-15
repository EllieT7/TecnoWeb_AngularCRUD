import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-item',
  templateUrl: './banner-item.component.html',
  styleUrls: ['./banner-item.component.css']
})
export class BannerItemComponent implements OnInit {
  items: any = [
    {category: 'BTS', title: 'Black friday', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', image: 'assets/img/banner1.jpg' },
    {category: 'TXT', title: 'New collection', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', image: 'assets/img/banner2.jpg' },
    {category: 'TWICE',title: 'New collection', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', image: 'assets/img/banner3.jpeg' },]
  constructor() { }

  ngOnInit(): void {
  }

}
