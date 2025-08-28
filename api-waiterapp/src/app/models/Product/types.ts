export interface IIngredient {
  name: string
  icon: string
}

export interface IProduct {
  id: string
  name: string
  description: string
  imagePath: string
  price: number
  ingredients: IIngredient[]
  category: string
}
