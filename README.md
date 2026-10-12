# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে দেখার একটি ওয়েবসাইট। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, দামের পরিবর্তন এবং বাজারভিত্তিক বিস্তারিত তথ্য এক জায়গায়।

A price tracking website for essential groceries in Bangladesh. See today's prices, daily changes, and market-wise details in one place.

**🔗 Live Link:** https://bazardor-iota-seven.vercel.app

## ✨ Features

1. **Live price ticker:** an infinite scrolling strip showing today's price and ▲/▼ change for every product.
2. **Top risers and fallers:** the six biggest price rises and falls of the day on the home page.
3. **Category pages with sorting:** filter by category and sort by price (low to high, high to low), with correct numeric sorting.
4. **Protected product details:** a price summary (minimum, maximum, average) and a market-wise price table, visible only to logged-in users.
5. **Authentication with Better Auth:** email/password sign up and sign in, plus social login with Google and GitHub.
6. **Profile management:** a My Profile page where users can update their name.
7. **Toast notifications** for sign in, sign up, sign out, validation errors and protected-route redirects.
8. **Fully responsive** design for mobile, tablet and desktop.
9. **Loading skeletons and a friendly 404 page** for a smooth experience.

## 🛠️ Technologies Used

- Next.js (App Router)
- React
- Tailwind CSS + DaisyUI
- Better Auth (email/password, Google, GitHub)
- MongoDB Atlas
- react-hot-toast
- Vercel (deployment)

## 🚀 Run Locally

```bash
git clone https://github.com/shnj2025/bazardor.git
cd bazardor
npm install
npm run dev
```

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_API_URL=https://api.api-store.workers.dev/api/bazardor
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 📸 Pages

- `/` Home (hero, risers, fallers, all products)
- `/category/[slug]` Category page with sorting
- `/product/[slug]` Product details (login required)
- `/signin` and `/signup` Authentication
- `/profile` and `/profile/update` My Profile