import { homeView } from "../views/home.js";
import { resultView } from "../views/result.js";
import { page,render } from "./lib.js";
console.log('it works')
const root = document.getElementById('root');

page(decorateContext);
page('/CO2-calculator/' , '/');
page('/' , homeView);
page('/result' , resultView);
page.start();

export function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    next();
}
