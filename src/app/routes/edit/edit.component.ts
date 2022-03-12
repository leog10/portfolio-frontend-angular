import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;      
    }, 250);
  }

}
