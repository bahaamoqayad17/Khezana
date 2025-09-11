export interface Category {
  category_id: number;
  category_name: string;
  category_icon: string | null;
  category_image_url: string | null;
  order: number;
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
  features: {
    id: number;
    subscription_id: number;
    text: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }[];
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
  user_id: number;
  user_name: string;
  user_email: string;
  user_image_url: string | null;
  user_country: string | null;
  user_bio: string | null;
  user_gender: string | null;
  user_expo_push_token: string | null;
  user_joined_at: string | null;
  is_verified: boolean;
  created_at: string | null;
  updated_at: string | null;
  author: Author | null;
  publisher: Publisher | null;
  interests?: { [key: string]: string } | null;
  is_subscribed: boolean;
}

export interface Post {
  post_id: number;
  post_title: string;
  post_body: string;
  post_image_url: string;
  post_status: string;
  post_rejection_note: string;
  post_created_at: string;
  author: User;
  post_comments_count: number;
  post_likes_count: number;
  post_is_saved: boolean;
  post_is_liked: boolean;
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
  user: User;
  date: string | null;
}

export interface Book {
  book_id: number;
  book_title: string;
  book_cover_image?: string;
  rating: number;
  number_of_ratings: number;
  related_books: Book[];
  book_language: string;
  book_page_count: number;
  reads_count: number;
  book_price: number;
  category: Category | null;
  publisher: Publisher | null;
  author: Author | null;
  book_description: string;
  book_in_cart?: boolean;
  book_is_purchased?: boolean;
  book_can_read?: boolean;
  book_created_at: string;
  book_updated_at: string;
  reviews: Review[];
}

export interface Publisher {
  publisher_id: number;
  publisher_name: string;
  publisher_image: string;
  publisher_description: string;
  social_links: {
    publisher_facebook: string;
    publisher_youtube: string;
    publisher_telegram: string;
    publisher_whatsapp: string;
    publisher_instagram: string;
  };
  book_count: number;
  total_reads: number;
  user_id: number;
  books: Book[];
  is_verified: boolean;
}

export interface Author {
  author_id: number;
  author_name: string;
  author_image: string;
  author_description: string;
  social_links: {
    author_facebook: string;
    author_youtube: string;
    author_telegram: string;
    author_whatsapp: string;
    author_instagram: string;
  };
  user_id: number;
  book_count: number;
  total_reads: number;
  is_verified: boolean;
  books: Book[];
}
