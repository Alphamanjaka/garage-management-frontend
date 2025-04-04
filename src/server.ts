import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';
const angularAppEngine = new AngularAppEngine();

/**
 * Fonction qui définit les paramètres de pré-rendu
 */
export const getPrerenderParams = async () => {
  return [
    { role: 'admin' },
    { role: 'client' },
    { role: 'employe' },
  ];
};


/**
 * Gestionnaire des requêtes Netlify
 */
export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  // Exemple d'API personnalisée (optionnel)
  const pathname = new URL(request.url).pathname;
  if (pathname === '/api/hello') {
    return Response.json({ message: 'Hello depuis Netlify !' });
  }

  // Gestion des requêtes Angular SSR
  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * Gestionnaire de requêtes pour Netlify et Angular CLI
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
