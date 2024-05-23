export interface AddItemRequest {
  name: string;
  type: string;
  isbn: string;
  category: string;
  genre: string;
  publicationDate: Date;
  totalPages: number;
  language: string;
  description: string;
  publisherId: string;
  locationId: string;
  libraryId: string;
  inStock: number;
}