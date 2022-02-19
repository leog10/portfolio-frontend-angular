import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  collapse() {
    document.getElementById('MenuNavegacion')!.className = 'navbar-collapse py-0 collapsing';
  }

  ngOnInit(): void {
  }

}
