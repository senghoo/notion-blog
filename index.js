import { handleEvent } from "flareact";

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = true;

addEventListener("fetch", (event) => {
  try {
    DEBUG && console.log('running')
    const url = new URL(event.request.url)
    if (url.pathname !== '/' && url.pathname.endsWith('/')){
      url.pathname = url.pathname.slice(0, url.pathname.length-1)
      return event.respondWith(Response.redirect(url.toString(), 301))
    }
    event.respondWith(
      handleEvent(event, require.context("./pages/", true, /\.(js|jsx|ts|tsx)$/), DEBUG)
    );
  } catch (e) {
    DEBUG && (console.log('exception'),
    console.log(DEBUG),
    console.log(e.message))
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      );
    }
    event.respondWith(new Response("Internal Error", { status: 500 }));
  }
});
