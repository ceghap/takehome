import { createState } from '@hookstate/core'

export const store = createState({
  profile: {
    id: 0,
    email: '',
    password: '',
    code: 0,
    active: false,
    name: '',
    username: '',
    address: '',
    country: '',
    city: '',
    postcode: '',
    photoId: '',
  },
  products: {
    page: 0,
    rowsPerPage: 5,
    data: [],
  },
  product: {
    name: '',
    description: '',
    image: '',
  },
})
