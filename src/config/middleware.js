import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';
import fixCORS from './custom.middleware';
// import { isPrimitive } from 'util';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

export default app => {
  if (isProd) {
    app.use(compression());
    app.use(helmet());
  }
  // body parser to take user input from the front end as json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(fixCORS);

  // For login 
  app.use(passport.initialize());

  if (isDev) {
    app.use(morgan('dev'));
  }
}