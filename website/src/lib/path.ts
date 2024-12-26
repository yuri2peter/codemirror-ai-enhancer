import path from 'path';

// const IS_DEV_SERVER = process.env.NODE_ENV === 'development';
export const CWD = process.cwd();
export const STATIC_DATA_PATH = path.resolve(CWD, 'data/static');
export const RUNTIME_DATA_PATH = path.resolve(CWD, 'data/runtime');
export const PUBLIC_PATH = path.resolve(CWD, 'public');
export const UPLOADS_PATH = path.resolve(PUBLIC_PATH, 'uploads');
