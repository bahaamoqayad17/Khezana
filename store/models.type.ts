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

export interface Book {
  id: number;
  title: string;
  price: string;
  image: string;
  created_at: string;
  updated_at: string;
}
