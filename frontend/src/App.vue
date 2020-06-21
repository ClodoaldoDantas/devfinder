<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  box-sizing: inherit;
}

:root {
  --color-grey: #555;
  --color-grey-medium: #666;
  --color-grey-light: #fafafa;
  --color-border: #eee;
  --color-input: #f0f0f5;
  --color-blue: #3498db;
  --color-green: #2ecc71;
  --color-red: #721c24;
  --bg-red: #f8d7da;
  --border-red: #f5c6cb;
}

ul {
  list-style: none;
}

body {
  font-size: 1.6rem;
  font-family: "Open Sans", sans-serif;
  color: var(--color-grey);
}

#app {
  min-height: 100vh;
  width: 100%;
  background: var(--color-grey-light);
}

h1,
h2,
h3,
strong {
  font-family: "Ubuntu", sans-serif;
  font-weight: bold;
}

.container {
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.btn {
  font-family: "Open Sans", sans-serif;
  font-size: 1.6rem;
  border: none;
  border-radius: 1.5rem;
  text-transform: uppercase;
  background: var(--color-blue);
  color: #fff;
  padding: 1rem 5rem;
  cursor: pointer;
  outline: 0;
  transition: opacity 200ms ease;
}

.btn-small {
  padding: 0.8rem 1rem;
  font-size: 1.2rem;
}

.btn:hover {
  opacity: 0.8;
}

.btn-green {
  background-color: var(--color-green);
}

.two-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
}

.w-100 {
  width: 100%;
}
</style>
