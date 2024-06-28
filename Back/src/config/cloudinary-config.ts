import { v2 } from 'cloudinary';
import { environment } from './environment';

export const cloudinaryConfig = {
  provide: 'cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: environment.cloudinary.cloud_name,
      api_key: environment.cloudinary.api_key,
      api_secret: environment.cloudinary.api_secret,
    });
  },
};
