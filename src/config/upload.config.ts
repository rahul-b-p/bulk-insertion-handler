import multer from 'multer';
import { Request } from 'express';

import { slugify } from '../utils/slug.utils.js';
import logger from '../utils/logger.utils.js';
import HttpError from '../errors/http.error.js';
import { HttpStatus } from '../enums/http.enum.js';
import errorsConstant from '../constants/errors.constant.js';
import { env } from './env.config.js';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads');
  },
  filename(_req, file, cb) {
    const fileName = slugify(file.filename + '-' + new Date());
    cb(null, fileName);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  switch (file.mimetype) {
    case 'application/json':
      logger.debug('Parsing JSON file');
      cb(null, true);
      break;
    case 'text/csv':
      logger.debug('Parsing JSON file');
      cb(null, true);
      break;
    default:
      logger.warn('Trying to upload invalid File Type');
      cb(
        new HttpError(HttpStatus.BAD_REQUEST, errorsConstant.INVALID_FILE_TYPE),
      );
      break;
  }
};

const upload = multer({
  storage,
  limits: {
    files: env.UPLOAD_LIMIT,
    fileSize: env.UPLOAD_MAX_SIZE * 1024 * 1024,
  },
  fileFilter,
});
export default upload;
