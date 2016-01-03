import { env } from 'process';
import server from '../src/server';

const port = env.PORT || 8080;

server.listen(port);
