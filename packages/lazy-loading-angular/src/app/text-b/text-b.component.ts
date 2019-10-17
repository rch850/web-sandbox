import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-b',
  templateUrl: './text-b.component.html',
  styleUrls: ['./text-b.component.css']
})
export class TextBComponent implements OnInit {

  // text = TextB.substring(0, 100) + TextAB
  text = 'TextB'

  constructor() { }

  ngOnInit() {
    import('../text-ab').then(m => {
      this.text += m.TextAB
    })
  }

}
