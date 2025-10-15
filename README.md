# Backend

- https://strapi.io/

```bash
mysql -u root -p
CREATE DATABASE dg_empl_mediapartnership_quizz_dev_v01 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dg_empl_medptship_quizz_dev'@'%' IDENTIFIED BY '***********';
GRANT ALL PRIVILEGES ON dg_empl_mediapartnership_quizz_dev_v01.* TO 'dg_empl_medptship_quizz_dev'@'%';
FLUSH PRIVILEGES;
EXIT;
```

> ⚠️ User name is limited to 32 char, this why it does not look like the db name.

# Frontend

- https://nuxt.com/
- https://ui.nuxt.com/docs/getting-started
- https://pinia.vuejs.org/
- https://tailwindcss.com/docs/installation/using-vite
