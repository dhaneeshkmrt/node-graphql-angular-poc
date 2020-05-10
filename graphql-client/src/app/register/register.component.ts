import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName: string = 'dhaneesh';
  lastName: string = 'kumarsd';
  email: string = 'dhaneeshkmrt22@gmail.com';
  password: string = '1234';
  gender: string = 'male';
  age: number = 30;
  url = 'http://localhost:4000/graphql';
  query = `
  mutation  newUser($user: User!){
      newUser(user: $user){
        firstName,
        lastName
      }
  }`;
  user: { firstName: string; lastName: string; gender: string; age: string; email: string; password: string };
  showError: boolean;

  constructor(private http: HttpClient, private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitApolloQuery() {
    const userDetails = {
      firstName: 'dhaneesh',
      lastName: 'thulasidharan',
      age: 30,
      gender: 'male',
      email: 'dhaneeshkm1@gmail.com',
      password: 'test123'
    };

    const register = gql`
        mutation newUser($userDe: UserRegisterInputs!){
            newUser(user:$userDe){
              age,
              email
            }
        }
      `;

    this.apollo.mutate({ mutation: register, variables: { userDe: userDetails } }).subscribe((res: any) => {
      if (res.data.newUser) {
        this.showError = false;
        this.router.navigate(['login']);
      } else {
        this.showError = true;
      }
    });
  }

  onSubmit(newUserForm) {
    // const userEmail = 'dk12@gmail.com';
    // const isLogin = gql`
    // mutation{
    //   newUser(user:{
    //     firstName: "dhaneesh",
    //     lastName: "thulasidharan",
    //     age: 30,
    //     gender: "male",
    //     email: "${userEmail}",
    //     password:"test123"
    //   }){
    //     firstName,
    //     lastName,
    //   }
    // }`;
    // const userDetails = {
    //   firstName: 'dhaneesh',
    //   lastName: 'thulasidharan',
    //   age: 30,
    //   gender: 'male',
    //   email: 'dhaneeshkm1@gmail.com',
    //   password: 'test123'
    // };

    // const register = gql`
    //   mutation newUser($userDe: UserRegisterInputs!){
    //       newUser(user:$userDe){
    //         age,
    //         email
    //       }
    //   }
    // `;

    // this.apollo.mutate({ mutation: register, variables: { userDe: userDetails } }).subscribe(res => {
    //   console.log(res);
    // });


    const userDetails = newUserForm.form.value;

    const query = `
      mutation newUser($user: UserRegisterInputs!){
        newUser(user:$user){
          firstName,
          email
        }
      }
    `;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    };
    this.user = newUserForm.form.value;
    this.http.post(this.url, {
      query,
      variables: { user: userDetails }
    }, httpOptions).subscribe((res: any) => {
      if (res.data.newUser) {
        this.showError = false;
        this.router.navigate(['login']);
      } else {
        this.showError = true;
      }
    });
  }
}
