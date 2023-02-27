import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news: any[] = [];

  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            newsall(id: 1) {
              id
              title
              body
              companies
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.news = result.data.newsall;
      });
  }

}
