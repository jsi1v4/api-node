import pkg from '@/package.json';
import dotenv from 'dotenv';

dotenv.config();

export default class Config {
  static readonly App = {
    Name: pkg.name,
    Title: pkg.title,
    Description: pkg.description,
    Version: pkg.version
  };

  static readonly Envs = {
    Port: process.env.PORT || 5000,
    Dev: process.env.NODE_ENV === 'development',
    Test: process.env.NODE_ENV === 'test',
    Prod: process.env.NODE_ENV === 'production'
  };
}
