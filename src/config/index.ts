import pkg from '@/package.json';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  app: {
    name: pkg.name,
    title: pkg.title,
    description: pkg.description,
    version: pkg.version
  },
  env: {
    port: process.env.PORT || 5000,
    dev: process.env.NODE_ENV === 'development',
    test: process.env.NODE_ENV === 'test',
    prod: process.env.NODE_ENV === 'production'
  }
};

export default config;
