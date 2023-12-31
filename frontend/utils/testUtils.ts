import casual from "casual";

interface Overrides {
  id?: string;
  name?: string;
  email?: string;
  permissions?: string[];
  orders?: any[];
  cart?: any[];
}

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
  // __typename: 'Item',
  id: "abc123",
  price: 5000,
  user: null,
  photo: {
    id: "abc123",
    altText: "dogs are best",
    image: {
      publicUrlTransformed: "dog.jpg",
    },
  },
  name: "dogs are best",
  description: "dogs",
});

const fakeUser = (overrides?: Overrides) => ({
  // __typename: 'User',
  id: "4234",
  name: casual.name,
  email: casual.email,
  permissions: ["ADMIN"],
  orders: [],
  cart: [],
  ...overrides,
});

const fakeOrderItem = () => ({
  // __typename: 'OrderItem',
  id: casual.uuid,
  image: `${casual.word}.jpg`,
  name: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words(),
});

const fakeOrder = () => ({
  // __typename: 'Order',
  id: "ord123",
  charge: "ch_123",
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: "2022-12-11T20:16:13.797Z",
  user: fakeUser(),
});

const fakeCartItem = (overrides?: Overrides) => ({
  __typename: "CartItem",
  id: "omg123",
  quantity: 3,
  item: fakeItem(),
  user: fakeUser(),
  ...overrides,
});

// Fake LocalStorage
class LocalStorageMock {
  store: any;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: any) {
    this.store[key] = value.toString();
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

export { LocalStorageMock, fakeItem, fakeUser, fakeCartItem, fakeOrder, fakeOrderItem };
