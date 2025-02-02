# README

## Projekt React - Konfiguracja

Ten projekt jest aplikacją frontendową opartą na React. Poniżej znajdują się instrukcje dotyczące konfiguracji i uruchomienia aplikacji.

### 1. Klonowanie repozytorium

Najpierw sklonuj repozytorium na swój lokalny komputer:

```sh
git clone https://github.com/Tdyda/cine_cast_web.git
cd cine_cast_web
```

### 2. Instalacja zależności

Przed uruchomieniem projektu należy zainstalować wszystkie wymagane zależności. W katalogu głównym projektu uruchom:

```sh
npm install
```

### 3. Konfiguracja adresu serwera API

Aby aplikacja poprawnie komunikowała się z serwerem, należy zmienić domyślny adres `yourdomain` na adres Twojego serwera w dwóch plikach:

#### a) `src/components/Login/Login.js`

Znajdź poniższy fragment kodu i zastąp `yourdomain` adresem Twojego serwera:

```js
try {
  const response = await fetch('yourdomain/api/Account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('userId', data.userId);

  window.location.href = '/';
} catch (err) {
  setError('Błędny e-mail lub hasło');
}
```

#### b) `src/components/axiosConfig.js`

Znajdź poniższy fragment kodu i zastąp `yourdomian` adresem Twojego serwera:

```js
const api = axios.create({
  baseURL: 'yourdomian/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 4. Uruchomienie aplikacji

Aby uruchomić aplikację w trybie deweloperskim, użyj poniższej komendy:

```sh
npm start
```

Aplikacja powinna być dostępna pod adresem:

```
http://localhost:3000
```

### 5. Budowanie aplikacji

Aby zbudować aplikację do wdrożenia, użyj:

```sh
npm run build
```

### 6. Wdrożenie na serwer produkcyjny

Aby wdrożyć aplikację na serwer produkcyjny:

1. Zbuduj aplikację za pomocą:

   ```sh
   npm run build
   ```

2. Skopiuj zawartość folderu `build/` na swój serwer.

3. Jeśli używasz serwera Apache lub Nginx, skonfiguruj go do obsługi plików statycznych. W przypadku Nginx dodaj konfigurację:

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /ścieżka/do/build;
       index index.html;
       location / {
           try_files $uri /index.html;
       }
   }
   ```

4. Zrestartuj serwer, aby zastosować zmiany.

### 7. Dodatkowe informacje

- Upewnij się, że serwer API jest uruchomiony i dostępny pod poprawnym adresem.
- Sprawdź konsolę przeglądarki w przypadku błędów związanych z połączeniem z API.

---

**Autor:** [Tomasz Dyda]  
**Repozytorium:** [https://github.com/Tdyda/cine_cast_web.git]

