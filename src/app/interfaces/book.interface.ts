export interface IBook{
    title: string,
    author: string,
    genre: " FANTASY" |'FICTION' | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY"  ,
    isbn: string,
    description: string,
    copies: number
    available: boolean,
    versionKey: boolean,
    timestamps: boolean
}