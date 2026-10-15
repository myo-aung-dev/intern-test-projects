document.getElementById('loadBtn').addEventListener('click', async () => {
  try {
    console.log("Loading module dynamically...");
    const module = await import('./heavy-module.js');
    module.heavyCalculation();
  } catch (error) {
    console.error("Failed to load the module:", error);
  }
});