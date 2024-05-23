export class UserForRegisterDto {
    email
    password

    /**
     *
     */
    constructor(email?:any,password?:any) {
        this.email = email;
        this.password =password;
        
    }
  }