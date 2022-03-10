import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  thisYear!: number;

  ngOnInit(): void {
    this.thisYear = new Date(Date.now()).getFullYear();
  }

}
