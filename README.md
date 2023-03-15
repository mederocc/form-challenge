# **Form Challenge**

Realizar una app en React.js que lea un archivo JSON y genere con cada ítem una interfaz de app de encuesta (como Google Forms).

En cuanto a diseño y estética tiene que diferir de Google Forms.

Las respuestas de la encuesta deben ser enviadas a una base de datos de Firebase.

Por último, traer las respuestas de la base de datos ya mencionada y mostrarlas en la misma app pero en otra ruta. Al presionar "enviar" en el formulario tiene que aparecer un mensaje y el acceso a esa ruta en donde estarán las respuestas.

Deployado en Vercel: [https://form-challenge-ten.vercel.app/](https://form-challenge-ten.vercel.app/)

**Tecnologías utilizadas**

- React
- Firebase
- Formik
- Yup
- Tailwind CSS

**Instalación**

1. Clonar el repositorio: **git clone https://github.com/mederocc/form-challenge.git**
2. Instalar dependencias: **npm install**

**Uso**

1. Configurar credenciales de Firebase en **src/config/firebase.js**
2. Ejecutar la aplicación: **npm start**
3. Acceder a la URL: **http://localhost:3000**

**Funcionalidades**

- Crea un formulario dinámicamente a partir de una lista de valores de un archivo JSON
- Crea una colección en Firebase según las respuestas a guardar que reciba del formulario
- Recupera los valores de un registro en Firebase a través del ID que retorna al ser generado
