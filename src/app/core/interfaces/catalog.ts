export interface CatalogCard {
    id: number,
    name: string,
    photo: string,
    creationDate: string,
    description: string,
    learningTime: string,
    tags: string,
    level: string,
    rating: number,
    views: number,    
    reviews: []
}

export interface CatalogCards {
    content: [ CatalogCard ],
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: object,
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    totalPages: number,
    totalElements: number,
    last: boolean,
    size: number,
    number: number,
    sort: object,
    numberOfElements: number,
    first: boolean,
    empty: boolean
}