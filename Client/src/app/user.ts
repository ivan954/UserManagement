export class User {
  _id!: String;
  Name!: String;
  Email!: String;
  Street!: String;
  City!: String;
  ZipCode!: Number;
  Tasks!: [
    {
      Title: String;
      Completed: Boolean;
    }
  ];

  Posts!: [
    {
      Title: String;
      Body: String;
    }
  ];
}
