import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://salixai.vercel.app',
      lastModified: new Date(),  
      priority: 1,
    },
  ]
}