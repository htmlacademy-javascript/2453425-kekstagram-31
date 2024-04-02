import { renderPhotoGallery } from './gallery/gallery.js';
import { init as initUploadForm } from './upload-form/upload-form.js';

import { getData } from './loading-module.js';
import { showErrorMessage } from './error-message.js';

const bootstrap = async () => {
  try {
    const posts = await getData();
    renderPhotoGallery(posts);
  } catch (error) {
    showErrorMessage('Не удалось загрузить данные. Попробуйте еще раз');
  }
};

bootstrap();
initUploadForm();
