import {
  Application,
  Context,
  Router,
} from 'https://deno.land/x/oak@v10.6.0/mod.ts';

const app = new Application();
const router = new Router();
let colores: String[] = [];

router.get('/', (ctx: Context) => {
  //Creamos un html para mostrar en el navegador con los colores, con estilos que tenemos en el array colores y un formulario para añadir más colores
  ctx.response.body = `
    <html>
        <head>
            <title>Colores</title>
        </head>
        <body>
            <h1>Colores</h1>
            <form action="/" method="post">
                <label for="color">Color:</label><br>
                <input type="text" id="color" name="color"><br>
                <input type="submit" value="Enviar">
            </form>
            <h2>Colores:</h2>
            <ul>
                ${colores
                  .map((color) => `<li style="color:${color}">${color}</li>`)
                  .join('')}
            </ul>
        </body>
    </html>
    `;
});

router.post('/', async (ctx: Context) => {
  //Obtenemos el color del formulario
  const body = await ctx.request.body();
  const params = await body.value;
  const color = params.get('color');
  //Añadimos el color al array
  colores.push(color);
  //Redirigimos a la página principal
  ctx.response.redirect('/');
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
console.log('Listening on http://localhost:8080/');
