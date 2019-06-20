import { IPage, IStore } from '../typings';

export const pageTemplate = (page: IPage, store?: IStore) => `<!DOCTYPE html>
  <html>
    <head>
      <title>${page.title}</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.6.9/shim.min.js"></script>
      ${store ? `<script type="text/javascript">window.__store__ = ${JSON.stringify(store)}</script>` : ''}
    </head>
    <body>
      <div id="app">${page.body}</div>
      ${page.scripts}
    </body>
  </html>`;
