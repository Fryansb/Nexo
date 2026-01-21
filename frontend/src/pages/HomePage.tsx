import { Layout } from '../components/layout/Layout';

export const HomePage = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Feed</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600">Feed de posts em breve...</p>
        </div>
      </div>
    </Layout>
  );
};
