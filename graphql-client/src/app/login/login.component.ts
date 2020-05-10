import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import gql from 'graphql-tag';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showError = false;

  email = 'dhaneeshkmrt@gmail.com ';
  password = 'test123';
  url = 'http://localhost:4000/graphql';

  query = `
  query  isLogin($email: String!, $password: String!){
    isLogin(email:$email, password:$password){
      firstName
    }
  }`;
  constructor(private http: HttpClient, private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  // using post
  onSubmit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    };

    const query = `
    query  isLogin($email: String!, $password: String!){
      isLogin(email:$email, password:$password){
        firstName
      }
    }`;

    this.http.post(this.url, JSON.stringify({
      query,
      variables: { email: this.email, password: this.password },
    }), httpOptions).subscribe((res:any) => {
      if (res.data.isLogin) {
        this.showError = false;
        this.router.navigate(['dashboard']);
      } else {
        this.showError = true;
      }
    });
  }

  // using js fetch
  usingFetch() {
    const query = `
    query  isLogin($email: String!, $password: String!){
      isLogin(email:$email, password:$password){
        firstName
      }
    }`;
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { email: this.email, password: this.password },
      })
    }).then(res => {
      console.log(res);
    });
  }

  // using apollo client post
  onSubmitUsingApollo() {
    const isLogin = gql`
      {
        isLogin(email:"dhaneesh@gmail.com", password:"test123"){
          firstName
        }
      }
      `;

    this.apollo.query({ query: isLogin }).subscribe((res: any) => {
      if (res.data.isLogin) {
        this.showError = false;
        this.router.navigate(['dashboard']);
      } else {
        this.showError = true;
      }
    });
  }

}

