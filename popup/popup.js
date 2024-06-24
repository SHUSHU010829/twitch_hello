window.onload = () => {
  const $templateInput = document.querySelector("#twitch-channel");
  const $switchInput = document.querySelector(".switch input");

  if ($templateInput && $switchInput) {
    // Handle textarea input and save to storage
    $templateInput.addEventListener("input", (e) => {
      const { value } = e.currentTarget;
      chrome.storage.sync.set({ reviewTemplate: value });
    });

    // Handle switch toggle and save to storage
    $switchInput.addEventListener("change", (e) => {
      const { checked } = e.currentTarget;
      chrome.storage.sync.set({ switchState: checked });
    });

    // Retrieve and set stored values
    async function fetchData() {
      const { reviewTemplate } = await chrome.storage.sync.get(
        "reviewTemplate"
      );
      const { switchState } = await chrome.storage.sync.get("switchState");

      $templateInput.value = reviewTemplate || "";
      $switchInput.checked = switchState || false;
    }

    // Fetch data on load
    fetchData();
  } else {
    console.error("Elements #twitch-channel or .switch input not found.");
  }
};
