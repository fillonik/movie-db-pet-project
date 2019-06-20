import { IPage, IStore } from '../typings';

export const pageTemplate = (page: IPage, store?: IStore) => `<!DOCTYPE html>
  <html>
    <head>
      <title>${page.title}</title>
      ${store ? `<script type="text/javascript">window.__store__ = ${JSON.stringify(store)}</script>` : ''}
    </head>
    <body>
      <div id="app">${page.body}</div>
      ${page.scripts}
    </body>
  </html>`;
