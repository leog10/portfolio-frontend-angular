import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;      
    }, 250);
  }

}
