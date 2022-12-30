import { registerAs } from '@nestjs/config';

// config for coffees only. It is usefull when we have large application, to split our config by modules
export default registerAs('coffees', () => ({
  foo: 'bar',
}));
