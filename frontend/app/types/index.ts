// app/types/index.ts

export interface FieldError {
    field: string;
    message: string;
}

export interface ErrorState {
    message: string | null;
    description: string | null;
    errors: FieldError[] | null;
    refId: string | null;
}

export interface Item {
    name: string;
    age: number;
    address: string;
}
