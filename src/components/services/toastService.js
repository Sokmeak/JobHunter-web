// Toast notification service

/**
 * Show a success toast notification
 * @param {string} message - The message to display
 * @param {Object} options - Additional options
 */
export const showSuccessToast = (message, options = {}) => {
  // Create a toast element
  const toast = document.createElement("div");
  toast.className = "custom-toast success-toast";
  toast.innerHTML = `
    <div class="toast-icon"><i class="bi bi-check-circle-fill"></i></div>
    <div class="toast-content">${message}</div>
    <button class="toast-close"><i class="bi bi-x"></i></button>
  `;

  // Add to DOM
  const container = document.getElementById("toast-container") || document.body;
  container.appendChild(toast);

  // Add show class after a small delay for animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Add close handler
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  });

  // Auto close after 5 seconds or specified duration
  setTimeout(() => {
    if (container.contains(toast)) {
      toast.classList.remove("show");
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
      }, 300);
    }
  }, options.duration || 5000);
};

/**
 * Show an error toast notification
 * @param {string} message - The message to display
 * @param {Object} options - Additional options
 */
export const showErrorToast = (message, options = {}) => {
  // Create a toast element
  const toast = document.createElement("div");
  toast.className = "custom-toast error-toast";
  toast.innerHTML = `
    <div class="toast-icon"><i class="bi bi-exclamation-circle-fill"></i></div>
    <div class="toast-content">${message}</div>
    <button class="toast-close"><i class="bi bi-x"></i></button>
  `;

  // Add to DOM
  const container = document.getElementById("toast-container") || document.body;
  container.appendChild(toast);

  // Add show class after a small delay for animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Add close handler
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  });

  // Auto close after 5 seconds or specified duration
  setTimeout(() => {
    if (container.contains(toast)) {
      toast.classList.remove("show");
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
      }, 300);
    }
  }, options.duration || 5000);
};

/**
 * Show an info toast notification
 * @param {string} message - The message to display
 * @param {Object} options - Additional options
 */
export const showInfoToast = (message, options = {}) => {
  // Create a toast element
  const toast = document.createElement("div");
  toast.className = "custom-toast info-toast";
  toast.innerHTML = `
    <div class="toast-icon"><i class="bi bi-info-circle-fill"></i></div>
    <div class="toast-content">${message}</div>
    <button class="toast-close"><i class="bi bi-x"></i></button>
  `;

  // Add to DOM
  const container = document.getElementById("toast-container") || document.body;
  container.appendChild(toast);

  // Add show class after a small delay for animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Add close handler
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  });

  // Auto close after 5 seconds or specified duration
  setTimeout(() => {
    if (container.contains(toast)) {
      toast.classList.remove("show");
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
      }, 300);
    }
  }, options.duration || 5000);
};
