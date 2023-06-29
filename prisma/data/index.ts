import { coffee_shops } from '@prisma/client';
const an = {
  users: [
    {
      username: 'AnhNguyen1',
      password: '1234567890',
      email: 'nguyenletuananh@gmail.com',
      phone_number: '5699470700',
      date_of_birth: '2001-03-15T00:00:00.000Z',
      image_url:
        'https://robohash.org/voluptatesipsamut.png?size=1280x800&set=set1',
      role: 1,
    },
    {
      username: 'AnhNguyen12',
      password: '1234567891',
      email: 'nguyenletuananh1@gmail.com',
      phone_number: '9413279491',
      date_of_birth: '2005-07-17T00:00:00.000Z',
      image_url:
        'https://robohash.org/dignissimosculpain.png?size=1280x800&set=set1',
      role: 0,
    },
    {
      username: 'AnhNguyen123',
      password: '1234567892',
      email: 'nguyenletuananh2@gmail.com',
      phone_number: '6042368178',
      date_of_birth: '2007-08-20T00:00:00.000Z',
      image_url:
        'https://robohash.org/ducimusdoloremaccusamus.png?size=1280x800&set=set1',
      role: 0,
    },
    {
      username: 'AnhNguyen1234',
      password: '1234567893',
      email: 'nguyenletuananh3@gmail.com',
      phone_number: '4839403216',
      date_of_birth: '2008-10-10T00:00:00.000Z',
      image_url:
        'https://robohash.org/voluptasearumrepudiandae.png?size=1280x800&set=set1',
      role: 0,
    },
    {
      username: 'AnhNguyen12345',
      password: '1234567894',
      email: 'nguyenletuananh4@gmail.com',
      phone_number: '2331869761',
      date_of_birth: '2003-09-24T00:00:00.000Z',
      image_url:
        'https://robohash.org/atquedoloremvoluptatum.png?size=1280x800&set=set1',
      role: 0,
    },
  ],
  coffee_shops: [
    {
      name: 'Highlands Coffee',
      images: ['http://rb.gy/q8skg', 'http://rb.gy/zj98d'],
      owner_ID: 8,
      opening_at: '07:00',
      closing_at: '22:00',
      description:
        'Highlands Coffee® was established in 1999 and born out of love for Vietnam, its coffee and its communities.',
      phone_number: '0987654321',
      status: 5,
      address: '91 Tran Dai Nghia, Bach Khoa, Hai Ba Trung, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 3,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'InFact Coffee',
      images: ['http://rb.gy/c0e6s'],
      owner_ID: 9,
      opening_at: '08:00',
      closing_at: '22:00',
      description:
        'A Positive & Creative Co-Working Café Focused On Making Good Ideas & Innovation',
      phone_number: '0862828342',
      status: 5,
      address: '342 Ba Trieu, Le Dai Hanh, Hai Ba Trung, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 0, 1, 1, 2, 1, 1, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 6,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Moc An Coffee & Tea',
      images: ['http://rb.gy/ygrdi', 'http://rb.gy/mfues'],
      owner_ID: 9,
      opening_at: '07:00',
      closing_at: '22:00',
      description:
        'It is a place with excellent coffee, quiet space, sincerity',
      phone_number: '0382202836',
      status: 5,
      address: '19 Le Thanh Nghi, Bach Mai, Hai Ba Trung, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 4,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Phuc Long Coffee & Tea',
      images: ['http://rb.gy/eao5e'],
      owner_ID: 8,
      opening_at: '07:30',
      closing_at: '22:30',
      description:
        'After more than 50 years of extracting the quintessence from premium green tea buds and coffee beans and wishing to bring customers the most valuable experiences when enjoying, Phuc Long is continuously a pioneer brand with many ideas. Innovative ideas at the forefront of the tea and coffee industry.\n\nWe believe that each tea and coffee product will be more and more excellent when created from constant striving and passion. And it is the connection based on trust, honesty and trust that contributes to bringing the beauty of tea & coffee culture to fly higher and farther. Continuing efforts, from the first store, until now, Phuc Long has built more than 80 stores in the areas of Ho Chi Minh City, Binh Duong, Bien Hoa, Can Tho, Da Nang, Nha Trang, and Hanoi serving the Fresh drinks from tea and coffee. Not stopping there, we continue to develop and expand the store system from South to North. Increase product coverage to all systems: supermarkets, convenience stores…\n\nWorking with the motto ',
      phone_number: '0914162689',
      status: 5,
      address: '69 Tran Dai Nghia, Bach Khoa, Hai Ba Trung, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 3,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'The Copa Coffee',
      images: ['http://rb.gy/va4iu'],
      owner_ID: 9,
      opening_at: '08:00',
      closing_at: '22:00',
      description: 'Copa - A Cup of Goodness',
      phone_number: '0944696889',
      status: 5,
      address: '65 Tran Dai Nghia, Bach Khoa, Hai Ba Trung, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 1,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'All Day Coffee',
      images: ['http://rb.gy/uunzp'],
      owner_ID: 9,
      opening_at: '07:00',
      closing_at: '23:00',
      description:
        'All Day Coffee\nVietnamese Specialty Coffee\nYour Everyday Coffee � Roasted Daily',
      phone_number: '0987654321',
      status: 5,
      address: '37 Quang Trung, Tran Hung Dao, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 7,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Tranquil Books & Coffee',
      images: ['http://rb.gy/s4hai'],
      owner_ID: 9,
      opening_at: '08:00',
      closing_at: '22:30',
      description: '',
      phone_number: '0395049075',
      status: 5,
      address: '5 Nguyen Quang Bich, Cua Dong, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 0, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 3,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Cafe Giảng',
      images: ['http://rb.gy/obf4z'],
      owner_ID: 9,
      opening_at: '07:00',
      closing_at: '22:00',
      description:
        'Café Giảng is headquartered in Hanoi, Vietnam, is the birthplace of egg coffee, invented in 1946 by Mr. Nguyen Van Giang, the father of the current owner, and a bartender at the 5-star hotel Sofitel Legend Metropole in Hanoi at that time.',
      phone_number: '0989892298',
      status: 5,
      address: '39 Nguyen Huu Huan, Ly Thai To, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 5,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Xofa Café & Bistro',
      images: ['http://rb.gy/jgv5f'],
      owner_ID: 8,
      opening_at: '00:00',
      closing_at: '23:00',
      description:
        'In a quiet corner by the window, you are awakened by the warm aroma of coffee, reaching out to welcome the last rays of summer sun and a refreshing autumn breeze, welcoming a new peaceful day!\nTry to spend an early autumn morning at Xofa and feel it!',
      phone_number: '0987654321',
      status: 5,
      address: '14 Tong Duy Tan, Hang Bong, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0, 0],
        [2, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 7,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Dream Beans Coffee Roastery',
      images: ['http://rb.gy/noqvm'],
      owner_ID: 10,
      opening_at: '07:30',
      closing_at: '17:00',
      description:
        'This is a small independent coffee house, run by a local family. This young couple who are passionat',
      phone_number: '0934683020',
      status: 5,
      address: '79 Ly Nam De, Cua Dong, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 5,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Hoa10Giờ Floral & Book Cafe',
      images: ['http://rb.gy/x65li'],
      owner_ID: 9,
      opening_at: '07:30',
      closing_at: '22:00',
      description:
        'Vintage style fresh flower shop and very beautiful Book Cafe',
      phone_number: '0366578989',
      status: 5,
      address: '26 Hang Voi, Ly Thai To, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 3,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'The Note Coffee',
      images: ['http://rb.gy/p3egj'],
      owner_ID: 9,
      opening_at: '07:00',
      closing_at: '23:00',
      description:
        'The Note Coffee is a special cafe with tens of thousands of messages left by customers',
      phone_number: '0975194466',
      status: 5,
      address: '64 Luong Van Can, Hang Trong, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 5,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Circle Coffee - Bar',
      images: ['http://rb.gy/xzrcq'],
      owner_ID: 9,
      opening_at: '10:00',
      closing_at: '23:00',
      description:
        'Circle Coffee Bar is an ancient French house that is both old and modern with open space hidden behind a small path lit by the light of small lanterns. That will probably be one of your interesting experiences.',
      phone_number: '0983922452',
      status: 5,
      address: '49 Hang Quat, Hang Gai, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 7,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Cafe Đinh',
      images: ['http://rb.gy/8s262'],
      owner_ID: 9,
      opening_at: '07:00',
      closing_at: '22:30',
      description: '',
      phone_number: '0906221106',
      status: 5,
      address: '13 Dinh Tien Hoang, Hang Trong, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 0, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 6,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'The Little Plan café',
      images: ['http://rb.gy/67zyf'],
      owner_ID: 9,
      opening_at: '08:00',
      closing_at: '22:30',
      description: 'Drinks & some sweetness in an old French mansion',
      phone_number: '0987267670',
      status: 5,
      address: '11 Phu Doan, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 4,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'An bread & cafe',
      images: ['http://rb.gy/u6dxr'],
      owner_ID: 10,
      opening_at: '08:00',
      closing_at: '22:00',
      description: 'Bread, coffee, smoothies.....',
      phone_number: '0918685538',
      status: 5,
      address: '15 Phu Doan, Hang Trong, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 3,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'HoLLee Coffee Shop',
      images: ['http://rb.gy/pfb63'],
      owner_ID: 10,
      opening_at: '08:00',
      closing_at: '19:00',
      description:
        'Hollee Coffee Shop is a cafe with many special coffee machine lines',
      phone_number: '0904173429',
      status: 5,
      address: '91 Tran Quoc Toan, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 2,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Kalina Café',
      images: ['http://rb.gy/gkc6m'],
      owner_ID: 11,
      opening_at: '07:00',
      closing_at: '23:30',
      description: '',
      phone_number: '0913002707',
      status: 5,
      address: '2 Ba Trieu, Trang Tien, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 6,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Blackbird Coffee',
      images: ['http://rb.gy/uki6m'],
      owner_ID: 11,
      opening_at: '07:00',
      closing_at: '21:00',
      description: '',
      phone_number: '0389513053',
      status: 5,
      address: '5 Chan Cam, Hang Trong, Hoan Kiem, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 0, 0, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 1,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
    {
      name: 'Cafe Mai',
      images: ['http://rb.gy/4cls7'],
      owner_ID: 9,
      opening_at: '07:00',
      closing_at: '22:00',
      description:
        'Grinding technique handed down from former generations \nUnder French processing method\n Developed in H',
      phone_number: '0987654321',
      status: 5,
      address: '52 Nguyen Du, Tran Hung Dao, Hai Ba Trung, Hanoi, Vietnam',
      verified: 0,
      crowded_hours: [
        [0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      ],
      devices: [
        {
          name: 'エアコン',
          quantity: 5,
          status: 'good',
        },
      ],
      categories: ['喫茶店'],
    },
  ],
  reviews: [
    {
      review: '涼しいエアコン、熱心なスタッフ',
      star: 5,
      coffee_shop_ID: 20,
      images: [],
    },
    {
      review: '涼しいエアコン、広々とした空間',
      star: 5,
      coffee_shop_ID: 20,
      images: [],
    },
    {
      review: '壊れたエアコン',
      star: 3,
      coffee_shop_ID: 20,
      images: [],
    },
    {
      review: 'エアコンはありますが暑いです',
      star: 3,
      coffee_shop_ID: 20,
      images: [],
    },
    {
      review: 'エアコンが寒すぎる',
      star: 5,
      coffee_shop_ID: 20,
      images: [],
    },
    {
      review: '涼しいエアコン、熱心なスタッフ',
      star: 3,
      coffee_shop_ID: 20,
      images: [],
    },
    {
      review: '涼しいエアコン、広々とした空間',
      star: 3,
      coffee_shop_ID: 17,
      images: [],
    },
    {
      review: 'エアコンが壊れているのでとても暑いです',
      star: 3,
      coffee_shop_ID: 17,
      images: [],
    },
    {
      review: 'エアコンが寒すぎる',
      star: 5,
      coffee_shop_ID: 17,
      images: [],
    },
    {
      review: 'エアコンはありますが暑いです',
      star: 1,
      coffee_shop_ID: 17,
      images: [],
    },
    {
      review: 'エアコンがとても涼しいです',
      star: 5,
      coffee_shop_ID: 17,
      images: [],
    },
    {
      review: 'エアコンが寒すぎる',
      star: 3,
      coffee_shop_ID: 22,
      images: [],
    },
    {
      review: 'エアコンはありますが暑いです',
      star: 2,
      coffee_shop_ID: 22,
      images: [],
    },
    {
      review: '涼しいエアコン、広々とした空間',
      star: 5,
      coffee_shop_ID: 22,
      images: [],
    },
    {
      review: 'エアコンはありますが暑いです',
      star: 1,
      coffee_shop_ID: 22,
      images: [],
    },
    {
      review: 'エアコンが作動しない',
      star: 2,
      coffee_shop_ID: 22,
      images: [],
    },
    {
      review: 'エアコンがとても涼しいです',
      star: 3,
      coffee_shop_ID: 22,
      images: [],
    },
    {
      review: '涼しいエアコン、広々とした空間',
      star: 5,
      coffee_shop_ID: 22,
      images: [],
    },
    {
      review: 'エアコンが寒すぎる',
      star: 3,
      coffee_shop_ID: 22,
      images: [],
    },
    {
      review: 'エアコンはありますが暑いです',
      star: 1,
      coffee_shop_ID: 20,
      images: [],
    },
  ],
};

const gi = {
  users: [
    {
      password: '12345678',
      email: 'giao1@gmail.com',
      username: 'giao1',
      phone_number: '0987654321',
      date_of_birth: '2001-06-15T07:43:46.177Z',
      image_url:
        'data:image/png;base64,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',
      role: 1,
    },
    {
      password: 'password',
      email: 'giao2@gmail.com',
      username: 'giao2',
      phone_number: 'string',
      date_of_birth: '2007-09-17T07:51:07.620Z',
      image_url:
        'data:image/png;base64,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',
      role: 0,
    },
    {
      password: '12345678',
      email: 'giao3@gmail.com',
      username: 'giao3',
      phone_number: '0963827415',
      date_of_birth: '2005-09-17T07:54:35.024Z',
      image_url:
        'data:image/jpeg;base64,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',
      role: 0,
    },
    {
      password: 'password',
      email: 'giao4@gmail.com',
      username: 'giao4',
      phone_number: '0956827341',
      date_of_birth: '2004-06-17T07:57:15.491Z',
      image_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Iu_KcHIfSQiODpCwL1wi4GgpZdwZ-ehp-g&usqp=CAU',
      role: 0,
    },
    {
      password: '12345678',
      email: 'giao5@gmail.com',
      username: 'giao5',
      phone_number: '0956827341',
      date_of_birth: '2000-10-05T07:57:15.491Z',
      image_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr3wArtEKJ1qRNWqH99fmidR984-qxQm_DRKwufN_FyjlAcnRdTyQOIQjSahdcNLqk9Fc&usqp=CAU',
      role: 0,
    },
  ],
  coffee_shops: [
    {
      name: 'Fog Coffee Nam',
      opening_at: '07:30',
      closing_at: '21:30',
      status: 1,
      devices: [
        {
          name: 'エアコン',
          quantity: 1,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 2, 1, 2, 1, 0, 0, 0, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 0, 1, 2, 1, 2, 0, 0, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipNqz7X4TMDAtIQ_Gef_oY_tQpXMfB2rFRpiRCWG=w408-h272-k-no',
      ],
      description:
        'サービスオプション:屋外席、取り除く、内部使用。製品サービス：コーヒー。食事のオプション：シート。施設：トイレ。雰囲気：のんびりとした雰囲気',
      owner_ID: 2,
      phone_number: '0906258945',
      address:
        'stringNV1-2 Lô 32 Khu biệt thự liền kề Gelenxia, 885 Đ. Tam Trinh, Yên Sở, Hoàng Mai, Hà Nội',
      verified: 0,
      categories: ['喫茶店'],
    },
    {
      name: 'A+ Cà Phê Bao Cấp',
      opening_at: '07:00',
      closing_at: '22:30',
      status: 5,
      devices: [
        {
          name: 'エアコン',
          quantity: 3,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 1, 2, 1, 0, 2, 1, 0, 0, 0, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 1, 2, 1, 0, 2, 1, 0, 0, 0, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipO-Mnxz__Y7StasXNb0kXJHw-OdNkhRQe9hHj91=w408-h306-k-no',
      ],
      description:
        'サービスオプション:屋外席、配達、取り除く、内部使用。製品サービス：コーヒー。食事のオプション：朝食、ブランチ、ケータリングサービス。施設：犬可、トイレ。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ：グループに適しています',
      owner_ID: 2,
      phone_number: '0986969062',
      address: 'Số 6 BT04 Trần Thủ Độ Khu đô thị, Pháp Vân, Hà Nội',
      verified: 1,
      categories: ['喫茶店'],
    },
    {
      name: 'Cafe Gia Huy',
      opening_at: '06:00',
      closing_at: '23:30',
      status: 4,
      devices: [
        {
          name: 'エアコン',
          quantity: 4,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 0, 2, 1, 0, 2, 1, 2, 1, 1, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 1, 2, 1, 0, 2, 1, 1, 1, 1, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipPDcTGUIfkcIbWZaKh8B66ve6bwosCspYt3M7X9=w426-h240-k-no',
      ],
      description:
        'サービスオプション: 屋外席、取り除く、内部使用。アクセシビリティ：バリアフリー席。製品サービス：コーヒー。施設：犬可、トイレ。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ：グループに適しています。',
      owner_ID: 2,
      phone_number: '0986795868',
      address: 'Ki ốt số 4, Nơ 7, KĐT, Pháp Vân, Hoàng Mai, Hà Nội',
      verified: 1,
      categories: ['猫カフェ', '喫茶店'],
    },
    {
      name: 'Cà phê ca nhạc Hồng Phú',
      opening_at: '16:00',
      closing_at: '00:00',
      status: 3,
      devices: [
        {
          name: 'エアコン',
          quantity: 2,
          status: 'bad',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 2, 1, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 2, 1, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipNMhSnar3sHhtD2Eiu1y47BTqSrhU_Z2fu2Crpc=w408-h544-k-no',
      ],
      description:
        'サービスオプション:内部使用。製品サービス：コーヒー。施設：トイレ。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ：グループに適しています。',
      owner_ID: 2,
      phone_number: '0928273666',
      address: '203 Đ. Bờ Sông Sét, Đồng Tâm, Hai Bà Trưng, Hà Nội',
      verified: 0,
      categories: ['猫カフェ'],
    },
    {
      name: 'Cà Phê Diệp Chi',
      opening_at: '06:30',
      closing_at: '22:30',
      status: 4,
      devices: [
        {
          name: 'エアコン',
          quantity: 4,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 1, 0, 2, 1, 1, 1, 0, 2, 1, 0, 1, 2, 2, 1, 1, 1, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 1, 0, 2, 1, 1, 1, 0, 2, 1, 0, 1, 2, 2, 1, 1, 1, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipOVXod80uvL_MMzcIiNXshKSUMicEd54wG-aQvE=w426-h240-k-no',
      ],
      description:
        'サービスオプション: 内部使用。アクセシビリティ：バリアフリー入口、バリアフリー席、バリアフリー駐車場。製品サービス：コーヒー。施設：トイレ。雰囲気：のんびりとした雰囲気。人口グループ：グループに適しています',
      owner_ID: 2,
      phone_number: '0904277122',
      address: '31 P. Trần Nguyên Đán, Khu đô thị Định Công, Hoàng Mai, Hà Nội',
      verified: 1,
      categories: ['猫カフェ', '喫茶店'],
    },
    {
      name: 'LAPHO Cà phê',
      opening_at: '08:30',
      closing_at: '23:30',
      status: 4,
      devices: [
        {
          name: 'エアコン',
          quantity: 2,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 1, 0, 0, 1, 1, 2, 2, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 1, 0, 0, 1, 1, 2, 2, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipNMVFZ1qTLGPL_S0Qj1e4n0Tk0qfvLWB4YFuYU6=w408-h306-k-no',
      ],
      description:
        'サービスオプション：非接触型食品宅配サービス、配達、内部使用。製品サービス：コーヒー。施設：トイレ。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ：グループに適しています。',
      owner_ID: 2,
      phone_number: '0973989889',
      address: 'LÔ 11 DV 09, Khu đô thị Tây Nam Linh Đàm, Hoàng Mai, Hà Nội',
      verified: 1,
      categories: ['喫茶店'],
    },
    {
      name: 'Cộng Cà phê',
      opening_at: '07:00',
      closing_at: '23:30',
      status: 4,
      devices: [
        {
          name: 'エアコン',
          quantity: 1,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 1, 0, 0, 2, 1, 2, 1, 1, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 1, 0, 0, 2, 1, 2, 1, 1, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipPlVOByLW1snUzpY9CwF9juyqEm21PiZcFPcNDR=w300-h225-p-k-no',
      ],
      description:
        'サービスオプション: 屋外席、非接触型食品宅配サービス、配達、取り除く、内部使用。特徴：迅速なサービス。アクセシビリティ：バリアフリー入口：多目的トイレ：バリアフリー席、バリアフリー駐車場。製品サービス、コーヒー、アルコール飲料、ビール。食事のオプション：ケータリングサービス、シート。施設：トイレ、子供に適した。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ：グループに適しています。計画する：予約を受け付ける。',
      owner_ID: 2,
      phone_number: '0911811161',
      address: '56 P. Linh Đ., Hoàng Liệt, Hoàng Mai, Hà Nội',
      verified: 1,
      categories: ['猫カフェ'],
    },
    {
      name: 'LÊLA Cà Phê',
      opening_at: '05:00',
      closing_at: '22:30',
      status: 4,
      devices: [
        {
          name: 'エアコン',
          quantity: 2,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 0, 1, 1,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 0, 1, 1,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipPfzkVNUHkr9W_KjV1nnPPlSRXQ4KWPWqIHWy3H=w408-h306-k-no',
      ],
      description:
        'サービスオプション: 内部使用。製品サービス:コーヒー。施設：トイレ、子供に適した。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ：グループに適しています。',
      owner_ID: 2,
      phone_number: '0869641555',
      address: 'XRQ9+9RH, Yên Lạc, Thanh Xuân, Vĩnh Phúc',
      verified: 0,
      categories: ['猫カフェ', '喫茶店'],
    },
    {
      name: 'Cà Phê Hà Nội 75',
      opening_at: '07:00',
      closing_at: '23:00',
      status: 4,
      devices: [
        {
          name: 'エアコン',
          quantity: 1,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 2, 0, 1, 1,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipOfXuzf19A7ms_cO0auARfUjmgmXVDhxoaWdNZi=w300-h225-p-k-no',
      ],
      description:
        'サービスオプション：屋外席、内部使用。製品サービス：コーヒー。食事のオプション：ケータリングサービス、シート。施設：トイレ、子供に適した。雰囲気：のんびりとした雰囲気。快適な環境：人口グループ。',
      owner_ID: 2,
      phone_number: '0913502951',
      address: 'XRPV+XXC, Tương Mai, Hoàng Mai, Hà Nội',
      verified: 1,
      categories: ['喫茶店'],
    },
    {
      name: 'Cafe Nhất Long',
      opening_at: '08:00',
      closing_at: '20:00',
      status: 3,
      devices: [
        {
          name: 'エアコン',
          quantity: 0,
          status: 'bad',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 2, 2, 1, 1, 0, 0, 2, 0, 0, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 2, 2, 1, 1, 0, 0, 2, 0, 0, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipOlRZHH7p8fJKcAKDWDLBnShrvWZ6I3w7oZhs7D=w426-h240-k-no',
      ],
      description:
        'サービスオプション:屋外席、内部使用。製品サービス：コーヒー。食事のオプション：シート。施設：トイレ、子供に適した、Wi-Fi、無料Wi-Fi利用可能。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ：グループに適しています、家族全員に適しています。',
      owner_ID: 2,
      phone_number: '0913502978',
      address: '27 Phương Mai, Đống Đa, Hà Nội',
      verified: 1,
      categories: ['喫茶店'],
    },
    {
      name: 'Cafe Gia Huy',
      opening_at: '06:00',
      closing_at: '23:00',
      status: 4,
      devices: [
        {
          name: 'エアコン',
          quantity: 4,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 2, 2, 1, 1, 2, 2, 1, 1, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 2, 2, 1, 1, 2, 2, 1, 1, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipPDcTGUIfkcIbWZaKh8B66ve6bwosCspYt3M7X9=w426-h240-k-no',
      ],
      description:
        'サービスオプション：屋外席、取り除く、内部使用。製品サービス：コーヒー。食事のオプション：シート。施設：犬可、トイレ。雰囲気：のんびりとした雰囲気。快適な環境：人口グループ、グループに適しています。',
      owner_ID: 2,
      phone_number: '0913502978',
      address: 'Ki ốt số 4, Nơ 7, KĐT, Pháp Vân, Hoàng Mai, Hà Nội',
      verified: 1,
      categories: ['喫茶店'],
    },
    {
      name: 'Sứ Cà Phê - Trần Điền',
      opening_at: '07:00',
      closing_at: '23:00',
      status: 4,
      devices: [
        {
          name: 'エアコン',
          quantity: 2,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 0, 0, 1, 1, 2, 1, 1, 1, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipPwqGv5VqcQs7CCMMj74ogQlngsDv5_wJK7BG5L=w408-h593-k-no',
      ],
      description:
        'サービスオプション：屋外、選び出す、非接触型食品宅配サービス、配達、取り除く、内部使用。特徴：スポーツ。製品サービス：副菜、コーヒー、アルコール飲料。食事のオプション：ケータリングサービス、シート。施設：ジェンダーフレンドリーなトイレ、バー付き、トイレ、子供に適した、Wi-Fi、無料Wi-Fi利用可能。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ：グループに適しています、家族全員に適しています',
      owner_ID: 2,
      phone_number: '0386933168',
      address: 'A5 Lô3, 228 P. Trần Điền, Định Công, Hoàng Mai, Hà Nội',
      verified: 1,
      categories: ['猫カフェ', '喫茶店'],
    },
    {
      name: 'Cà phê sáo',
      opening_at: '07:30',
      closing_at: '22:45',
      status: 4,
      devices: [
        {
          name: 'エアコン',
          quantity: 1,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipNZzEpnW5L-BuAQagsEmtVg6CvhIjb17ogSbLhA=w408-h725-k-no',
      ],
      description:
        'サービスオプション：屋外、選び出す、非接触型食品宅配サービス、配達、取り除く、内部使用。特徴：スポーツ。製品サービス：副菜、コーヒー、アルコール飲料。食事のオプション：ケータリングサービス、シート。施設：ジェンダーフレンドリーなトイレ、バー付き、トイレ、子供に適した、Wi-Fi、無料Wi-Fi利用可能。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ：グループに適しています、家族全員に適しています',
      owner_ID: 2,
      phone_number: '0975504488',
      address: 'Số 39 Ngõ 24 Kim Đồng, Giáp Bát, Hoàng Mai, Hà Nội',
      verified: 1,
      categories: ['猫カフェ'],
    },
    {
      name: 'Bốt Cà Phê',
      opening_at: '07:00',
      closing_at: '23:00',
      status: 4,
      devices: [
        {
          name: 'エアコン',
          quantity: 3,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1, 0, 1, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1, 1, 0, 1, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipO_OU88el9Y7SPUXq9kHOupFV8uVDJenZwC4DnF=w408-h272-k-no',
      ],
      description:
        'サービスオプション: 屋外席、取り除く、内部使用。アクセシビリティ：バリアフリー入口、バリアフリー席、バリアフリー駐車場。製品サービス、コーヒー。食事のオプション：朝食、ブランチ、ランチ、ケータリングサービス、シート。施設：犬可、トイレ。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ：グループに適しています。計画する：予約を受け付ける。',
      owner_ID: 2,
      phone_number: '0981358758',
      address: '18b Ng. 18 P. Võ Văn Dũng, Chợ Dừa, Đống Đa, Hà Nội',
      verified: 0,
      categories: ['猫カフェ'],
    },
    {
      name: 'Căng-tin Caphe',
      opening_at: '08:00',
      closing_at: '23:00',
      status: 4,
      devices: [
        {
          name: 'エアコン',
          quantity: 0,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 1, 2, 0, 1, 1, 1, 1, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 1, 2, 0, 1, 1, 1, 1, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipPAmGxBwm00A4-tQiv0sv-ywgyAWYrDlIftJzps=w426-h240-k-no',
      ],
      description:
        'チャンティン・カフェのサービスオプション：屋外席、配達、取り除く、内部使用。アクセシビリティ：バリアフリー入口、多目的トイレ、バリアフリー席、バリアフリー駐車場。製品サービス：コーヒー、アルコール飲料。食事のオプション：朝食、ブランチ、ランチ、夕食、ケータリングサービス、シート。施設：犬可、ジェンダーフレンドリーなトイレ、バー付き、トイレ、Wi-Fi、無料Wi-Fi利用可能。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ：グループに適しています、家族全員に適しています。支払方法：現金のみ。',
      owner_ID: 2,
      phone_number: '0372099359',
      address:
        'Đối diện số, 31 Ngh. 180/29 P. Kim Hoa, Phương Liên, Đống Đa, Hà Nội',
      verified: 1,
      categories: ['猫カフェ'],
    },
    {
      name: 'Brushed Coffee',
      opening_at: '08:30',
      closing_at: '22:30',
      status: 5,
      devices: [
        {
          name: 'エアコン',
          quantity: 2,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipNNgnTHH8XBRFqTZiw_p9apF5oQXKEzUCIQK3nA=w426-h240-k-no',
      ],
      description:
        'サービスオプション：内部使用。アクセシビリティ：バリアフリー入口、バリアフリー席、バリアフリー駐車場。製品サービス：コーヒー。施設：トイレ。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ、グループに適しています。',
      owner_ID: 2,
      phone_number: '0919370189',
      address: '26 Ng. 44 P. Đại An, P. Văn Quán, Hà Đông, Hà Nội, 越南',
      verified: 1,
      categories: ['喫茶店'],
    },
    {
      name: 'Café Nhà Sàn',
      opening_at: '08:00',
      closing_at: '22:00',
      status: 3,
      devices: [
        {
          name: 'エアコン',
          quantity: 1,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 1, 1, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 2, 2, 1, 1, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipM75zV93kQNfIvGakmvYVy3n_np9SkkIeNxVunk=w408-h408-k-no',
      ],
      description:
        'サービスオプション: 取り除く、内部使用。特徴：迅速なサービス、ライブパフォーマンス、ライブ音楽を提供する。製品サービス：コーヒー、アルコール飲料。食事のオプション：ケータリングサービス。施設：犬可、トイレ。雰囲気：のんびりとした雰囲気。快適な環境：人口グループ、グループに適しています。計画する：予約を受け付ける。',
      owner_ID: 2,
      phone_number: '0919370183',
      address: 'Ng. 6 P. Vĩnh Phúc, Vĩnh Phú, Ba Đình, Hà Nội, 越南',
      verified: 1,
      categories: ['喫茶店'],
    },
    {
      name: 'Cafe Lan Anh',
      opening_at: '08:30',
      closing_at: '21:30',
      status: 3,
      devices: [
        {
          name: 'エアコン',
          quantity: 1,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipP8uMr6Tnn4dQDgjkW3oN2GgUJESmg_ue3HOP-W=w408-h306-k-no',
      ],
      description:
        'サービスオプション：屋外席、内部使用。製品サービス：コーヒー。食事のオプション：ケータリングサービス、シート。施設：犬可、トイレ。雰囲気：のんびりとした雰囲気。人口グループ：グループに適しています。',
      owner_ID: 2,
      phone_number: '0979225869',
      address: 'Cooffee Lan Anh, Liên Hiệp, Phúc Thọ, Hà Nội',
      verified: 1,
      categories: ['喫茶店'],
    },
    {
      name: 'Cafe Lak Lak',
      opening_at: '06:30',
      closing_at: '22:30',
      status: 0,
      devices: [
        {
          name: 'エアコン',
          quantity: 2,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipMcpLAb5PQZF_mEiHxPMGv1EY40QApDnKbz4Ewc=w426-h240-k-no',
      ],
      description:
        '食事のオプション:朝食、ケータリングサービス。施設：トイレ、子供に適した。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ、グループに適しています。',
      owner_ID: 2,
      phone_number: '0979225759',
      address: 'Khu Vệ Lăng Cây Sung, Song Phượng, Đan Phượng, Hà Nội',
      verified: 0,
      categories: ['喫茶店'],
    },
    {
      name: 'Xưa Cà Phê',
      opening_at: '08:30',
      closing_at: '23:30',
      status: 0,
      devices: [
        {
          name: 'エアコン',
          quantity: 3,
          status: 'good',
        },
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 0, 0,
          0,
        ],
      ],
      images: [
        'https://lh5.googleusercontent.com/p/AF1QipNj8iEP4M0D25s5WMGAz7C6S_-1uRBLlze8OiCM=w426-h240-k-no',
      ],
      description:
        'サービスオプション：屋外席、選び出す、非接触型食品宅配サービス、配達、内部使用。製品サービス：コーヒー。食事のオプション：シート。施設：トイレ、子供に適した。雰囲気：のんびりとした雰囲気、快適な環境。人口グループ、グループに適しています。',
      owner_ID: 2,
      phone_number: '0358229935',
      address: '68 Ngõ 254, Tây Sơn, Đan Phượng, Hà Nội, 越南',
      verified: 0,
      categories: ['喫茶店'],
    },
  ],
  reviews: [
    {
      review: '涼しいエアコン、熱心なスタッフ',
      star: 5,
      coffee_shop_ID: 25,
      images: [],
    },
    {
      review: '涼しいエアコン、広々とした空間',
      star: 5,
      coffee_shop_ID: 16,
      images: [],
    },
    {
      review: '壊れたエアコン',
      star: 3,
      coffee_shop_ID: 30,
      images: [],
    },
    {
      review: 'エアコンはありますが暑いです',
      star: 3,
      coffee_shop_ID: 35,
      images: [],
    },
    {
      review: 'エアコンが寒すぎる',
      star: 4,
      coffee_shop_ID: 25,
      images: [],
    },
    {
      review: '涼しいエアコン、熱心なスタッフ',
      star: 4,
      coffee_shop_ID: 20,
      images: [],
    },
    {
      review: '涼しいエアコン、広々とした空間',
      star: 4,
      coffee_shop_ID: 21,
      images: [],
    },
    {
      review: 'エアコンが壊れているのでとても暑いです',
      star: 2,
      coffee_shop_ID: 23,
      images: [],
    },
    {
      review: 'エアコンが寒すぎる',
      star: 5,
      coffee_shop_ID: 23,
      images: [],
    },
    {
      review: 'エアコンはありますが暑いです',
      star: 2,
      coffee_shop_ID: 28,
      images: [],
    },
    {
      review: 'エアコンがとても涼しいです',
      star: 5,
      coffee_shop_ID: 35,
      images: [],
    },
    {
      review: 'エアコンが寒すぎる',
      star: 4,
      coffee_shop_ID: 40,
      images: [],
    },
    {
      review: 'エアコンはありますが暑いです',
      star: 1,
      coffee_shop_ID: 28,
      images: [],
    },
    {
      review: '涼しいエアコン、広々とした空間',
      star: 5,
      coffee_shop_ID: 38,
      images: [],
    },
    {
      review: 'エアコンはありますが暑いです',
      star: 2,
      coffee_shop_ID: 42,
      images: [],
    },
    {
      review: 'エアコンが作動しない',
      star: 2,
      coffee_shop_ID: 45,
      images: [],
    },
    {
      review: 'エアコンがとても涼しいです',
      star: 5,
      coffee_shop_ID: 35,
      images: [],
    },
    {
      review: '涼しいエアコン、広々とした空間',
      star: 5,
      coffee_shop_ID: 44,
      images: [],
    },
    {
      review: 'エアコンが寒すぎる',
      star: 4,
      coffee_shop_ID: 43,
      images: [],
    },
    {
      review: 'エアコンはありますが暑いです',
      star: 2,
      coffee_shop_ID: 37,
      images: [],
    },
  ],
};

const ho = {
  users: [
    {
      password: '12345',
      email: 'hoangdh@gmail.com',
      username: 'hoangdh',
      phone_number: '0123456789',
      date_of_birth: '2001-02-02T07:00:33.307Z',
      image_url:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw09cIf0uVXkpmJNFFuUSvTi&ust=1687158375612000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOj2ke-gzP8CFQAAAAAdAAAAABAE',
      role: 1,
    },
    {
      password: '12345',
      email: 'hoangdh1@gmail.com',
      username: 'hoangdh1',
      phone_number: '0123456789',
      date_of_birth: '2001-02-02T07:00:33.307Z',
      image_url:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw09cIf0uVXkpmJNFFuUSvTi&ust=1687158375612000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOj2ke-gzP8CFQAAAAAdAAAAABAE',
      role: 0,
    },
    {
      password: '12345',
      email: 'hoangdh2@gmail.com',
      username: 'hoangdh2',
      phone_number: '0123456789',
      date_of_birth: '2001-02-02T07:00:33.307Z',
      image_url:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw09cIf0uVXkpmJNFFuUSvTi&ust=1687158375612000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOj2ke-gzP8CFQAAAAAdAAAAABAE',
      role: 0,
    },
    {
      password: '12345',
      email: 'hoangdh3@gmail.com',
      username: 'hoangdh3',
      phone_number: '0123456789',
      date_of_birth: '2001-02-02T07:00:33.307Z',
      image_url:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw09cIf0uVXkpmJNFFuUSvTi&ust=1687158375612000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOj2ke-gzP8CFQAAAAAdAAAAABAE',
      role: 0,
    },
    {
      password: '12345',
      email: 'hoangdh4@gmail.com',
      username: 'hoangdh4',
      phone_number: '0123456789',
      date_of_birth: '2001-02-02T07:00:33.307Z',
      image_url:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw09cIf0uVXkpmJNFFuUSvTi&ust=1687158375612000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOj2ke-gzP8CFQAAAAAdAAAAABAE',
      role: 0,
    },
  ],
  coffee_shops: [
    {
      name: 'Eden Coffee',
      opening_at: '07:00',
      closing_at: '23:00',
      status: 3,
      owner_ID: 14,
      devices: [
        {
          name: 'エアコン',
          quantity: 4,
          status: 'good',
        },
      ],
      images: [
        'https://ik.imagekit.io/tvlk/blog/2022/09/quan-cafe-dep-o-ha-noi-3-768x1024.jpeg?tr=dpr-2,w-675',
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 1, 0, 0, 0,
          0,
        ],
      ],
      description:
        'この店からは、ハノイの有名な観光スポットの 1 つである古代大聖堂を直接望む最高の景色を眺めることができます。 レストランには屋内スペースと屋外スペースがあります。 床には芝生のカーペットが敷き詰められ、上部には植物や花が飾られ、太陽の光と風があふれる楽園の庭園の真ん中でコーヒーを飲んでいるような気分になれます。',
      phone_number: '0135798642',
      address: 'Số 2 Nhà Thờ, Hoàn Kiếm, Hà Nội',
      verified: 1,
      categories: ['猫カフェ'],
    },
    {
      name: 'Check in Crema Coffee',
      opening_at: '07:30',
      closing_at: '21:00',
      status: 4,
      owner_ID: 14,
      devices: [
        {
          name: 'エアコン',
          quantity: 2,
          status: 'good',
        },
      ],
      images: [
        'https://ik.imagekit.io/tvlk/blog/2022/09/quan-cafe-dep-o-ha-noi-1-979x1024.jpeg?tr=dpr-2,w-675',
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0,
          0,
        ],
      ],
      description:
        'ハノイにある日本庭園風の美しいカフェです。 店内はワンフロアですが、裏と表の2か所に中庭があり、今もきらめく「バーチャルリビング」コーナーが無数にあります。 メインのインテリアは茶色の木を基調とし、随所に緑の木々が配置されており、安らぎとくつろぎの感覚が満たされます。',
      phone_number: '0159876432',
      address: '65 P. Trần Quang Diệu, Chợ Dừa, Đống Đa, Hà Nội',
      verified: 1,
      categories: ['猫カフェ'],
    },
    {
      name: 'Trill Rooftop Cafe Hei Tower',
      opening_at: '08:00',
      closing_at: '23:00',
      status: 1,
      owner_ID: 14,
      devices: [
        {
          name: 'エアコン',
          quantity: 1,
          status: 'bad',
        },
      ],
      images: [
        'https://ik.imagekit.io/tvlk/blog/2022/09/quan-cafe-dep-o-ha-noi-11-1024x1024.jpeg?tr=dpr-2,w-675',
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 0,
          0,
        ],
      ],
      description:
        'ハノイで広い屋外スペースのある美しいカフェをお探しなら、Trill Rooftop は見逃せない提案です。 ここは、上空からハノイの街を眺めながらお気に入りのドリンクを飲むのに最適な場所です。',
      phone_number: '0159876122',
      address:
        'Hei Tower, 1 P.Ngụy Như Kon Tum, Nhân Chính, Thanh Xuân, Hà Nội',
      verified: 0,
      categories: ['猫カフェ'],
    },
    {
      name: 'Lofita Cafe',
      opening_at: '08:00',
      closing_at: '23:00',
      status: 2,
      owner_ID: 14,
      devices: [
        {
          name: 'エアコン',
          quantity: 1,
          status: 'bad',
        },
      ],
      images: [
        'https://ik.imagekit.io/tvlk/blog/2022/09/quan-cafe-dep-o-ha-noi-5.jpg?tr=dpr-2,w-675',
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 2, 2, 1, 1, 2, 2, 1, 0, 0,
          0,
        ],
      ],
      description:
        'ハノイにあるこの美しいカフェは、紅茶、フレッシュジュース、砂糖を含まないすべての飲み物など、非常に健康的なドリンクメニューを「提供」しています。 バルコニーの隅々まで、窓枠一つ一つが光で満たされています。 広大な景色は夢見る心を満たしてくれます。',
      phone_number: '0158306122',
      address: 'Tầng 9 – 10, 338 Phố Huế, Hai Bà Trưng, Hà Nội',
      verified: 0,
      categories: ['猫カフェ'],
    },
    {
      name: 'Nola Cafe',
      opening_at: '10:00',
      closing_at: '23:30',
      status: 5,
      owner_ID: 14,
      devices: [
        {
          name: 'エアコン',
          quantity: 3,
          status: 'good',
        },
      ],
      images: [
        'https://ik.imagekit.io/tvlk/blog/2022/09/quan-cafe-dep-o-ha-noi-6-1024x683.jpeg?tr=dpr-2,w-675',
      ],
      crowded_hours: [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 2, 2, 1, 0, 0,
          0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1, 0, 0,
          0,
        ],
      ],
      description:
        'Nola Cafeはいつ見ても美しく、どの角度から見ても美しいです。 レストランのハイライトは、秋のロマンチックな緑の夏の蔓です。 ここからは、マ メイ ストリートにある苔むした古いタウンハウスを眺めることができます。 音楽が流れる店内は、一度来たら戻りたくない、優しくて温かい。',
      phone_number: '0105306122',
      address: '89 Mã Mây, Hoàn Kiếm, Hà Nội',
      verified: 1,
      categories: ['猫カフェ'],
    },
  ],
  reviews: [
    {
      review: '涼しいエアコン、熱心なスタッフ',
      star: 5,
      create_at: '2023-06-17T07:30:53.400Z',
      coffee_shop_ID: 43,
      images: [],
    },
    {
      review:
        '涼しいエアコン。このお店はとても美しく、ヴィンテージで芸術的な空間です',
      star: 4,
      create_at: '2023-06-18T07:30:53.400Z',
      coffee_shop_ID: 43,
      images: [],
    },
    {
      review: '素敵なレストラン、広々とした静かな空間。涼しいエアコン',
      star: 5,
      create_at: '2023-06-18T07:30:53.400Z',
      coffee_shop_ID: 43,
      images: [],
    },
    {
      review: '店内はエアコンが効いていてとても涼しいです',
      star: 5,
      create_at: '2023-06-16T07:30:53.400Z',
      coffee_shop_ID: 43,
      images: [],
    },
    {
      review: '暑い',
      star: 1,
      create_at: '2023-06-12T07:30:53.400Z',
      coffee_shop_ID: 44,
      images: [],
    },
    {
      review:
        'スタッフにエアコンの調整をお願いしましたが、調整してくれませんでした。',
      star: 1,
      create_at: '2023-06-09T07:30:53.400Z',
      coffee_shop_ID: 44,
      images: [],
    },
    {
      review: 'カフェの中はとても暑いです',
      star: 2,
      create_at: '2023-06-10T07:30:53.400Z',
      coffee_shop_ID: 44,
      images: [],
    },
    {
      review: 'エアコンをつけてもまだ暑い',
      star: 3,
      create_at: '2023-05-16T07:30:53.400Z',
      coffee_shop_ID: 44,
      images: [],
    },
    {
      review: '涼しいエアコン',
      star: 4,
      create_at: '2023-06-13T07:30:53.400Z',
      coffee_shop_ID: 45,
      images: [],
    },
    {
      review: '涼しいエアコン。このお店はとても美しい',
      star: 5,
      create_at: '2023-06-10T07:30:53.400Z',
      coffee_shop_ID: 45,
      images: [],
    },
    {
      review: '素敵なレストラン、広々とした静かな空間。涼しいエアコン',
      star: 5,
      create_at: '2023-06-11T07:30:53.400Z',
      coffee_shop_ID: 45,
      images: [],
    },
    {
      review: '店内はエアコンが効いていてとても涼しいです',
      star: 5,
      create_at: '2023-06-12T07:30:53.400Z',
      coffee_shop_ID: 45,
      images: [],
    },
    {
      review: '暑いすぎいいいいいいい',
      star: 1,
      create_at: '2023-06-10T07:30:53.400Z',
      coffee_shop_ID: 40,
      images: [],
    },
    {
      review:
        'スタッフにエアコンの調整をお願いしましたが、調整してくれませんでした。',
      star: 2,
      create_at: '2023-06-09T07:30:53.400Z',
      coffee_shop_ID: 40,
      images: [],
    },
    {
      review: 'カフェの中はとても暑いです',
      star: 2,
      create_at: '2023-06-10T07:30:53.400Z',
      coffee_shop_ID: 40,
      images: [],
    },
    {
      review: '店内はエアコンをつけていない',
      star: 1,
      create_at: '2023-05-16T07:30:53.400Z',
      coffee_shop_ID: 40,
      images: [],
    },
    {
      review: '素敵なレストラン、広々とした静かな空間。涼しいエアコン',
      star: 5,
      create_at: '2023-06-01T07:30:53.400Z',
      coffee_shop_ID: 42,
      images: [],
    },
    {
      review: '店内はエアコンが効いていてとても涼しいです',
      star: 5,
      create_at: '2023-06-12T07:30:53.400Z',
      coffee_shop_ID: 42,
      images: [],
    },
    {
      review: 'エアコンをつけずに暑い昼下がり',
      star: 1,
      create_at: '2023-06-09T07:30:53.400Z',
      coffee_shop_ID: 42,
      images: [],
    },
    {
      review:
        'スタッフにエアコンの調整をお願いしましたが、調整してくれませんでした。',
      star: 2,
      create_at: '2023-06-09T07:30:53.400Z',
      coffee_shop_ID: 42,
      images: [],
    },
  ],
};

export const users = [...an.users, ...gi.users, ...ho.users];
export const coffeeShops = [
  ...an.coffee_shops,
  ...gi.coffee_shops,
  ...ho.coffee_shops,
];
export const reviews = [...an.reviews, ...gi.reviews, ...ho.reviews];
