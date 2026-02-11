# api-litacka

Jednoduché API používající [Lítačka API](https://litackaapi.docs.apiary.io/#)

## Požadavky

- **Node.js** (verze 18.x nebo vyšší)
- **npm**

## Instalace

1. **Naklonujte repozitář**

   ```bash
   git clone https://github.com/lstejskal/api-litacka.git
   cd api-litacka
   ```

2. **Nainstalujte npm balíčky**
   
   ```bash
   npm install
   ```

## Nastavení

Aplikace používá konfigurační soubory specifické pro jednotlivá prostředí. Před spuštěním je potřeba nastavit proměnné prostředí.

1. **Zkopírujte vzorový soubor prostředí**

   Pro vývoj:
   ```bash
   cp .env.example .env.dev
   ```

   Pro testování:
   ```bash
   cp .env.example .env.test
   ```

   PS: testovací prostředí používá převážně mocky

2. **Nakonfigurujte proměnné prostředí**

   Upravte soubor `.env.dev` (nebo `.env.test`) pro vaše potřeby:

   ```env
   PORT=3000
   API_KEY=your_api_key_here
   LITACKA_API_URL=http://private-264465-litackaapi.apiary-mock.com
   ```

   **Proměnné prostředí (ENV variables):**

   - `PORT` - Port serveru (default: 3000)
   - `API_KEY` - API klíč pro autentizaci (odešlete jej v hlavičce `X-API-Key`)
   - `LITACKA_API_URL` - Základní URL pro Lítačka API

## Spuštění aplikace

### Vývojový režim

Pro spuštění aplikace ve vývojovém režimu s automatickým restartováním:

```bash
npm run dev
```

Tím se:
- Použije konfigurační soubor `.env.dev`
- Spustí server s Node.js watch režimem (automaticky se restartuje při změně souborů)
- Spustí na portu uvedeném v `.env.dev` souboru (default: 3000)

### Standardní režim

Pro spuštění aplikace ve standardním režimu bez automatického restartování:

```bash
npm start
```

Tím se standardně použije konfigurační soubor `.env.dev`. Pro konkrétní prostředí:

```bash
NODE_ENV=prod npm start
```

### Testování

Pro spuštění unit a integračních testů:

```bash
npm run test
```

Pro spuštění testů včetně měření code coverage:

```bash
npm run test:coverage
```

Pro spuštění kontroly syntaxe:

```bash
npm run test:coverage
```

### Test API

API můžete otestovat otevřením prohlížeče nebo pomocí curl:
```bash
curl http://localhost:3000/up
```

## Dokumentace

Kompletní dokumentace v OpenAPI: [api.html](api.html)

Převod do HTML:
```bash
npm install -g @redocly/cli
redocly build-docs api.yaml --output api.html
```

## Podílení se na vývoji

Hlášení chyb a pull requesty jsou vítány: https://github.com/lstejskal/api-litacka/issues



[CR]
- chybí příkaz pro build
- endpointy fungují dle zadání
- trochu nesrozumitelná struktura souborů
  - routery nebo controllery? 
  - patří auth do utils?
- testy v js?
  - jsou to unit nebo integrační testy?
- logování?
- docker?
