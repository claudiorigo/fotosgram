import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};

  img_01 = '/assets/img/img_01.jpg';
  img_02 = '/assets/img/img_02.jpg';
  img_03 = '/assets/img/img_03.jpg';

  constructor() { }

  ngOnInit() {}

}
