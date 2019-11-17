import { NgModule } from '@angular/core';

export class BusinessCardDataModel { 

  private name:string;
  private email:string;
  private userId:string;
  private companyName:string;
  private imageurl:string;

  constructor(obj:any) {

    this.name         = obj && obj.name           || null;
    this.email        = obj && obj.email          || null;
    this.companyName  = obj && obj.companyName    || null;
    this.imageurl     = obj && obj.imageurl       || null;
    this.userId       = obj && obj.userId         || null;

    console.log(` imageurl 1 ${this.imageurl}`)
    if(!(this.imageurl && this.imageurl.trim().length >0))
    {
      this.imageurl = "../../assets/no-image-found.jpg";
    }
    console.log(` imageurl 2 ${this.imageurl}`)

   }

    /**
     * Getter $companyName
     * @return {string}
     */
	public get $companyName(): string {
		return this.companyName;
	}

    /**
     * Setter $companyName
     * @param {string} value
     */
	public set $companyName(value: string) {
		this.companyName = value;
	}

    /**
     * Getter $imageurl
     * @return {string}
     */
	public get $imageurl(): string {
		return this.imageurl;
	}

    /**
     * Setter $imageurl
     * @param {string} value
     */
	public set $imageurl(value: string) {
		this.imageurl = value;
	}

    /**
     * Getter $userId
     * @return {string}
     */
	public get $userId(): string {
		return this.userId;
	}

    /**
     * Setter $userId
     * @param {string} value
     */
	public set $userId(value: string) {
		this.userId = value;
	}
  

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    /**
     * Getter $email
     * @return {string}
     */
	public get $email(): string {
		return this.email;
	}

    /**
     * Setter $email
     * @param {string} value
     */
	public set $email(value: string) {
		this.email = value;
  }
  
  public getDetail()
  {
    console.log(`Name : ${this.name} Email : ${this.$email}`);
  }
}
