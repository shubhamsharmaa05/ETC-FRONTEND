// DOM Elements
const menuButton = document.getElementById("menuButton")
const closeMenu = document.getElementById("closeMenu")
const mobileMenu = document.getElementById("mobileMenu")
const themeToggle = document.getElementById("themeToggle")
const currentYearElements = document.querySelectorAll("#currentYear")

// Global variables
let productToDelete = null
let activityLog = JSON.parse(localStorage.getItem("activityLog")) || []

// Theme Toggle
function initTheme() {
  const themeToggle = document.getElementById("themeToggle")
  if (!themeToggle) return

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add("dark")
  }

  themeToggle.addEventListener("click", toggleTheme)
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark")
  localStorage.setItem("theme", isDark ? "dark" : "light")
}

// Mobile Menu
function initMobileMenu() {
  const menuButton = document.getElementById("menuButton")
  const closeMenu = document.getElementById("closeMenu")
  const mobileMenu = document.getElementById("mobileMenu")

  if (!menuButton || !closeMenu || !mobileMenu) return

  menuButton.addEventListener("click", openMobileMenu)
  closeMenu.addEventListener("click", closeMobileMenu)

  // Close menu when clicking outside
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenu()
    }
  })
}

function openMobileMenu() {
  mobileMenu.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeMobileMenu() {
  mobileMenu.classList.remove("active")
  document.body.style.overflow = ""
}

// Set current year in footer
function setCurrentYear() {
  const currentYearElements = document.querySelectorAll("#currentYear")
  const year = new Date().getFullYear()

  currentYearElements.forEach((el) => {
    el.textContent = year
  })
}

// Activity Log
function addToActivityLog(action, details) {
  const logEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    action,
    details,
    user: localStorage.getItem("adminUsername") || "System",
  }

  activityLog.unshift(logEntry) // Add to beginning of array

  // Keep only the last 100 entries
  if (activityLog.length > 100) {
    activityLog = activityLog.slice(0, 100)
  }

  localStorage.setItem("activityLog", JSON.stringify(activityLog))

  // Update activity log display if it exists
  displayActivityLog()

  // Update recent activity on dashboard
  updateRecentActivity()
}

// Display activity log
function displayActivityLog() {
  const activityLogContainer = document.getElementById("activity-log-container")
  if (!activityLogContainer) return

  let logHTML = ""

  if (activityLog.length === 0) {
    logHTML = "<p>No activity recorded yet.</p>"
  } else {
    logHTML = '<ul class="activity-log-list">'

    activityLog.forEach((entry) => {
      const date = new Date(entry.timestamp).toLocaleString()
      logHTML += `
        <li class="activity-log-item">
          <div class="activity-log-header">
            <span class="activity-log-action">${entry.action}</span>
            <span class="activity-log-time">${date}</span>
          </div>
          <div class="activity-log-details">${entry.details}</div>
          <div class="activity-log-user">By: ${entry.user}</div>
        </li>
      `
    })

    logHTML += "</ul>"
  }

  activityLogContainer.innerHTML = logHTML
}

// Update recent activity on dashboard
function updateRecentActivity() {
  const recentActivityContainer = document.getElementById("recent-activity-container")
  if (!recentActivityContainer) return

  let logHTML = ""

  if (activityLog.length === 0) {
    logHTML = "<p>No activity recorded yet.</p>"
  } else {
    logHTML = '<ul class="activity-log-list">'

    // Show only the 5 most recent activities
    const recentActivities = activityLog.slice(0, 5)

    recentActivities.forEach((entry) => {
      const date = new Date(entry.timestamp).toLocaleString()
      logHTML += `
        <li class="activity-log-item">
          <div class="activity-log-header">
            <span class="activity-log-action">${entry.action}</span>
            <span class="activity-log-time">${date}</span>
          </div>
          <div class="activity-log-details">${entry.details}</div>
        </li>
      `
    })

    logHTML += "</ul>"
  }

  recentActivityContainer.innerHTML = logHTML
}

// Initialize default products if none exist
function initializeProducts() {
  if (!localStorage.getItem("products")) {
    const defaultProducts = [
      {
        id: "1",
        name: "Classic Oversized Tee - Black",
        price: 29.99,
        rating: 4.9,
        category: "Tees",
        colors: ["Black"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        image: "https://placehold.co/400x400",
        description:
          "Our classic oversized t-shirt in premium cotton. Features a relaxed fit with drop shoulders for the perfect oversized look. Made from 100% organic cotton for superior comfort and durability.",
        featured: true,
      },
      {
        id: "2",
        name: "Relaxed Fit Tee - White",
        price: 29.99,
        rating: 4.8,
        category: "Tees",
        colors: ["White"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        image: "https://placehold.co/400x400",
        description:
          "Our relaxed fit t-shirt in crisp white. Made from premium cotton with a comfortable, loose fit that's perfect for everyday wear.",
        featured: true,
      },
      {
        id: "3",
        name: "Vintage Wash Tee - Grey",
        price: 34.99,
        rating: 4.7,
        category: "Tees",
        colors: ["Grey"],
        sizes: ["S", "M", "L", "XL"],
        image: "https://placehold.co/400x400",
        description:
          "This vintage wash tee has a perfectly lived-in look and feel. Made from soft cotton with a special washing process for that vintage appeal.",
        featured: true,
      },
      {
        id: "4",
        name: "Premium Boxy Tee - Navy",
        price: 34.99,
        rating: 4.8,
        category: "Tees",
        colors: ["Navy"],
        sizes: ["M", "L", "XL", "XXL"],
        image: "https://placehold.co/400x400",
        description:
          "Our premium boxy tee features a modern, structured silhouette with a slightly cropped length. Perfect for a contemporary, fashion-forward look.",
        featured: true,
      },
      {
        id: "5",
        name: "Essential Hoodie - Black",
        price: 49.99,
        rating: 4.9,
        category: "Hoodies",
        colors: ["Black"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        image: "https://placehold.co/400x400",
        description:
          "Our essential hoodie in premium heavyweight cotton. Features a relaxed fit with a cozy hood and kangaroo pocket. Perfect for layering or wearing on its own.",
        featured: false,
      },
      {
        id: "6",
        name: "Cargo Pants - Olive",
        price: 59.99,
        rating: 4.7,
        category: "Pants",
        colors: ["Olive"],
        sizes: ["S", "M", "L", "XL"],
        image: "https://placehold.co/400x400",
        description:
          "Stylish cargo pants with multiple pockets. Made from durable cotton twill with a relaxed fit and adjustable waistband for all-day comfort.",
        featured: false,
      },
    ]
    localStorage.setItem("products", JSON.stringify(defaultProducts))
    addToActivityLog("System Initialization", "Default products added to the store")
  }
}

// Initialize default coupons if none exist
function initializeCoupons() {
  if (!localStorage.getItem("coupons")) {
    const defaultCoupons = [
      {
        code: "WELCOME10",
        discount: 10,
        active: true,
        created: new Date().toISOString(),
      },
      {
        code: "SUMMER20",
        discount: 20,
        active: true,
        created: new Date().toISOString(),
      },
      {
        code: "SALE15",
        discount: 15,
        active: true,
        created: new Date().toISOString(),
      },
    ]
    localStorage.setItem("coupons", JSON.stringify(defaultCoupons))
    addToActivityLog("System Initialization", "Default coupons added to the store")
  }
}

// Featured Products
function loadFeaturedProducts() {
  const featuredProductsContainer = document.getElementById("featuredProducts")
  if (!featuredProductsContainer) return

  // Get products from localStorage
  const allProducts = JSON.parse(localStorage.getItem("products")) || []

  // Get featured products (either marked as featured or first 4)
  const featuredProducts = allProducts.filter((product) => product.featured === true)
  const products = featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 4)

  let productsHTML = ""

  products.forEach((product) => {
    productsHTML += `
      <a href="product-details.html?id=${product.id}" class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-overlay"></div>
        </div>
        <div class="product-content">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-info">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <div class="product-rating">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>${product.rating}</span>
            </div>
          </div>
        </div>
        <div class="product-footer">
          <button class="button outline add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      </a>
    `
  })

  featuredProductsContainer.innerHTML = productsHTML

  // Add event listeners to Add to Cart buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()

      const productId = this.dataset.id
      const product = products.find((p) => p.id === productId)

      // Add to cart
      addToCart(product)
    })
  })
}

// Add to cart function
function addToCart(product, size = product.sizes[0], color = product.colors[0], quantity = 1) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Check if product already exists in cart with same size and color
  const existingItemIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === size && item.color === color,
  )

  if (existingItemIndex !== -1) {
    // Update quantity
    cart[existingItemIndex].quantity += quantity
  } else {
    // Add new item to cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size: size,
      color: color,
      quantity: quantity,
      image: product.image,
    })
  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count
  updateCartCount()

  // Show success message
  showNotification(`${product.name} has been added to your cart!`)
}

// Update cart count
function updateCartCount() {
  const cartCountElement = document.getElementById("cartCount")
  if (!cartCountElement) return

  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  cartCountElement.textContent = totalItems

  if (totalItems > 0) {
    cartCountElement.style.display = "flex"
  } else {
    cartCountElement.style.display = "none"
  }
}

// Show notification
function showNotification(message, type = "success") {
  // Create notification element if it doesn't exist
  let notification = document.getElementById("notification")

  if (!notification) {
    notification = document.createElement("div")
    notification.id = "notification"
    notification.className = "notification"
    document.body.appendChild(notification)

    // Add styles if not already in CSS
    const style = document.createElement("style")
    style.textContent = `
      .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateY(100px);
        transition: transform 0.3s ease;
        max-width: 300px;
      }
      .notification.success {
        background-color: var(--color-success, #10b981);
      }
      .notification.error {
        background-color: var(--color-error, #ef4444);
      }
      .notification.info {
        background-color: var(--color-info, #3b82f6);
      }
      .notification.show {
        transform: translateY(0);
      }
    `
    document.head.appendChild(style)
  }

  // Set notification content and type
  notification.textContent = message
  notification.className = `notification ${type}`

  // Show notification
  setTimeout(() => {
    notification.classList.add("show")
  }, 10)

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show")
  }, 3000)
}

// Products Page
function initProductsPage() {
  const productsGrid = document.getElementById("productsGrid")
  const filterButton = document.getElementById("filterButton")
  const closeFilter = document.getElementById("closeFilter")
  const filterSidebar = document.getElementById("filterSidebar")
  const resetFiltersButton = document.getElementById("resetFiltersButton")
  const resetFiltersButtonSidebar = document.getElementById("resetFiltersButtonSidebar")
  const applyFiltersButton = document.getElementById("applyFiltersButton")
  const sortSelect = document.getElementById("sortSelect")
  const activeFilters = document.getElementById("activeFilters")
  const emptyState = document.getElementById("emptyState")
  const productCount = document.getElementById("productCount")

  if (!productsGrid) return

  // Get products from localStorage
  const products = JSON.parse(localStorage.getItem("products")) || []

  // Filter state
  let filters = {
    category: "All",
    minPrice: 20,
    maxPrice: 100, // Increased max price to accommodate more products
    sizes: [],
    colors: [],
  }

  let sortOption = "featured"

  // Filter sidebar
  if (filterButton && filterSidebar) {
    filterButton.addEventListener("click", () => {
      filterSidebar.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  }

  if (closeFilter && filterSidebar) {
    closeFilter.addEventListener("click", () => {
      filterSidebar.classList.remove("active")
      document.body.style.overflow = ""
    })

    // Close sidebar when clicking outside
    filterSidebar.addEventListener("click", (e) => {
      if (e.target === filterSidebar) {
        filterSidebar.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Category filter
  const categoryRadios = document.querySelectorAll('input[name="category"]')
  categoryRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      filters.category = e.target.value
    })
  })

  // Price range filter
  const minPriceSlider = document.getElementById("minPrice")
  const maxPriceSlider = document.getElementById("maxPrice")
  const minPriceValue = document.getElementById("minPriceValue")
  const maxPriceValue = document.getElementById("maxPriceValue")
  const priceSliderTrack = document.getElementById("priceSliderTrack")

  if (minPriceSlider && maxPriceSlider) {
    // Update slider ranges to accommodate more products
    minPriceSlider.min = 20
    minPriceSlider.max = 100
    maxPriceSlider.min = 20
    maxPriceSlider.max = 100

    minPriceSlider.value = 20
    maxPriceSlider.value = 100

    if (minPriceValue) minPriceValue.textContent = "$20"
    if (maxPriceValue) maxPriceValue.textContent = "$100"

    // Update price track
    function updatePriceTrack() {
      if (!priceSliderTrack) return

      const min = Number.parseInt(minPriceSlider.value)
      const max = Number.parseInt(maxPriceSlider.value)
      const minPercent = ((min - 20) / 80) * 100
      const maxPercent = ((max - 20) / 80) * 100

      priceSliderTrack.style.background = `linear-gradient(to right, var(--color-border) 0%, var(--color-border) ${minPercent}%, var(--color-accent) ${minPercent}%, var(--color-accent) ${maxPercent}%, var(--color-border) ${maxPercent}%, var(--color-border) 100%)`
    }

    minPriceSlider.addEventListener("input", (e) => {
      const value = Number.parseInt(e.target.value)
      if (value > Number.parseInt(maxPriceSlider.value)) {
        e.target.value = maxPriceSlider.value
        return
      }
      filters.minPrice = value
      minPriceValue.textContent = `$${value}`
      updatePriceTrack()
    })

    maxPriceSlider.addEventListener("input", (e) => {
      const value = Number.parseInt(e.target.value)
      if (value < Number.parseInt(minPriceSlider.value)) {
        e.target.value = minPriceSlider.value
        return
      }
      filters.maxPrice = value
      maxPriceValue.textContent = `$${value}`
      updatePriceTrack()
    })

    updatePriceTrack()
  }

  // Size filter
  const sizeButtons = document.querySelectorAll(".size-button")
  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const size = button.dataset.size
      button.classList.toggle("active")

      if (button.classList.contains("active")) {
        filters.sizes.push(size)
      } else {
        filters.sizes = filters.sizes.filter((s) => s !== size)
      }
    })
  })

  // Color filter
  const colorButtons = document.querySelectorAll(".color-button")
  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const color = button.dataset.color
      button.classList.toggle("active")

      if (button.classList.contains("active")) {
        filters.colors.push(color)
      } else {
        filters.colors = filters.colors.filter((c) => c !== color)
      }
    })
  })

  // Sort products
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortOption = e.target.value
      renderProducts()
    })
  }

  // Reset filters
  function resetFilters() {
    filters = {
      category: "All",
      minPrice: 20,
      maxPrice: 100,
      sizes: [],
      colors: [],
    }

    // Reset UI
    categoryRadios.forEach((radio) => {
      radio.checked = radio.value === "All"
    })

    if (minPriceSlider && maxPriceSlider) {
      minPriceSlider.value = 20
      maxPriceSlider.value = 100
      minPriceValue.textContent = "$20"
      maxPriceValue.textContent = "$100"
      updatePriceTrack()
    }

    sizeButtons.forEach((button) => {
      button.classList.remove("active")
    })

    colorButtons.forEach((button) => {
      button.classList.remove("active")
    })

    renderProducts()
    renderActiveFilters()
  }

  if (resetFiltersButton) {
    resetFiltersButton.addEventListener("click", resetFilters)
  }

  if (resetFiltersButtonSidebar) {
    resetFiltersButtonSidebar.addEventListener("click", resetFilters)
  }

  // Apply filters
  if (applyFiltersButton) {
    applyFiltersButton.addEventListener("click", () => {
      filterSidebar.classList.remove("active")
      document.body.style.overflow = ""
      renderProducts()
      renderActiveFilters()
    })
  }

  // Render active filters
  function renderActiveFilters() {
    if (!activeFilters) return

    let filtersHTML = ""

    if (filters.category !== "All") {
      filtersHTML += `
        <div class="filter-tag">
          Category: ${filters.category}
          <button data-filter="category">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `
    }

    filters.sizes.forEach((size) => {
      filtersHTML += `
        <div class="filter-tag">
          Size: ${size}
          <button data-filter="size" data-value="${size}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `
    })

    filters.colors.forEach((color) => {
      filtersHTML += `
        <div class="filter-tag">
          Color: ${color}
          <button data-filter="color" data-value="${color}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `
    })

    if (filters.minPrice > 20 || filters.maxPrice < 100) {
      filtersHTML += `
        <div class="filter-tag">
          Price: $${filters.minPrice} - $${filters.maxPrice}
          <button data-filter="price">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `
    }

    if (filtersHTML) {
      filtersHTML += `
        <button class="clear-filters">Clear all</button>
      `
    }

    activeFilters.innerHTML = filtersHTML

    // Add event listeners to filter tags
    const filterTags = activeFilters.querySelectorAll(".filter-tag button")
    filterTags.forEach((tag) => {
      tag.addEventListener("click", (e) => {
        const filter = e.target.closest("button").dataset.filter
        const value = e.target.closest("button").dataset.value

        if (filter === "category") {
          filters.category = "All"
          categoryRadios.forEach((radio) => {
            radio.checked = radio.value === "All"
          })
        } else if (filter === "size") {
          filters.sizes = filters.sizes.filter((s) => s !== value)
          sizeButtons.forEach((button) => {
            if (button.dataset.size === value) {
              button.classList.remove("active")
            }
          })
        } else if (filter === "color") {
          filters.colors = filters.colors.filter((c) => c !== value)
          colorButtons.forEach((button) => {
            if (button.dataset.color === value) {
              button.classList.remove("active")
            }
          })
        } else if (filter === "price") {
          filters.minPrice = 20
          filters.maxPrice = 100
          if (minPriceSlider && maxPriceSlider) {
            minPriceSlider.value = 20
            maxPriceSlider.value = 100
            minPriceValue.textContent = "$20"
            maxPriceValue.textContent = "$100"
            updatePriceTrack()
          }
        }

        renderProducts()
        renderActiveFilters()
      })
    })

    // Clear all filters
    const clearFiltersButton = activeFilters.querySelector(".clear-filters")
    if (clearFiltersButton) {
      clearFiltersButton.addEventListener("click", resetFilters)
    }
  }

  // Filter and sort products
  function filterProducts() {
    return products.filter((product) => {
      // Filter by category
      if (filters.category !== "All" && product.category !== filters.category) {
        return false
      }

      // Filter by price
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false
      }

      // Filter by sizes
      if (filters.sizes.length > 0 && !filters.sizes.some((size) => product.sizes.includes(size))) {
        return false
      }

      // Filter by colors
      if (filters.colors.length > 0 && !filters.colors.some((color) => product.colors.includes(color))) {
        return false
      }

      return true
    })
  }

  function sortProducts(filteredProducts) {
    return [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price
        case "price-high-low":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0 // featured - maintain original order
      }
    })
  }

  // Render products
  function renderProducts() {
    if (!productsGrid) return

    const filteredProducts = filterProducts()
    const sortedProducts = sortProducts(filteredProducts)

    if (productCount) {
      productCount.textContent = sortedProducts.length
    }

    if (sortedProducts.length === 0) {
      productsGrid.style.display = "none"
      if (emptyState) {
        emptyState.style.display = "block"
      }
      return
    }

    productsGrid.style.display = "grid"
    if (emptyState) {
      emptyState.style.display = "none"
    }

    let productsHTML = ""

    sortedProducts.forEach((product) => {
      productsHTML += `
      <a href="product-details.html?id=${product.id}" class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-overlay"></div>
        </div>
        <div class="product-content">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-info">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <div class="product-rating">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>${product.rating}</span>
            </div>
          </div>
        </div>
        <div class="product-footer">
          <button class="button outline add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      </a>
    `
    })

    productsGrid.innerHTML = productsHTML

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()
        e.stopPropagation()

        const productId = this.dataset.id
        const product = products.find((p) => p.id === productId)

        // Add to cart
        addToCart(product)
      })
    })
  }

  // Initialize products page
  renderProducts()
  renderActiveFilters()

  // Update cart count on page load
  updateCartCount()
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item")
  if (faqItems.length === 0) return

  faqItems.forEach((item) => {
    const header = item.querySelector(".faq-question")

    if (header) {
      header.addEventListener("click", () => {
        // Toggle current item
        item.classList.toggle("active")

        // Close other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active")
          }
        })
      })
    }
  })
}

// Profile Page
function initProfilePage() {
  const profileNavLinks = document.querySelectorAll(".profile-nav-link")
  const profileTabs = document.querySelectorAll(".profile-tab")

  if (profileNavLinks.length === 0) return

  profileNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links and tabs
      profileNavLinks.forEach((l) => l.classList.remove("active"))
      profileTabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked link and corresponding tab
      this.classList.add("active")
      const tabId = this.getAttribute("href").substring(1)
      const tab = document.getElementById(tabId)
      if (tab) {
        tab.classList.add("active")
      }
    })
  })

  // Handle form submissions
  const profileForm = document.getElementById("profile-form")
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value

      // Save to localStorage
      const user = {
        firstName,
        lastName,
        email,
        phone,
        updatedAt: new Date().toISOString(),
      }

      localStorage.setItem("user", JSON.stringify(user))

      // Show success message
      showNotification("Profile updated successfully!", "success")
    })
  }

  const passwordForm = document.getElementById("password-form")
  if (passwordForm) {
    passwordForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form values
      const currentPassword = document.getElementById("current-password").value
      const newPassword = document.getElementById("new-password").value
      const confirmPassword = document.getElementById("confirm-password").value

      // Validate passwords
      if (newPassword !== confirmPassword) {
        showNotification("New passwords do not match.", "error")
        return
      }

      // In a real application, this would send the password change request to a server
      showNotification("Password changed successfully!", "success")

      // Reset form
      this.reset()
    })
  }

  // Load user data if available
  const user = JSON.parse(localStorage.getItem("user"))
  if (user) {
    // Update profile form
    if (document.getElementById("first-name")) {
      document.getElementById("first-name").value = user.firstName || ""
    }
    if (document.getElementById("last-name")) {
      document.getElementById("last-name").value = user.lastName || ""
    }
    if (document.getElementById("email")) {
      document.getElementById("email").value = user.email || ""
    }
    if (document.getElementById("phone")) {
      document.getElementById("phone").value = user.phone || ""
    }

    // Update profile card
    if (document.querySelector(".profile-name")) {
      document.querySelector(".profile-name").textContent = `${user.firstName || ""} ${user.lastName || ""}`
    }
    if (document.querySelector(".profile-email")) {
      document.querySelector(".profile-email").textContent = user.email || ""
    }
  }
}

// Contact form submission
function initContactForm() {
  const contactForm = document.getElementById("contact-form")
  if (!contactForm) return

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // In a real application, this would send the form data to a server
    showNotification(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`, "success")

    // Reset form
    this.reset()
  })
}

// Admin Dashboard - Product List
function loadProductList() {
  const productList = document.getElementById("product-list")
  if (!productList) return

  // Get products from localStorage
  const products = JSON.parse(localStorage.getItem("products")) || []

  // Update product count in dashboard
  const productCount = document.getElementById("product-count")
  if (productCount) {
    productCount.textContent = products.length
  }

  if (products.length === 0) {
    productList.innerHTML = "<p>No products found. Add your first product!</p>"
    return
  }

  let productsHTML = '<div class="admin-products-grid">'

  products.forEach((product) => {
    productsHTML += `
      <div class="admin-product-card">
        <div class="admin-product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="admin-product-details">
          <h3>${product.name}</h3>
          <div class="admin-product-info">
            <span class="admin-product-price">$${product.price.toFixed(2)}</span>
            <span class="admin-product-category">${product.category}</span>
          </div>
          <div class="admin-product-meta">
            <div class="admin-product-sizes">
              <span>Sizes:</span> ${product.sizes.join(", ")}
            </div>
            <div class="admin-product-colors">
              <span>Colors:</span>
              <div class="color-dots">
                ${product.colors
                  .map(
                    (color) =>
                      `<span class="color-dot" style="background-color: ${color.toLowerCase()}" title="${color}"></span>`,
                  )
                  .join("")}
              </div>
            </div>
            <div class="admin-product-featured">
              <label class="checkbox-label">
                <input type="checkbox" class="toggle-featured" data-id="${product.id}" ${product.featured ? "checked" : ""}>
                Featured
              </label>
            </div>
          </div>
        </div>
        <div class="admin-product-actions">
          <button class="button outline edit-product" data-id="${product.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </button>
          <button class="button destructive delete-product" data-id="${product.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete
          </button>
        </div>
      </div>
    `
  })

  productsHTML += "</div>"
  productList.innerHTML = productsHTML

  // Add event listeners to delete buttons
  document.querySelectorAll(".delete-product").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.dataset.id
      openDeleteConfirmationModal(productId)
    })
  })

  // Add event listeners to edit buttons
  document.querySelectorAll(".edit-product").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.dataset.id
      openEditProductModal(productId)
    })
  })

  // Add event listeners to featured toggles
  document.querySelectorAll(".toggle-featured").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const productId = this.dataset.id
      const isFeatured = this.checked

      // Update product in localStorage
      const products = JSON.parse(localStorage.getItem("products")) || []
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, featured: isFeatured }
        }
        return product
      })

      localStorage.setItem("products", JSON.stringify(updatedProducts))

      // Log activity
      const product = products.find((p) => p.id === productId)
      addToActivityLog(
        "Product Updated",
        `${isFeatured ? "Added" : "Removed"} "${product.name}" ${isFeatured ? "to" : "from"} featured products`,
      )

      showNotification(
        `Product "${product.name}" ${isFeatured ? "added to" : "removed from"} featured products.`,
        "success",
      )
    })
  })
}

// Function to open edit product modal
function openEditProductModal(productId) {
  const products = JSON.parse(localStorage.getItem("products")) || []
  const product = products.find((p) => p.id === productId)

  if (!product) return

  // Get modal elements
  const addProductModal = document.getElementById("add-product-modal")
  const modalTitle = addProductModal.querySelector(".admin-modal-header h2")
  const form = document.getElementById("add-product-form")
  const submitButton = form.querySelector('button[type="submit"]')

  // Update modal for editing
  modalTitle.textContent = "Edit Product"
  submitButton.textContent = "Update Product"

  // Fill form with product data
  document.getElementById("product-name").value = product.name
  document.getElementById("product-price").value = product.price
  document.getElementById("product-category").value = product.category
  document.getElementById("product-description").value = product.description
  document.getElementById("product-image").value = product.image

  // Set image preview
  const imagePreview = document.getElementById("image-preview")
  imagePreview.innerHTML = `<img src="${product.image}" alt="Preview" style="max-width: 100%; max-height: 200px;">`

  // Check size checkboxes
  const sizeCheckboxes = document.querySelectorAll('input[name="product-sizes"]')
  sizeCheckboxes.forEach((checkbox) => {
    checkbox.checked = product.sizes.includes(checkbox.value)
  })

  // Check color checkboxes
  const colorCheckboxes = document.querySelectorAll('input[name="product-colors"]')
  colorCheckboxes.forEach((checkbox) => {
    checkbox.checked = product.colors.includes(checkbox.value)
  })

  // Add featured checkbox if it doesn't exist
  const featuredCheckbox = document.getElementById("product-featured")
  if (!featuredCheckbox) {
    const featuredGroup = document.createElement("div")
    featuredGroup.className = "admin-form-group"
    featuredGroup.innerHTML = `
      <label for="product-featured">Featured</label>
      <div class="checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" id="product-featured" ${product.featured ? "checked" : ""}> Show on homepage
        </label>
      </div>
    `

    // Insert before the form actions
    const formActions = form.querySelector(".form-actions")
    form.insertBefore(featuredGroup, formActions)
  } else {
    featuredCheckbox.checked = product.featured
  }

  // Store product ID in form for submission
  form.dataset.editId = productId

  // Show modal
  addProductModal.style.display = "block"
}

// Admin Dashboard - Coupon List
function loadCouponList() {
  const couponList = document.getElementById("coupon-list")
  if (!couponList) return

  // Get coupons from localStorage
  const coupons = JSON.parse(localStorage.getItem("coupons")) || []

  // Update coupon count in dashboard
  const couponCount = document.getElementById("coupon-count")
  if (couponCount) {
    couponCount.textContent = coupons.length
  }

  if (coupons.length === 0) {
    couponList.innerHTML = "<p>No coupons found. Add your first coupon!</p>"
    return
  }

  let couponsHTML = '<div class="admin-coupons-grid">'

  coupons.forEach((coupon) => {
    const createdDate = new Date(coupon.created).toLocaleDateString()

    couponsHTML += `
      <div class="admin-coupon-card ${!coupon.active ? "inactive" : ""}">
        <div class="admin-coupon-code">${coupon.code}</div>
        <div class="admin-coupon-details">
          <div class="admin-coupon-discount">${coupon.discount}% off</div>
          <div class="admin-coupon-status ${coupon.active ? "active" : "inactive"}">
            ${coupon.active ? "Active" : "Inactive"}
          </div>
          <div class="admin-coupon-date">Created: ${createdDate}</div>
        </div>
        <div class="admin-coupon-actions">
          <button class="button ${coupon.active ? "warning" : "success"} toggle-coupon" data-code="${coupon.code}" data-active="${coupon.active}">
            ${coupon.active ? "Deactivate" : "Activate"}
          </button>
          <button class="button destructive delete-coupon" data-code="${coupon.code}">Delete</button>
        </div>
      </div>
    `
  })

  couponsHTML += "</div>"
  couponList.innerHTML = couponsHTML

  // Add event listeners to coupon buttons
  document.querySelectorAll(".toggle-coupon").forEach((button) => {
    button.addEventListener("click", function () {
      const code = this.dataset.code
      const isActive = this.dataset.active === "true"

      // Update coupon status
      const coupons = JSON.parse(localStorage.getItem("coupons")) || []
      const updatedCoupons = coupons.map((coupon) => {
        if (coupon.code === code) {
          return { ...coupon, active: !isActive }
        }
        return coupon
      })

      localStorage.setItem("coupons", JSON.stringify(updatedCoupons))

      // Log activity
      addToActivityLog("Coupon Updated", `${isActive ? "Deactivated" : "Activated"} coupon: ${code}`)

      // Refresh coupon list
      loadCouponList()

      // Show notification
      showNotification(`Coupon ${code} ${isActive ? "deactivated" : "activated"} successfully.`, "success")
    })
  })

  document.querySelectorAll(".delete-coupon").forEach((button) => {
    button.addEventListener("click", function () {
      const code = this.dataset.code

      if (confirm(`Are you sure you want to delete coupon "${code}"?`)) {
        // Delete coupon
        const coupons = JSON.parse(localStorage.getItem("coupons")) || []
        const updatedCoupons = coupons.filter((coupon) => coupon.code !== code)

        localStorage.setItem("coupons", JSON.stringify(updatedCoupons))

        // Log activity
        addToActivityLog("Coupon Deleted", `Deleted coupon: ${code}`)

        // Refresh coupon list
        loadCouponList()

        // Show notification
        showNotification(`Coupon ${code} deleted successfully.`, "success")
      }
    })
  })
}

// Function to open delete confirmation modal
function openDeleteConfirmationModal(productId) {
  productToDelete = productId
  const deleteConfirmationModal = document.getElementById("delete-confirmation-modal")

  if (deleteConfirmationModal) {
    deleteConfirmationModal.style.display = "block"
  }
}

function closeDeleteConfirmationModal() {
  const deleteConfirmationModal = document.getElementById("delete-confirmation-modal")
  if (deleteConfirmationModal) {
    deleteConfirmationModal.style.display = "none"
  }
  productToDelete = null
}

function confirmDeleteProduct() {
  if (!productToDelete) return

  // Get products from localStorage
  const products = JSON.parse(localStorage.getItem("products")) || []

  // Find product to delete
  const productIndex = products.findIndex((p) => p.id === productToDelete)

  if (productIndex !== -1) {
    const deletedProduct = products[productIndex]

    // Remove product
    products.splice(productIndex, 1)

    // Save updated products
    localStorage.setItem("products", JSON.stringify(products))

    // Log activity
    addToActivityLog("Product Deleted", `Deleted product: ${deletedProduct.name}`)

    // Refresh product list
    loadProductList()

    // Show notification
    showNotification(`Product "${deletedProduct.name}" deleted successfully.`, "success")
  }

  closeDeleteConfirmationModal()
}

// Initialize

// Add this function to update the cart count display
function updateCartCountDisplay() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || []
  const cartCountElements = document.querySelectorAll(".cart-count")

  cartCountElements.forEach((element) => {
    element.textContent = cartItems.reduce((total, item) => total + item.quantity, 0)

    // Make the cart count visible if there are items
    if (cartItems.length > 0) {
      element.style.display = "flex"
    } else {
      element.style.display = "none"
    }
  })
}

// Add this function to initialize cart count on all pages
function initCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const count = cart.reduce((total, item) => total + item.quantity, 0)

  const cartCountElements = document.querySelectorAll(".cart-count")
  cartCountElements.forEach((element) => {
    element.textContent = count

    if (count > 0) {
      element.style.display = "flex"
    } else {
      element.style.display = "none"
    }
  })
}

// Call this function when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize cart count
  initCartCount()

  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById("themeToggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark")
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light")
    })
  }

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark")
  }

  // Mobile menu functionality
  const menuButton = document.getElementById("menuButton")
  const mobileMenu = document.getElementById("mobileMenu")
  const closeMenu = document.getElementById("closeMenu")

  if (menuButton && mobileMenu && closeMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.add("active")
    })

    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  }
})

// Call updateCartCount when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  initTheme()

  // Mobile Menu
  initMobileMenu()

  // Set current year in footer
  setCurrentYear()

  // Initialize products in localStorage if not exists
  initializeProducts()

  // Initialize coupons in localStorage if not exists
  initializeCoupons()

  // Load featured products on home page
  loadFeaturedProducts()

  // Initialize products page
  initProductsPage()

  // Initialize cart
  initCart()

  // Initialize product detail page
  initProductDetail()

  // Initialize FAQ accordion
  initFaqAccordion()

  // Initialize profile page
  initProfilePage()

  // Initialize contact form
  initContactForm()

  // Initialize admin dashboard if on admin page
  if (document.querySelector(".admin-dashboard")) {
    loadProductList()
    loadCouponList()
    displayActivityLog()
    updateRecentActivity()

    // Set current date
    const currentDate = document.getElementById("current-date")
    if (currentDate) {
      currentDate.textContent = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }

    // Tab navigation
    const navLinks = document.querySelectorAll(".admin-nav-link")
    const tabContents = document.querySelectorAll(".admin-tab")

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        // Remove active class from all links and tabs
        navLinks.forEach((l) => l.classList.remove("active"))
        tabContents.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked link and corresponding tab
        this.classList.add("active")
        document.getElementById(`${this.dataset.tab}-tab`).classList.add("active")
      })
    })

    // Add product form submission
    const addProductForm = document.getElementById("add-product-form")
    if (addProductForm) {
      // Handle file input for product image
      const productImageFile = document.getElementById("product-image-file")
      const imagePreview = document.getElementById("image-preview")
      const productImageInput = document.getElementById("product-image")

      if (productImageFile) {
        productImageFile.addEventListener("change", (e) => {
          const file = e.target.files[0]
          if (file) {
            // For demo purposes, we'll use a placeholder or FileReader
            // In a real app, you would upload this to a server
            const reader = new FileReader()
            reader.onload = (event) => {
              imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px;">`
              productImageInput.value = event.target.result // Store data URL for demo
            }
            reader.readAsDataURL(file)
          }
        })
      }

      addProductForm.addEventListener("submit", function (e) {
        e.preventDefault()

        // Get form values
        const name = document.getElementById("product-name").value
        const price = Number.parseFloat(document.getElementById("product-price").value)
        const category = document.getElementById("product-category").value
        const description = document.getElementById("product-description").value
        const image = document.getElementById("product-image").value

        // Get featured status
        const featuredCheckbox = document.getElementById("product-featured")
        const featured = featuredCheckbox ? featuredCheckbox.checked : false

        // Get selected sizes
        const sizeCheckboxes = document.querySelectorAll('input[name="product-sizes"]:checked')
        const sizes = Array.from(sizeCheckboxes).map((checkbox) => checkbox.value)

        // Get selected colors
        const colorCheckboxes = document.querySelectorAll('input[name="product-colors"]:checked')
        const colors = Array.from(colorCheckboxes).map((checkbox) => checkbox.value)

        // Validate form
        if (!name || !price || !category || !description) {
          showNotification("Please fill in all required fields.", "error")
          return
        }

        if (sizes.length === 0) {
          showNotification("Please select at least one size.", "error")
          return
        }

        if (colors.length === 0) {
          showNotification("Please select at least one color.", "error")
          return
        }

        // Get existing products
        const products = JSON.parse(localStorage.getItem("products")) || []

        // Check if we're editing or adding a new product
        const editId = this.dataset.editId

        if (editId) {
          // Update existing product
          const updatedProducts = products.map((product) => {
            if (product.id === editId) {
              return {
                ...product,
                name,
                price,
                category,
                sizes,
                colors,
                image,
                description,
                featured,
              }
            }
            return product
          })

          // Save to localStorage
          localStorage.setItem("products", JSON.stringify(updatedProducts))

          // Log activity
          addToActivityLog("Product Updated", `Updated product: ${name}`)

          // Show notification
          showNotification(`Product "${name}" updated successfully!`, "success")
        } else {
          // Create new product
          const newProduct = {
            id: Date.now().toString(), // Generate unique ID
            name,
            price,
            rating: 5.0, // Default rating for new products
            category,
            sizes,
            colors,
            image: image || "https://placehold.co/400x400",
            description,
            featured,
          }

          // Add to products array
          products.push(newProduct)

          // Save to localStorage
          localStorage.setItem("products", JSON.stringify(products))

          // Log activity
          addToActivityLog("Product Added", `Added new product: ${name} (${category}) at $${price}`)

          // Show notification
          showNotification(`Product "${name}" added successfully!`, "success")
        }

        // Update display
        loadProductList()

        // Close modal and reset form
        const addProductModal = document.getElementById("add-product-modal")
        if (addProductModal) {
          addProductModal.style.display = "none"
        }

        // Reset form and clear edit ID
        this.reset()
        this.dataset.editId = ""
        imagePreview.innerHTML = ""

        // Remove featured checkbox if it was added for editing
        const featuredGroup = document.querySelector(".admin-form-group:has(#product-featured)")
        if (featuredGroup) {
          featuredGroup.remove()
        }
      })
    }

    // Add coupon form submission
    const addCouponForm = document.getElementById("add-coupon-form")
    if (addCouponForm) {
      addCouponForm.addEventListener("submit", function (e) {
        e.preventDefault()

        // Get form values
        const code = document.getElementById("coupon-code").value.trim().toUpperCase()
        const discount = Number.parseFloat(document.getElementById("coupon-discount").value)
        const active = document.getElementById("coupon-active").checked

        // Validate form
        if (!code) {
          showNotification("Please enter a coupon code.", "error")
          return
        }

        if (isNaN(discount) || discount <= 0 || discount > 100) {
          showNotification("Please enter a valid discount percentage (1-100).", "error")
          return
        }

        // Get existing coupons
        const coupons = JSON.parse(localStorage.getItem("coupons")) || []

        // Check if coupon code already exists
        if (coupons.some((c) => c.code === code)) {
          showNotification("A coupon with this code already exists.", "error")
          return
        }

        // Create new coupon
        const newCoupon = {
          code,
          discount,
          active,
          created: new Date().toISOString(),
        }

        // Add to coupons array
        coupons.push(newCoupon)

        // Save to localStorage
        localStorage.setItem("coupons", JSON.stringify(coupons))

        // Log activity
        addToActivityLog("Coupon Added", `Added new coupon: ${code} (${discount}% off)`)

        // Update display
        loadCouponList()

        // Close modal and reset form
        const addCouponModal = document.getElementById("add-coupon-modal")
        if (addCouponModal) {
          addCouponModal.style.display = "none"
        }
        this.reset()

        // Show notification
        showNotification(`Coupon "${code}" added successfully!`, "success")
      })
    }

    // Modal event listeners
    const addProductButton = document.getElementById("add-product-button")
    const closeProductModal = document.getElementById("close-product-modal")
    const cancelProduct = document.getElementById("cancel-product")

    if (addProductButton) {
      addProductButton.addEventListener("click", () => {
        const addProductModal = document.getElementById("add-product-modal")
        const modalTitle = addProductModal.querySelector(".admin-modal-header h2")
        const form = document.getElementById("add-product-form")
        const submitButton = form.querySelector('button[type="submit"]')

        // Reset form for adding new product
        modalTitle.textContent = "Add New Product"
        submitButton.textContent = "Add Product"
        form.reset()
        form.dataset.editId = ""
        document.getElementById("image-preview").innerHTML = ""

        // Remove featured checkbox if it was added for editing
        const featuredGroup = document.querySelector(".admin-form-group:has(#product-featured)")
        if (featuredGroup) {
          featuredGroup.remove()
        }

        addProductModal.style.display = "block"
      })
    }

    if (closeProductModal) {
      closeProductModal.addEventListener("click", () => {
        document.getElementById("add-product-modal").style.display = "none"
      })
    }

    if (cancelProduct) {
      cancelProduct.addEventListener("click", () => {
        document.getElementById("add-product-modal").style.display = "none"
      })
    }

    // Delete confirmation modal
    const closeDeleteModal = document.getElementById("close-delete-modal")
    const cancelDelete = document.getElementById("cancel-delete")
    const confirmDelete = document.getElementById("confirm-delete")

    if (closeDeleteModal) {
      closeDeleteModal.addEventListener("click", closeDeleteConfirmationModal)
    }

    if (cancelDelete) {
      cancelDelete.addEventListener("click", closeDeleteConfirmationModal)
    }

    if (confirmDelete) {
      confirmDelete.addEventListener("click", confirmDeleteProduct)
    }

    // Coupon modal
    const addCouponButton = document.getElementById("add-coupon-button")
    const closeCouponModal = document.getElementById("close-coupon-modal")
    const cancelCoupon = document.getElementById("cancel-coupon")

    if (addCouponButton) {
      addCouponButton.addEventListener("click", () => {
        document.getElementById("add-coupon-modal").style.display = "block"
      })
    }

    if (closeCouponModal) {
      closeCouponModal.addEventListener("click", () => {
        document.getElementById("add-coupon-modal").style.display = "none"
      })
    }

    if (cancelCoupon) {
      cancelCoupon.addEventListener("click", () => {
        document.getElementById("add-coupon-modal").style.display = "none"
      })
    }
  }

  // Update cart count on page load
  updateCartCountDisplay()
})

// Call updateCartCount when the page loads
document.addEventListener("DOMContentLoaded", () => {
  updateCartCountDisplay()

  // Initialize theme
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "light" ? "dark" : "light"

      document.documentElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
    })
  }

  // Initialize product detail page if on product detail page
  const productDetailContainer = document.querySelector(".product-detail-container")
  if (productDetailContainer) {
    initProductDetail()
  }

  // Initialize cart page if on cart page
  const cartContainer = document.querySelector(".cart-container")
  if (cartContainer) {
    initCart()
  }

  // Initialize products page if on products page
  const productsContainer = document.querySelector(".products-container")
  if (productsContainer) {
    initProducts()
  }
})

// Add to cart function
function addToCartDetail(productId, productName, price, image, size = "M", quantity = 1) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Check if product already exists in cart with the same size
  const existingItemIndex = cart.findIndex((item) => item.id === productId && item.size === size)

  if (existingItemIndex !== -1) {
    // Update quantity if product already exists
    cart[existingItemIndex].quantity += quantity
  } else {
    // Add new item to cart
    cart.push({
      id: productId,
      name: productName,
      price: price,
      image: image,
      size: size,
      quantity: quantity,
    })
  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count display
  updateCartCountDisplay()

  // Show notification
  showNotification("Product added to cart!")
}

// Function to initialize product detail page
function initProductDetail() {
  const sizeButtons = document.querySelectorAll(".size-btn")
  const quantityInput = document.getElementById("quantity")
  const addToCartBtn = document.getElementById("add-to-cart-btn")

  // Size selection
  if (sizeButtons) {
    sizeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        sizeButtons.forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")
      })
    })
  }

  // Add to cart button
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function () {
      const productId = this.getAttribute("data-product-id")
      const productName = this.getAttribute("data-product-name")
      const price = Number.parseFloat(this.getAttribute("data-price"))
      const image = this.getAttribute("data-image")

      // Get selected size
      const selectedSize = document.querySelector(".size-btn.active")
      const size = selectedSize ? selectedSize.getAttribute("data-size") : "M"

      // Get quantity
      const quantity = quantityInput ? Number.parseInt(quantityInput.value) : 1

      // Add to cart
      addToCartDetail(productId, productName, price, image, size, quantity)
    })
  }
}

// Function to initialize cart page
function initCart() {
  renderCart()

  // Update price when quantity changes
  document.addEventListener("change", (e) => {
    if (e.target && e.target.classList.contains("cart-item-quantity")) {
      updateCartItemQuantity(e.target)
    }
  })

  // Remove item when remove button is clicked
  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("remove-item-btn")) {
      removeCartItem(e.target)
    }
  })
}

// Function to render cart items
function renderCart() {
  const cartItemsContainer = document.querySelector(".cart-items")
  const cartSummaryContainer = document.querySelector(".cart-summary")

  if (!cartItemsContainer) return

  const cart = JSON.parse(localStorage.getItem("cart")) || []

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<div class="empty-cart"><p>Your cart is empty</p><a href="products.html" class="btn">Continue Shopping</a></div>'
    if (cartSummaryContainer) {
      cartSummaryContainer.style.display = "none"
    }
    return
  }

  let cartHTML = ""
  let subtotal = 0

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity
    subtotal += itemTotal

    cartHTML += `
      <div class="cart-item" data-index="${index}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Size: ${item.size}</p>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          <div class="cart-item-actions">
            <div class="quantity-control">
              <button class="quantity-btn minus" onclick="decrementQuantity(${index})">-</button>
              <input type="number" min="1" value="${item.quantity}" class="cart-item-quantity" data-index="${index}" data-price="${item.price}">
              <button class="quantity-btn plus" onclick="incrementQuantity(${index})">+</button>
            </div>
            <button class="remove-item-btn" data-index="${index}">Remove</button>
          </div>
        </div>
        <div class="cart-item-total">
          <p>$${itemTotal.toFixed(2)}</p>
        </div>
      </div>
    `
  })

  cartItemsContainer.innerHTML = cartHTML

  // Update cart summary
  if (cartSummaryContainer) {
    cartSummaryContainer.style.display = "block"
    const shipping = subtotal > 100 ? 0 : 10
    const total = subtotal + shipping

    cartSummaryContainer.innerHTML = `
      <h2>Order Summary</h2>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? "Free" : "$" + shipping.toFixed(2)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <button class="btn checkout-btn">Proceed to Checkout</button>
    `
  }

  // Update cart count
  updateCartCountDisplay()
}

// Function to update cart item quantity
function updateCartItemQuantity(input) {
  const index = Number.parseInt(input.getAttribute("data-index"))
  const newQuantity = Number.parseInt(input.value)

  if (newQuantity < 1) {
    input.value = 1
    return
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || []

  if (index >= 0 && index < cart.length) {
    cart[index].quantity = newQuantity
    localStorage.setItem("cart", JSON.stringify(cart))
    renderCart()
  }
}

// Function to remove cart item
function removeCartItem(button) {
  const index = Number.parseInt(button.getAttribute("data-index"))
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    renderCart()
    updateCartCountDisplay()
  }
}

// Increment quantity function
function incrementQuantity(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  if (index >= 0 && index < cart.length) {
    cart[index].quantity += 1
    localStorage.setItem("cart", JSON.stringify(cart))
    renderCart()
  }
}

// Decrement quantity function
function decrementQuantity(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  if (index >= 0 && index < cart.length && cart[index].quantity > 1) {
    cart[index].quantity -= 1
    localStorage.setItem("cart", JSON.stringify(cart))
    renderCart()
  }
}

// Function to initialize products page
function initProducts() {
  // Filter and sort functionality
  const filterForm = document.getElementById("filter-form")
  const sortSelect = document.getElementById("sort")

  if (filterForm) {
    filterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      filterProducts()
    })
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      sortProducts()
    })
  }
}

// Function to show notification
function displayNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message

  document.body.appendChild(notification)

  // Show notification
  setTimeout(() => {
    notification.classList.add("show")
  }, 10)

  // Hide and remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

