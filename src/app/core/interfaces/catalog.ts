export interface CatalogCard {
  id: number;
  name: string;
  photo: string;
  creationDate: string;
  description: string;
  learningTime: string;
  lessonsCount: number;
  tags: string;
  level: string;
  rating: number;
  views: number;
  reviews: [];
  price: number;
  isSaved?: boolean;
  isIntoCart?: boolean;
}

export interface CatalogCardsData {
  content: CatalogCard[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: object;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: object;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
export interface SavedMicroSkill {
  id: number;
  microSkills: CatalogCard[];
}
export interface ShopingCart {
  id: number;
  userId: number;
  total: number;
  listOfMicroSkills: CatalogCard[];
}


export interface CatalogCategoryCardsData {
	microSkills: CatalogCard[];
	totalPages: number;
	totalElements: number;
	last: boolean;
	size: number;
	number: number;
	sort: object;
	numberOfElements: number;
	first: boolean;
	empty: boolean;
}

