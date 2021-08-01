export interface Menu {
    name:string,
    link:string,
    children:[{
        name:string,
        link:string
    }]
}