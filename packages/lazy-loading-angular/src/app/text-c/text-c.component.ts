import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-c',
  templateUrl: './text-c.component.html',
  styleUrls: ['./text-c.component.css']
})
export class TextCComponent implements OnInit {

  constructor() { }

  // text = TextC.substring(0, 100) + TextAC
  text = 'TextC'

  ngOnInit() {
    import('../text-ac').then(m => {
      this.text += m.TextAC
    })
  }

}
