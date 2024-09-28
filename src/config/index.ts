import pkg from '@/package.json';
import dotenv from 'dotenv';

dotenv.config();

export default class Config {
  static readonly App = {
    Name: pkg.name,
    Title: pkg.title,
    Description: pkg.description,
    Version: pkg.version,
    Author: {
      Name: /.+\s/g.exec(pkg.author)?.[0],
      Email: /<.+>/g.exec(pkg.author)?.[0],
      Url: pkg.authorUrl
    },
    License: {
      Name: pkg.license,
      Url: pkg.licenseUrl
    }
  };

  static readonly Envs = {
    Port: process.env.PORT || 5001,
    Dev: process.env.NODE_ENV === 'development',
    Test: process.env.NODE_ENV === 'test',
    Prod: process.env.NODE_ENV === 'production'
  };

  static readonly Auth = {
    Secret: process.env.AUTH_SECRET,
    ExpiresIn: 3600
  };

  static readonly HttpClient = {
    Timeout: 20000,
    MaxRedirects: 5
  };
}
