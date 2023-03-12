import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news: any[] = [];
  hasMorePages: boolean = false;
  currentPage: number = 0;

  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.executeQuery();
  }

  nextPage() {
    this.currentPage += 1;
    this.executeQuery();
  }

  beforePage() {
    this.currentPage -=1;
    this.executeQuery();
  }

  executeQuery() {
    this.apollo
      .watchQuery({
        query: gql`
          query GetNews($first: Int!, $page: Int!) {
            newsall(first: $first, page: $page) {
              data {
                id
                title
                body
                companies
              }
              paginatorInfo {
                hasMorePages
              }
            }
          }
        `,
        variables: {
          first: 10,
          page: this.currentPage
        }
      })
      .valueChanges.subscribe((result: any) => {
        this.news = result.data.newsall.data;
        this.hasMorePages = result.data.newsall.paginatorInfo.hasMorePages;
      });
  }
}
