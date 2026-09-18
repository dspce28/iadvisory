/**
 * The Apache config belongs only to the Hostinger target. Keeping it out of
 * public/ stops Vercel serving it as a downloadable file at /.htaccess, where
 * it would be both useless and untidy.
 */
import { copyFileSync, existsSync, rmSync } from 'node:fs';

const target = 'public/.htaccess';
if (process.env.STATIC_EXPORT === 'true') {
  copyFileSync('config/htaccess', target);
  console.log('prebuild: .htaccess staged for the static target');
} else if (existsSync(target)) {
  rmSync(target);
  console.log('prebuild: .htaccess removed — not needed on a Node host');
}
