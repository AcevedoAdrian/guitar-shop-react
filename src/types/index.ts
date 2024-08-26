export type Guitar = {
  name: string;
  price: number;
  image: string;
  description: string;
  id: number;
};

export interface CartItem extends Guitar {
  quantity: number;
}

// utility types
// export type CartItem = Pick<Guitar, "name" | "price" | "description" | "id"> & {
//   quantity: number;
// };

// export type CartItem = Omit<Guitar, "name" | "price" | "description" | "id"> & {
//   quantity: number;
// };
