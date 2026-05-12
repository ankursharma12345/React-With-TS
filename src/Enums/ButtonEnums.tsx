export enum ButtonType {
    EDIT = "edit",
    DELETE = "delete"
}

// TS allow nhi krta enum use krna . So , we can use const instead of enum. But, if I want to use enum then in tsconfig.app.json file , I have to remove or change erasableSyntaxOnly value to false, initially it is true. Then after , I have to start again the app. 