## Inicializacion

### Configurar las Variables de Entorno

En el archivo `.env`, configura las variables de entorno para la conexión a la base de datos. Deberás proporcionar el nombre de la base de datos, el usuario y la contraseña que correspondan a tu configuración de MySQL:

Para iniciar la base de datos, se hizo uso de MySQL en este caso en las variables de entorno poner los accesos y crear la Base de datos.

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_database
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
```

> [!IMPORTANT]
> En caso de utilizar otra base de datos debes cambiar las variables de entorno para la adaptabilidad

### Crear la Base de Datos en MySQL

Crear la base de datos a utilizar en el proyecto.

```sql
CREATE DATABASE nombre_database;
```

### Ejecutar la migracion

Con la base de datos creada y la configuración lista, el siguiente paso es ejecutar las migraciones para estructurar la base de datos con las tablas necesarias. Esto se hace con el comando de Artisan:

```bash
php artisan migrate
```

### Ejecutar Seeders

Una vez que las tablas están en su lugar, puedes utilizar los seeders para llenarlas con datos de prueba. Esto es útil para el desarrollo y pruebas. Ejecuta los seeders con el siguiente comando de Artisan:

```bash
php artisan db:seed
```
