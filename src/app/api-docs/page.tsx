// app/api-docs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const ApiDocsPage = () => {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    const loadSpec = async () => {
      try {
        const response = await fetch('/api/docs');
        const specData = await response.json();
        setSpec(specData);
      } catch (error) {
        console.error('Error loading Swagger spec:', error);
      }
    };

    loadSpec();
  }, []);

  if (!spec) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка документации...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Documentation</h1>
          <p className="text-gray-600">Документация REST API для интернет-магазина Merket</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <SwaggerUI
            spec={spec}
            tryItOutEnabled={true}
            supportedSubmitMethods={['get', 'post', 'put', 'delete']}
          />
        </div>
      </div>
    </div>
  );
};

export default ApiDocsPage;
