<template>
  <div>
    <Head>
      <title>Jared Cervantes</title>
      <meta name="description" content="Personal website of Jared Cervantes">
      <link rel="icon" type="image/svg+xml" href="/favicon.svg">
      <link rel="icon" type="image/png" href="/favicon.png">
      <link rel="apple-touch-icon" href="/apple-touch-icon.png">
      <meta name="theme-color" content="#333">
    </Head>
    
    <NuxtPage />
  </div>
</template>

<style>
:root {
  --text: #333;
  --background: #f5f5f5;
}

.dark {
  --text: #f5f5f5;
  --background: #000000;
}

body {
  background-color: var(--background);
  color: var(--text);
  transition: background-color 0.3s ease, color 0.3s ease;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

* {
  box-sizing: border-box;
}
</style>