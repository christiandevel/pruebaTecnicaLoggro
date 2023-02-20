# Instrucciones para ejecutar la API

Antes de iniciar la API, es necesario crear un archivo `enviorement.env` con las variables de entorno necesarias. A continuación se muestra un ejemplo de cómo debería verse el archivo:

```bash
DB_MONGO=URL_DE_CONEXIÓN_A_MONGODB
AWS_ACCESS_KEY_ID=TU_ACCESS_KEY_ID_DE_AWS
AWS_SECRET_ACCESS_KEY=TU_SECRET_ACCESS_KEY_DE_AWS
AWS_REGION=REGIÓN_DE_TU_BUCKET_DE_AWS
AWS_BUCKET_NAME=NOMBRE_DE_TU_BUCKET_DE_AWS
```
Reemplaza los valores de ejemplo con los correspondientes a tu configuración.

Una vez creado el archivo `enviorement.env`, puedes ejecutar la API siguiendo estos pasos:

1. Clona el repositorio.
2. Abre una terminal en el directorio raíz del repositorio en la carpeta **servidor**.
3. Instala las dependencias con el comando npm install.
4. Inicia la API con el comando `npm run dev`.
5. La API estará disponible en el puerto 4000 por defecto. Si deseas cambiar el puerto, puedes modificar la variable PORT en el archivo .env.

## Endpoints
La API tiene los siguientes endpoints:

* `POST /images`: Carga una imagen a AWS S3 y guarda la información de la imagen en MongoDB.
* `POST /images`/png: Convierte una imagen a formato PNG, la carga a AWS S3 y guarda la información de la imagen en MongoDB.
* `POST /images/convert-and-download`: Convierte una imagen a formato PNG y devuelve un archivo descargable.
* `GET /images`: Obtiene todas las imágenes registradas en MongoDB.
* `GET /images/:id`: Obtiene la información de una imagen por su ID.
* `GET /images/count_by_hour`: Obtiene la cantidad de imágenes procesadas agrupadas por hora.
* `GET /images/search?start_date={fecha_inicio}&end_date={fecha_fin}`: Busca imágenes por rango de fechas.

**Para las rutas POST /images, POST /images/png y POST /images/convert-and-download, es necesario enviar un archivo de imagen en la petición.**

# Cliente

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### Tecnologías utilizadas
* Node.js
* Express
* Angular
* MongoDB
* AWS S3

#### Créditos
Este proyecto fue desarrollado por Christian Moreno como parte de trabajo.

