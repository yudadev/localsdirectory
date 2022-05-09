export interface Product {
    id: number;
    name: string;
    description: string;
    address: string;
    image: string;
    open_at: string;
    close_at: string;
    status: string;
    categories: string[];
    rating: string;
    created_at: string;

    openAt: string;
    closeAt: string;
    createdAt: Date;
}