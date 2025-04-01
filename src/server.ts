import 'zone.js/node';
import express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { ngExpressEngine } from '@angular/platform-server';

import { AppServerModule } from './src/main.server'; // Assure-toi que ce chemin est correct

const app = express();
const distFolder = join(process.cwd(), 'dist/my-app/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index.html';

app.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));
app.set('view engine', 'html');
app.set('views', distFolder);

// Servir les fichiers statiques
app.use(express.static(distFolder, { maxAge: '1y' }));

// Gérer toutes les routes Angular
app.get('*', (req, res) => {
  res.render(indexHtml, { req });
});

// Démarrer le serveur
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});