// Sample data for ReWear platform demo
export const sampleItems = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic vintage denim jacket from the 90s. Excellent condition with minimal wear. Perfect for layering and adding a retro touch to any outfit.',
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'Excellent',
    tags: ['vintage', 'denim', 'casual', 'retro'],
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    userId: 'user1',
    uploaderName: 'Sarah Johnson',
    uploaderEmail: 'sarah@example.com',
    pointsRequired: 50,
    status: 'available',
    createdAt: '2024-01-15T10:30:00Z',
    location: 'New York, NY'
  },
  {
    id: '2',
    title: 'Designer Silk Scarf',
    description: 'Luxurious silk scarf with beautiful floral patterns. Authentic designer piece, barely worn. Adds elegance to any ensemble.',
    category: 'Accessories',
    type: 'Scarf',
    size: 'One Size',
    condition: 'Like New',
    tags: ['designer', 'silk', 'elegant', 'formal'],
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    userId: 'user2',
    uploaderName: 'Emily Chen',
    uploaderEmail: 'emily@example.com',
    pointsRequired: 75,
    status: 'available',
    createdAt: '2024-01-14T14:20:00Z',
    location: 'Los Angeles, CA'
  },
  {
    id: '3',
    title: 'Casual Summer Dress',
    description: 'Light and breezy summer dress perfect for warm weather. Comfortable cotton blend with a flattering fit. Great for casual outings.',
    category: 'Dresses',
    type: 'Casual Dress',
    size: 'S',
    condition: 'Good',
    tags: ['summer', 'casual', 'comfortable', 'cotton'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    userId: 'user3',
    uploaderName: 'Jessica Williams',
    uploaderEmail: 'jessica@example.com',
    pointsRequired: 40,
    status: 'available',
    createdAt: '2024-01-13T09:15:00Z',
    location: 'Chicago, IL'
  },
  {
    id: '4',
    title: 'Professional Blazer',
    description: 'Sharp, tailored blazer perfect for business meetings and professional events. High-quality fabric with excellent construction.',
    category: 'Formal Wear',
    type: 'Blazer',
    size: 'L',
    condition: 'Excellent',
    tags: ['professional', 'business', 'formal', 'tailored'],
    images: [
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    userId: 'user4',
    uploaderName: 'Michael Brown',
    uploaderEmail: 'michael@example.com',
    pointsRequired: 80,
    status: 'available',
    createdAt: '2024-01-12T16:45:00Z',
    location: 'San Francisco, CA'
  },
  {
    id: '5',
    title: 'Trendy Sneakers',
    description: 'Stylish sneakers in excellent condition. Perfect for casual wear and sports activities. Comfortable and durable.',
    category: 'Footwear',
    type: 'Sneakers',
    size: '9',
    condition: 'Very Good',
    tags: ['sneakers', 'casual', 'comfortable', 'sports'],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    userId: 'user5',
    uploaderName: 'Alex Davis',
    uploaderEmail: 'alex@example.com',
    pointsRequired: 60,
    status: 'available',
    createdAt: '2024-01-11T11:30:00Z',
    location: 'Miami, FL'
  },
  {
    id: '6',
    title: 'Bohemian Maxi Dress',
    description: 'Flowing maxi dress with beautiful bohemian patterns. Perfect for festivals, beach days, or any casual occasion.',
    category: 'Dresses',
    type: 'Maxi Dress',
    size: 'M',
    condition: 'Good',
    tags: ['bohemian', 'maxi', 'festival', 'flowy'],
    images: [
      'https://images.unsplash.com/photo-1566479179817-c2c9c1a3e9dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    userId: 'user6',
    uploaderName: 'Luna Rodriguez',
    uploaderEmail: 'luna@example.com',
    pointsRequired: 45,
    status: 'available',
    createdAt: '2024-01-10T13:20:00Z',
    location: 'Austin, TX'
  }
];

export const sampleUsers = [
  {
    id: 'user1',
    displayName: 'Sarah Johnson',
    email: 'sarah@example.com',
    points: 150,
    createdAt: '2024-01-01T00:00:00Z',
    role: 'user',
    location: 'New York, NY',
    bio: 'Fashion enthusiast who loves vintage and sustainable clothing.'
  },
  {
    id: 'user2',
    displayName: 'Emily Chen',
    email: 'emily@example.com',
    points: 200,
    createdAt: '2024-01-02T00:00:00Z',
    role: 'user',
    location: 'Los Angeles, CA',
    bio: 'Designer with a passion for luxury accessories and sustainable fashion.'
  },
  {
    id: 'admin1',
    displayName: 'Admin User',
    email: 'admin@rewear.com',
    points: 1000,
    createdAt: '2024-01-01T00:00:00Z',
    role: 'admin',
    location: 'HQ',
    bio: 'Platform administrator'
  }
];

export const sampleSwaps = [
  {
    id: 'swap1',
    requesterId: 'user1',
    requesterName: 'Sarah Johnson',
    itemId: '2',
    itemTitle: 'Designer Silk Scarf',
    ownerId: 'user2',
    ownerName: 'Emily Chen',
    offeredItemId: '1',
    offeredItemTitle: 'Vintage Denim Jacket',
    status: 'pending',
    message: 'Hi! I love your silk scarf. Would you be interested in swapping it for my vintage denim jacket?',
    createdAt: '2024-01-15T15:30:00Z'
  },
  {
    id: 'swap2',
    requesterId: 'user3',
    requesterName: 'Jessica Williams',
    itemId: '4',
    itemTitle: 'Professional Blazer',
    ownerId: 'user4',
    ownerName: 'Michael Brown',
    offeredItemId: '3',
    offeredItemTitle: 'Casual Summer Dress',
    status: 'accepted',
    message: 'I need a professional blazer for work. Would you like to swap for my summer dress?',
    createdAt: '2024-01-14T10:15:00Z'
  }
];

export const categories = [
  'Outerwear',
  'Dresses',
  'Tops',
  'Bottoms',
  'Formal Wear',
  'Casual Wear',
  'Footwear',
  'Accessories',
  'Activewear',
  'Sleepwear'
];

export const sizes = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'One Size'
];

export const conditions = [
  'Like New',
  'Excellent',
  'Very Good',
  'Good',
  'Fair'
];

export const itemTypes = {
  'Outerwear': ['Jacket', 'Coat', 'Blazer', 'Cardigan', 'Hoodie'],
  'Dresses': ['Casual Dress', 'Formal Dress', 'Maxi Dress', 'Mini Dress', 'Cocktail Dress'],
  'Tops': ['T-Shirt', 'Blouse', 'Tank Top', 'Sweater', 'Shirt'],
  'Bottoms': ['Jeans', 'Pants', 'Shorts', 'Skirt', 'Leggings'],
  'Formal Wear': ['Suit', 'Blazer', 'Dress Shirt', 'Formal Dress', 'Tuxedo'],
  'Casual Wear': ['T-Shirt', 'Jeans', 'Casual Dress', 'Hoodie', 'Sweatpants'],
  'Footwear': ['Sneakers', 'Boots', 'Heels', 'Sandals', 'Flats'],
  'Accessories': ['Bag', 'Scarf', 'Hat', 'Jewelry', 'Belt'],
  'Activewear': ['Yoga Pants', 'Sports Bra', 'Athletic Shorts', 'Running Shirt', 'Gym Wear'],
  'Sleepwear': ['Pajamas', 'Nightgown', 'Robe', 'Sleep Shirt', 'Loungewear']
};