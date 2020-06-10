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
  --color-blue: #3498db;
  --color-green: #2ecc71;
}

body {
  font-size: 1.6rem;
  font-family: "Open Sans", sans-serif;
  color: var(--color-grey);
}

h1,
h2,
h3 {
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

.btn:hover {
  opacity: 0.8;
}

.btn-green {
  background-color: var(--color-green);
}

.w-100 {
  width: 100%;
}
</style>
