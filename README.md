# SafeBeautyLedger Consumer AI Chatbot

This repository contains the consumer app code for the SafeBeautyLedger project. It's a Next.js-based application that provides an AI-powered chatbot interface for consumers to interact with and get information about beauty products.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building web applications
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [OpenAI API](https://openai.com/api/) - For AI-powered chat functionality
- [Axios](https://axios-http.com/) - Promise-based HTTP client for making API requests

## Prerequisites

Before setting up the application, ensure you have the following installed:

- Node.js (version 14 or later)
- npm (Node Package Manager) or yarn

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/your-username/safebeautyledger-consumer-ai.git
   cd safebeautyledger-consumer-ai
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_API_URL=http://localhost:3001  # Or your API server URL
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `src/app/`: Contains the main application code
- `src/app/components/`: React components used in the application
- `src/app/api/`: API routes for handling server-side logic
- `src/app/assistant/`: Product assistant page
- `public/`: Static assets

## Key Features

- AI-powered chatbot for product inquiries
- Dynamic product information fetching
- Responsive design for various screen sizes

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.