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
    <header>
      <ThemeToggle />
    </header>
    <main>
      <div class="content">
        <div class="logo-container">
          <JCLogo />
        </div>
        <a
          href="https://home.jaredcervantes.com"
          class="home-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Personal Applications"
        >
          <div class="icon-container">
            <svg
              class="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="24"
              height="24"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </div>
        </a>
        <SocialNavigation />
      </div>
    </main>
  </div>
</template>

<style>
:root {
  --text: #333;
  --background: #f5f5f5;
}

.dark {
  --text: #f5f5f5;
  --background: #1a1a1a;
}

body {
  background-color: var(--background);
  color: var(--text);
  transition: background-color 0.3s ease, color 0.3s ease;
}

header {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0;
  padding-bottom: 4rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: -4rem;
}

.logo-container {
  width: 400px;
  height: 400px;
  color: var(--text);
}

.home-link {
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
  margin-top: -1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-link:hover {
  color: var(--text);
  opacity: 0.8;
  transform: scale(1.1);
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  fill: currentColor;
  width: 32px;
  height: 32px;
}
</style>
