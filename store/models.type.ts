export interface Category {
  id: number;
  name?: string;
  category_name: string;
  category_description: string;
  order: number;
  category_image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  price: number;
  duration: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  is_user_subscribed: boolean;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  user_name: string;
  user_avatar: string | null;
  type: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profile_image: string | null;
  country: string | null;
  bio: string | null;
  gender: string | null;
  email_verified_at: string | null;
  device_token: string | null;
  fcm_token: string | null;
  is_login: number;
  is_active: boolean;
  is_verified: boolean;
  created_at: string | null;
  updated_at: string;
  is_user_subscribed: boolean;
  type: string;
  author: Author | null;
  publisher: Publisher | null;
  interests?: { [key: string]: string } | null;
}

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  status: string;
  likes_count?: number;
  comments_count?: number;
  is_liked: boolean;
  rejection_note: string | null;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Comment {
  id: number;
  user_id: number;
  post_id: number;
  body: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Slider {
  id: number;
  related_id: number;
  image: string;
  type_related: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: string;
  date: string | null;
}

export interface Book {
  id: number;
  title: string;
  image?: string;
  cover_image?: string;
  rating: number;
  number_of_ratings: number;
  reviews: Review[];
  relatedBooks: Book[];
  language: string;
  pages: number;
  reads_count: number;
  price: number;
  category: Category | null;
  publisher: Publisher | null;
  author: Author | null;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Publisher {
  id: number;
  publisher_name: string;
  image: string;
  desc: string;
  fb: string;
  yt: string;
  telegram: string;
  whatsapp: string;
  instagram: string;
  book_count: number;
  total_reads: number;
  user_id: number;
  books: Book[];
  is_verified: boolean;
}

export interface Author {
  id: number;
  author_name: string;
  image: string;
  desc: string;
  fb: string;
  yt: string;
  telegram: string;
  whatsapp: string;
  instagram: string;
  user_id: number;
  book_count: number;
  total_reads: number;
  is_verified: boolean;
  books: Book[];
}
