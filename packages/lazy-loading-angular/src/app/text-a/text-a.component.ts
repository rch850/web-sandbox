import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-a',
  templateUrl: './text-a.component.html',
  styleUrls: ['./text-a.component.css']
})
export class TextAComponent implements OnInit {

  text = 'TextA'

  constructor() { }

  ngOnInit() {
    Promise.all([
      import('../text-ab'),
      import('../text-ac')
    ]).then(m => {
      this.text += m[0].TextAB + m[1].TextAC
    })
  }

}
