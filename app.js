const CATEGORY_TEMPLATES = {
  Clothing: {
    detailLabels: { field1: "Colors", field2: "Sizes", field3: "Materials / extra detail" },
    detailPlaceholders: { field1: "Black, White, Blue", field2: "S, M, L", field3: "Cotton, Recycled Fiber" },
    clientLabels: { field1: "Select colors", field2: "Select size", field3: "Extra details" }
  },
  Shoes: {
    detailLabels: { field1: "Colors", field2: "Sizes", field3: "Materials / sole type" },
    detailPlaceholders: { field1: "White, Red, Black", field2: "40, 41, 42, 43", field3: "Mesh, Rubber, Foam" },
    clientLabels: { field1: "Select colors", field2: "Select size", field3: "Extra details" }
  },
  Electronics: {
    detailLabels: { field1: "Battery", field2: "Power / cable supply", field3: "Connectivity / extra specs" },
    detailPlaceholders: { field1: "5000mAh, Li-ion", field2: "USB-C, 65W", field3: "Bluetooth 5.3, Wi‑Fi 6" },
    clientLabels: { field1: "Battery", field2: "Power supply", field3: "Extra specifications" }
  },
  Accessories: {
    detailLabels: { field1: "Colors", field2: "Compatibility / size", field3: "Materials" },
    detailPlaceholders: { field1: "Black, Silver", field2: "Universal, Medium", field3: "Leather, Aluminum" },
    clientLabels: { field1: "Select colors", field2: "Compatibility / size", field3: "Extra details" }
  }
};

const EMPTY_FORM = {
  name: "",
  description: "",
  basePrice: "",
  stock: "",
  deliveryTimeExpectation: "",
  isOnline: true,
  deliveryEnabled: false,
  deliveryFee: "",
  specialEventEnabled: false,
  specialEventName: "Black Friday",
  discountType: "percent",
  discountValue: "",
  category: "Clothing",
  pictures: [""],
  details: { field1: "", field2: "", field3: "" }
};

const SEED_PRODUCTS = [
  {
    id: crypto.randomUUID(),
    name: "Minimal Hoodie",
    description: "A soft and modern hoodie designed for casual wear. Clicked from the catalog, this opens into a product page with details, options, and pricing.",
    basePrice: 49.99,
    stock: 40,
    deliveryTimeExpectation: "5 to 10 days",
    isOnline: true,
    deliveryEnabled: true,
    deliveryFee: 4.99,
    specialEventEnabled: true,
    specialEventName: "Black Friday",
    discountType: "percent",
    discountValue: 20,
    category: "Clothing",
    pictures: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
    ],
    details: {
      field1: ["Black", "Gray", "Navy"],
      field2: ["S", "M", "L", "XL"],
      field3: ["Cotton", "Polyester"]
    }
  },
  {
    id: crypto.randomUUID(),
    name: "Urban Sneakers",
    description: "Street-style sneakers with a lightweight sole. Includes optional delivery fee and event-based discount support.",
    basePrice: 79.9,
    stock: 5,
    deliveryTimeExpectation: "3 to 6 days",
    isOnline: false,
    deliveryEnabled: false,
    deliveryFee: 0,
    specialEventEnabled: false,
    specialEventName: "",
    discountType: "percent",
    discountValue: 0,
    category: "Shoes",
    pictures: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"],
    details: {
      field1: ["White", "Red"],
      field2: ["40", "41", "42", "43"],
      field3: ["Mesh", "Rubber"]
    }
  }
];

const state = {
  products: structuredClone(SEED_PRODUCTS),
  form: structuredClone(EMPTY_FORM),
  activeTab: "admin",
  search: "",
  selectedIds: [],
  selectedProductId: null,
  selectedField1: "",
  selectedField2: "",
  adminEditableField: null,
  clientEditableField: null,
  showImportPanel: false,
  importText: "",
  cardUi: {}
};

const $ = (id) => document.getElementById(id);
const els = {
  tabButtons: Array.from(document.querySelectorAll(".tab-button")),
  adminTab: $("admin-tab"),
  storeTab: $("store-tab"),
  form: $("product-form"),
  resetForm: $("reset-form"),
  name: $("name"),
  category: $("category"),
  description: $("description"),
  basePrice: $("basePrice"),
  stock: $("stock"),
  deliveryTimeExpectation: $("deliveryTimeExpectation"),
  visibilityToggle: $("visibility-toggle"),
  deliveryEnabled: $("deliveryEnabled"),
  deliveryFeeWrap: $("delivery-fee-wrap"),
  deliveryFee: $("deliveryFee"),
  specialEventEnabled: $("specialEventEnabled"),
  specialEventWrap: $("special-event-wrap"),
  specialEventName: $("specialEventName"),
  discountType: $("discountType"),
  discountValue: $("discountValue"),
  addPictureField: $("add-picture-field"),
  picturesList: $("pictures-list"),
  detail1Label: $("detail1-label"),
  detail2Label: $("detail2-label"),
  detail3Label: $("detail3-label"),
  detail1: $("detail1"),
  detail2: $("detail2"),
  detail3: $("detail3"),
  importFromAdmin: $("import-from-admin"),
  jsonFileInput: $("json-file-input"),
  search: $("search"),
  productsCount: $("products-count"),
  totalStock: $("total-stock"),
  toggleSelectVisible: $("toggle-select-visible"),
  selectVisibleIcon: $("select-visible-icon"),
  exportSelected: $("export-selected"),
  selectedCount: $("selected-count"),
  toggleImportPanel: $("toggle-import-panel"),
  toggleImportPanelLabel: $("toggle-import-panel-label"),
  importPanel: $("import-panel"),
  importText: $("import-text"),
  importNow: $("import-now"),
  uploadJson: $("upload-json"),
  productsGrid: $("products-grid"),
  emptyState: $("empty-state"),
  modalBackdrop: $("modal-backdrop"),
  modalClose: $("modal-close"),
  modalNameWrap: $("modal-name-wrap"),
  modalMainImage: $("modal-main-image"),
  modalThumbs: $("modal-thumbs"),
  modalBadges: $("modal-badges"),
  modalDescriptionWrap: $("modal-description-wrap"),
  modalPricing: $("modal-pricing"),
  modalDetails: $("modal-details"),
  choiceSnapshot: $("choice-snapshot")
};

function parseCommaString(value) {
  return String(value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
}

function getTemplate(category) {
  return CATEGORY_TEMPLATES[category] || CATEGORY_TEMPLATES.Clothing;
}

function computeFinalPrice(product) {
  const base = Number(product.basePrice) || 0;
  const discountValue = Number(product.discountValue) || 0;
  let discounted = base;
  if (product.specialEventEnabled && discountValue > 0) {
    discounted = product.discountType === "fixed" ? base - discountValue : base - (base * discountValue) / 100;
  }
  discounted = Math.max(discounted, 0);
  const total = product.deliveryEnabled ? discounted + (Number(product.deliveryFee) || 0) : discounted;
  return { base, discounted, total };
}

function validateProduct(product) {
  const issues = [];
  if (!String(product.name || "").trim()) issues.push("Missing product name");
  if (!String(product.description || "").trim()) issues.push("Missing product description");
  if (!Number.isFinite(Number(product.basePrice)) || Number(product.basePrice) < 0) issues.push("Invalid base price");
  if (!Number.isInteger(Number(product.stock)) || Number(product.stock) < 0) issues.push("Invalid stock value");
  if (!String(product.category || "").trim()) issues.push("Missing category");
  if (!String(product.deliveryTimeExpectation || "").trim()) issues.push("Missing delivery time expectation");
  if (!Array.isArray(product.pictures) || product.pictures.length < 1) issues.push("At least 1 picture is required");
  if (Array.isArray(product.pictures) && product.pictures.some((pic) => !String(pic || "").trim())) issues.push("One or more picture fields are empty");
  if (product.deliveryEnabled && (!Number.isFinite(Number(product.deliveryFee)) || Number(product.deliveryFee) < 0)) issues.push("Delivery fee enabled but invalid fee value");
  if (product.specialEventEnabled && (!Number.isFinite(Number(product.discountValue)) || Number(product.discountValue) < 0)) issues.push("Discount is enabled but invalid discount value");
  if (product.discountType !== "percent" && product.discountType !== "fixed") issues.push("Invalid discount type");
  return { valid: issues.length === 0, issues };
}

function sanitizeImportedProduct(raw) {
  return {
    id: crypto.randomUUID(),
    name: String(raw?.name || "").trim(),
    description: String(raw?.description || "").trim(),
    basePrice: Number(raw?.basePrice ?? 0),
    stock: Number(raw?.stock ?? 0),
    deliveryTimeExpectation: String(raw?.deliveryTimeExpectation || "").trim(),
    isOnline: raw?.isOnline !== undefined ? Boolean(raw.isOnline) : true,
    deliveryEnabled: Boolean(raw?.deliveryEnabled),
    deliveryFee: raw?.deliveryEnabled ? Number(raw?.deliveryFee ?? 0) : 0,
    specialEventEnabled: Boolean(raw?.specialEventEnabled),
    specialEventName: String(raw?.specialEventName || ""),
    discountType: raw?.discountType === "fixed" ? "fixed" : "percent",
    discountValue: raw?.specialEventEnabled ? Number(raw?.discountValue ?? 0) : 0,
    category: String(raw?.category || "Clothing"),
    pictures: Array.isArray(raw?.pictures) && raw.pictures.length ? raw.pictures.map((item) => String(item || "").trim()).filter(Boolean) : [""],
    details: {
      field1: Array.isArray(raw?.details?.field1) ? raw.details.field1.map((item) => String(item)) : [],
      field2: Array.isArray(raw?.details?.field2) ? raw.details.field2.map((item) => String(item)) : [],
      field3: Array.isArray(raw?.details?.field3) ? raw.details.field3.map((item) => String(item)) : []
    }
  };
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value) || 0);
}

function setActiveTab(tab) {
  state.activeTab = tab;
  els.tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === tab));
  els.adminTab.classList.toggle("active", tab === "admin");
  els.storeTab.classList.toggle("active", tab === "store");
}

function getFilteredProducts() {
  const term = state.search.toLowerCase().trim();
  if (!term) return state.products;
  return state.products.filter((product) => {
    const searchText = [product.name, product.description, product.category, ...(product.details?.field1 || []), ...(product.details?.field2 || []), ...(product.details?.field3 || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return searchText.includes(term);
  });
}

function getSelectedProduct() {
  return state.products.find((product) => product.id === state.selectedProductId) || null;
}

function getCardUi(productId) {
  if (!state.cardUi[productId]) {
    state.cardUi[productId] = { confirmDelete: false, confirmToggle: false, confirmReAdd: false, confirmOutOfStock: false };
  }
  return state.cardUi[productId];
}

function clearCardConfirms(productId) {
  const ui = getCardUi(productId);
  ui.confirmDelete = false;
  ui.confirmToggle = false;
  ui.confirmReAdd = false;
  ui.confirmOutOfStock = false;
}

function updateFormField(path, value) {
  if (path.startsWith("details.")) {
    const key = path.split(".")[1];
    state.form.details[key] = value;
  } else {
    state.form[path] = value;
  }
  renderForm();
}

function resetForm() {
  state.form = { ...structuredClone(EMPTY_FORM), category: state.form.category };
  state.adminEditableField = null;
  renderForm();
}

function updatePicture(index, value) {
  state.form.pictures[index] = value;
  renderPictures();
}

function addPictureField() {
  state.form.pictures.push("");
  renderPictures();
}

function removePictureField(index) {
  if (state.form.pictures.length === 1) {
    state.form.pictures = [""];
  } else {
    state.form.pictures.splice(index, 1);
  }
  renderPictures();
}

function buildProductFromForm() {
  return {
    id: crypto.randomUUID(),
    name: state.form.name.trim(),
    description: state.form.description.trim(),
    basePrice: Number(state.form.basePrice),
    stock: Number(state.form.stock),
    deliveryTimeExpectation: state.form.deliveryTimeExpectation.trim(),
    isOnline: state.form.isOnline,
    deliveryEnabled: state.form.deliveryEnabled,
    deliveryFee: state.form.deliveryEnabled ? Number(state.form.deliveryFee || 0) : 0,
    specialEventEnabled: state.form.specialEventEnabled,
    specialEventName: state.form.specialEventName.trim(),
    discountType: state.form.discountType,
    discountValue: state.form.specialEventEnabled ? Number(state.form.discountValue || 0) : 0,
    category: state.form.category,
    pictures: state.form.pictures.map((picture) => picture.trim()).filter(Boolean),
    details: {
      field1: parseCommaString(state.form.details.field1),
      field2: parseCommaString(state.form.details.field2),
      field3: parseCommaString(state.form.details.field3)
    }
  };
}

function handleAddProduct(event) {
  event.preventDefault();
  const product = buildProductFromForm();
  const result = validateProduct(product);
  if (!result.valid) {
    alert(`Product cannot be added:\n\n${result.issues.join("\n")}`);
    return;
  }
  state.products.unshift(product);
  state.form = { ...structuredClone(EMPTY_FORM), category: state.form.category };
  state.adminEditableField = null;
  setActiveTab("store");
  render();
}

function openProduct(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;
  state.selectedProductId = productId;
  state.selectedField1 = product.details?.field1?.[0] || "";
  state.selectedField2 = product.details?.field2?.[0] || "";
  state.clientEditableField = null;
  renderModal();
  els.modalBackdrop.classList.remove("hidden");
}

function closeModal() {
  state.selectedProductId = null;
  state.selectedField1 = "";
  state.selectedField2 = "";
  state.clientEditableField = null;
  els.modalBackdrop.classList.add("hidden");
}

function loadProductIntoForm(productId) {
  const source = state.products.find((product) => product.id === productId);
  if (!source) return;
  state.form = {
    name: source.name || "",
    description: source.description || "",
    basePrice: String(source.basePrice ?? ""),
    stock: String(source.stock ?? ""),
    deliveryTimeExpectation: source.deliveryTimeExpectation || "",
    isOnline: Boolean(source.isOnline),
    deliveryEnabled: Boolean(source.deliveryEnabled),
    deliveryFee: source.deliveryEnabled ? String(source.deliveryFee ?? "") : "",
    specialEventEnabled: Boolean(source.specialEventEnabled),
    specialEventName: source.specialEventName || "Black Friday",
    discountType: source.discountType || "percent",
    discountValue: source.specialEventEnabled ? String(source.discountValue ?? "") : "",
    category: source.category || "Clothing",
    pictures: Array.isArray(source.pictures) && source.pictures.length ? [...source.pictures] : [""],
    details: {
      field1: Array.isArray(source.details?.field1) ? source.details.field1.join(", ") : "",
      field2: Array.isArray(source.details?.field2) ? source.details.field2.join(", ") : "",
      field3: Array.isArray(source.details?.field3) ? source.details.field3.join(", ") : ""
    }
  };
  state.adminEditableField = null;
  setActiveTab("admin");
  render();
}

function updateProductById(productId, updater) {
  state.products = state.products.map((product) => (product.id === productId ? updater(product) : product));
  if (state.selectedProductId === productId) {
    const selected = getSelectedProduct();
    if (!selected) closeModal();
  }
}

function toggleProductOnline(productId) {
  updateProductById(productId, (product) => ({ ...product, isOnline: !product.isOnline }));
  render();
}

function markOutOfStock(productId) {
  updateProductById(productId, (product) => ({ ...product, stock: 0 }));
  render();
}

function quickRestock(productId, amount) {
  updateProductById(productId, (product) => ({ ...product, stock: (Number(product.stock) || 0) + amount }));
  render();
}

function moveProductToTop(productId) {
  const index = state.products.findIndex((product) => product.id === productId);
  if (index <= 0) return;
  const next = [...state.products];
  const [item] = next.splice(index, 1);
  next.unshift(item);
  state.products = next;
  renderStore();
}

function moveProductUp(productId) {
  const index = state.products.findIndex((product) => product.id === productId);
  if (index <= 0) return;
  const next = [...state.products];
  [next[index - 1], next[index]] = [next[index], next[index - 1]];
  state.products = next;
  renderStore();
}

function moveProductDown(productId) {
  const index = state.products.findIndex((product) => product.id === productId);
  if (index < 0 || index >= state.products.length - 1) return;
  const next = [...state.products];
  [next[index], next[index + 1]] = [next[index + 1], next[index]];
  state.products = next;
  renderStore();
}

function removeProduct(productId) {
  state.products = state.products.filter((product) => product.id !== productId);
  state.selectedIds = state.selectedIds.filter((id) => id !== productId);
  delete state.cardUi[productId];
  if (state.selectedProductId === productId) closeModal();
  renderStore();
}

function updateSelectedProductField(field, value) {
  if (!state.selectedProductId) return;
  updateProductById(state.selectedProductId, (product) => ({ ...product, [field]: value }));
  renderStore();
  renderModal();
}

function downloadJsonFile(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function exportOneProduct(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;
  const safeName = product.name.trim() ? product.name.replace(/\s+/g, "-").toLowerCase() : "product";
  downloadJsonFile(`${safeName}-product.json`, product);
}

function exportSelectedProducts() {
  const bundle = state.products.filter((product) => state.selectedIds.includes(product.id));
  if (!bundle.length) {
    alert("Select one or more products first.");
    return;
  }
  downloadJsonFile("products-bundle.json", bundle);
}

function toggleSelection(productId, isChecked) {
  state.selectedIds = isChecked ? Array.from(new Set([...state.selectedIds, productId])) : state.selectedIds.filter((id) => id !== productId);
  renderStoreToolbar();
  renderStoreGrid();
}

function toggleSelectAllVisible() {
  const filteredIds = getFilteredProducts().map((product) => product.id);
  const allVisibleSelected = filteredIds.length > 0 && filteredIds.every((id) => state.selectedIds.includes(id));
  if (allVisibleSelected) {
    state.selectedIds = state.selectedIds.filter((id) => !filteredIds.includes(id));
  } else {
    state.selectedIds = Array.from(new Set([...state.selectedIds, ...filteredIds]));
  }
  renderStoreToolbar();
  renderStoreGrid();
}

function importBundleFromText() {
  try {
    const parsed = JSON.parse(state.importText);
    const rawItems = Array.isArray(parsed) ? parsed : [parsed];
    const imported = rawItems.map(sanitizeImportedProduct);
    const invalid = imported.map(validateProduct).find((item) => !item.valid);
    if (invalid) {
      alert(`Import failed:\n\n${invalid.issues.join("\n")}`);
      return;
    }
    state.products = [...imported, ...state.products];
    state.importText = "";
    state.showImportPanel = false;
    setActiveTab("store");
    render();
  } catch {
    alert("Invalid JSON format.");
  }
}

function importBundleFromFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.importText = String(reader.result || "");
    state.showImportPanel = true;
    renderStoreToolbar();
  };
  reader.readAsText(file);
}

function renderCategoryOptions() {
  const currentValue = state.form.category;
  els.category.innerHTML = Object.keys(CATEGORY_TEMPLATES)
    .map((category) => `<option value="${category}" ${currentValue === category ? "selected" : ""}>${category}</option>`)
    .join("");
}

function renderTemplateFields() {
  const template = getTemplate(state.form.category);
  els.detail1Label.textContent = template.detailLabels.field1;
  els.detail2Label.textContent = template.detailLabels.field2;
  els.detail3Label.textContent = template.detailLabels.field3;
  els.detail1.placeholder = template.detailPlaceholders.field1;
  els.detail2.placeholder = template.detailPlaceholders.field2;
  els.detail3.placeholder = template.detailPlaceholders.field3;
  els.detail1.value = state.form.details.field1;
  els.detail2.value = state.form.details.field2;
  els.detail3.value = state.form.details.field3;
}

function renderPictures() {
  els.picturesList.innerHTML = "";
  state.form.pictures.forEach((picture, index) => {
    const row = document.createElement("div");
    row.className = "grid two-picture";
    row.innerHTML = `
      <input type="text" value="${escapeHtml(picture)}" placeholder="Picture URL ${index + 1}" />
      <button type="button" class="ghost-button">🗑</button>
    `;
    const input = row.querySelector("input");
    const button = row.querySelector("button");
    input.addEventListener("input", (event) => updatePicture(index, event.target.value));
    button.addEventListener("click", () => removePictureField(index));
    els.picturesList.appendChild(row);
  });
}

function renderForm() {
  renderCategoryOptions();
  els.name.value = state.form.name;
  els.name.readOnly = state.adminEditableField !== "name";
  els.description.value = state.form.description;
  els.description.readOnly = state.adminEditableField !== "description";
  els.basePrice.value = state.form.basePrice;
  els.stock.value = state.form.stock;
  els.deliveryTimeExpectation.value = state.form.deliveryTimeExpectation;
  els.deliveryEnabled.checked = state.form.deliveryEnabled;
  els.deliveryFee.value = state.form.deliveryFee;
  els.deliveryFeeWrap.classList.toggle("hidden", !state.form.deliveryEnabled);
  els.specialEventEnabled.checked = state.form.specialEventEnabled;
  els.specialEventWrap.classList.toggle("hidden", !state.form.specialEventEnabled);
  els.specialEventName.value = state.form.specialEventName;
  els.discountType.value = state.form.discountType;
  els.discountValue.value = state.form.discountValue;
  els.visibilityToggle.textContent = state.form.isOnline ? "⚡ Online" : "○ Offline";
  els.visibilityToggle.className = `action-button full-width ${state.form.isOnline ? "active" : ""}`;
  renderTemplateFields();
  renderPictures();
}

function renderStoreToolbar() {
  const filteredProducts = getFilteredProducts();
  const filteredIds = filteredProducts.map((product) => product.id);
  const allVisibleSelected = filteredIds.length > 0 && filteredIds.every((id) => state.selectedIds.includes(id));
  els.productsCount.textContent = String(state.products.length);
  els.totalStock.textContent = String(state.products.reduce((sum, product) => sum + (Number(product.stock) || 0), 0));
  els.selectedCount.textContent = String(state.selectedIds.length);
  els.selectVisibleIcon.className = `checkbox-icon ${allVisibleSelected ? "checked" : ""}`;
  els.selectVisibleIcon.textContent = allVisibleSelected ? "✓" : "";
  els.toggleImportPanelLabel.textContent = state.showImportPanel ? "Hide import" : "Import bundle JSON";
  els.importPanel.classList.toggle("hidden", !state.showImportPanel);
  els.importText.value = state.importText;
}

function actionButtonClass(type) {
  if (type === "danger") return "danger-button";
  if (type === "danger-soft") return "ghost-button danger-soft";
  if (type === "primary") return "primary-button";
  return "ghost-button";
}

function createBadge(text, type = "secondary") {
  const span = document.createElement("span");
  span.className = `badge ${type}`;
  span.textContent = text;
  return span;
}

function createButton({ text, className = "ghost-button", onClick, disabled = false, ariaLabel }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = text;
  if (ariaLabel) button.setAttribute("aria-label", ariaLabel);
  button.disabled = disabled;
  button.addEventListener("click", onClick);
  return button;
}

function renderStoreGrid() {
  const filteredProducts = getFilteredProducts();
  els.productsGrid.innerHTML = "";
  els.emptyState.classList.toggle("hidden", filteredProducts.length > 0);
  if (!filteredProducts.length) return;

  filteredProducts.forEach((product) => {
    const absoluteIndex = state.products.findIndex((item) => item.id === product.id);
    const ui = getCardUi(product.id);
    const price = computeFinalPrice(product);
    const firstPicture = product.pictures?.[0] || "https://placehold.co/900x900?text=No+Image";

    const card = document.createElement("div");
    card.className = "product-card";

    const topBar = document.createElement("div");
    topBar.className = "product-topbar";

    const selectLabel = document.createElement("label");
    selectLabel.className = "select-row";
    const selectCheckbox = document.createElement("input");
    selectCheckbox.type = "checkbox";
    selectCheckbox.checked = state.selectedIds.includes(product.id);
    selectCheckbox.addEventListener("change", (event) => toggleSelection(product.id, event.target.checked));
    selectLabel.appendChild(selectCheckbox);
    selectLabel.appendChild(document.createTextNode("Select"));
    topBar.appendChild(selectLabel);

    const moveRow = document.createElement("div");
    moveRow.className = "move-row";
    moveRow.appendChild(createButton({ text: "Top", className: "small-button", disabled: absoluteIndex <= 0, onClick: () => moveProductToTop(product.id) }));
    moveRow.appendChild(createButton({ text: "↑", className: "small-button", disabled: absoluteIndex <= 0, onClick: () => moveProductUp(product.id) }));
    moveRow.appendChild(createButton({ text: "↓", className: "small-button", disabled: absoluteIndex < 0 || absoluteIndex >= state.products.length - 1, onClick: () => moveProductDown(product.id) }));
    topBar.appendChild(moveRow);
    card.appendChild(topBar);

    const imageButton = document.createElement("button");
    imageButton.type = "button";
    imageButton.className = "product-image-button";
    imageButton.addEventListener("click", () => openProduct(product.id));
    imageButton.innerHTML = `<img class="product-main-image" src="${escapeAttribute(firstPicture)}" alt="${escapeAttribute(product.name)}">`;
    card.appendChild(imageButton);

    const content = document.createElement("div");
    content.className = "product-content";

    const titleButton = document.createElement("button");
    titleButton.type = "button";
    titleButton.className = "product-title-button";
    titleButton.addEventListener("click", () => openProduct(product.id));
    titleButton.innerHTML = `<h3 class="product-title">${escapeHtml(product.name)}</h3>`;
    content.appendChild(titleButton);

    const badgeRow = document.createElement("div");
    badgeRow.className = "badge-row";
    if (product.category) badgeRow.appendChild(createBadge(product.category, "secondary"));
    badgeRow.appendChild(createBadge(product.isOnline ? "Online" : "Offline", product.isOnline ? "primary" : "outline"));
    if (Number(product.stock) === 0) badgeRow.appendChild(createBadge("Out of stock", "danger"));
    if (product.specialEventEnabled) badgeRow.appendChild(createBadge(product.specialEventName || "Special Event", "primary"));
    content.appendChild(badgeRow);

    const priceStack = document.createElement("div");
    priceStack.className = "price-stack";
    if (product.specialEventEnabled && Number(product.discountValue) > 0) {
      priceStack.innerHTML += `<p class="price-line-through">${formatMoney(price.base)}</p>`;
      priceStack.innerHTML += `<p class="price-main">${formatMoney(price.discounted)}</p>`;
    } else {
      priceStack.innerHTML += `<p class="price-main">${formatMoney(price.base)}</p>`;
    }
    priceStack.innerHTML += `<p class="meta-line">${product.deliveryEnabled ? `Delivery: ${formatMoney(product.deliveryFee)} · Total: ${formatMoney(price.total)}` : "No delivery fee added"}</p>`;
    priceStack.innerHTML += `<p class="meta-line">Stock remaining: <strong>${Number(product.stock) || 0}</strong></p>`;
    priceStack.innerHTML += `<p class="meta-line">Delivery time: <strong>${escapeHtml(product.deliveryTimeExpectation || "Not specified")}</strong></p>`;
    content.appendChild(priceStack);

    const actions = document.createElement("div");
    actions.className = "product-actions";

    const row1 = document.createElement("div");
    row1.className = "two-col";
    row1.appendChild(createButton({ text: "⬇ Export", className: "ghost-button", onClick: () => exportOneProduct(product.id) }));
    row1.appendChild(createButton({ text: "+10 stock", className: "ghost-button", onClick: () => quickRestock(product.id, 10) }));
    actions.appendChild(row1);

    const row2 = document.createElement("div");
    row2.className = "two-col";
    row2.appendChild(createButton({ text: "+50 stock", className: "ghost-button", onClick: () => quickRestock(product.id, 50) }));
    row2.appendChild(
      createButton({
        text: ui.confirmOutOfStock ? "Confirm out of stock" : "Out of stock",
        className: ui.confirmOutOfStock ? "danger-button" : "ghost-button",
        onClick: () => {
          if (ui.confirmOutOfStock) {
            markOutOfStock(product.id);
            clearCardConfirms(product.id);
          } else {
            clearCardConfirms(product.id);
            getCardUi(product.id).confirmOutOfStock = true;
            renderStoreGrid();
          }
        }
      })
    );
    actions.appendChild(row2);

    actions.appendChild(
      createButton({
        text: ui.confirmToggle ? `Confirm ${product.isOnline ? "turn offline" : "turn online"}` : product.isOnline ? "⚡ Turn offline" : "○ Turn online",
        className: ui.confirmToggle ? "danger-button" : product.isOnline ? "primary-button" : "ghost-button",
        onClick: () => {
          if (ui.confirmToggle) {
            toggleProductOnline(product.id);
            clearCardConfirms(product.id);
          } else {
            clearCardConfirms(product.id);
            getCardUi(product.id).confirmToggle = true;
            renderStoreGrid();
          }
        }
      })
    );

    actions.appendChild(
      createButton({
        text: ui.confirmDelete ? "Confirm delete product" : "Delete product",
        className: "danger-button",
        onClick: () => {
          if (ui.confirmDelete) {
            removeProduct(product.id);
            clearCardConfirms(product.id);
          } else {
            clearCardConfirms(product.id);
            getCardUi(product.id).confirmDelete = true;
            renderStoreGrid();
          }
        }
      })
    );

    actions.appendChild(
      createButton({
        text: ui.confirmReAdd ? "Confirm re-add product" : "Re-add product",
        className: ui.confirmReAdd ? "danger-button" : "ghost-button",
        onClick: () => {
          if (ui.confirmReAdd) {
            loadProductIntoForm(product.id);
            clearCardConfirms(product.id);
          } else {
            clearCardConfirms(product.id);
            getCardUi(product.id).confirmReAdd = true;
            renderStoreGrid();
          }
        }
      })
    );

    content.appendChild(actions);

    if (ui.confirmDelete || ui.confirmToggle || ui.confirmReAdd || ui.confirmOutOfStock) {
      const hint = document.createElement("p");
      hint.className = "confirm-hint";
      hint.textContent = "Press the same button again to confirm this action.";
      content.appendChild(hint);
    }

    card.appendChild(content);
    els.productsGrid.appendChild(card);
  });
}

function renderModal() {
  const product = getSelectedProduct();
  if (!product) {
    els.modalBackdrop.classList.add("hidden");
    return;
  }
  const template = getTemplate(product.category);
  const price = computeFinalPrice(product);

  if (state.clientEditableField === "name") {
    els.modalNameWrap.innerHTML = `<input id="modal-name-input" type="text" value="${escapeAttribute(product.name)}">`;
    const input = $("modal-name-input");
    input.focus();
    input.select();
    input.addEventListener("input", (event) => updateSelectedProductField("name", event.target.value));
    input.addEventListener("blur", () => {
      state.clientEditableField = null;
      renderModal();
    });
  } else {
    els.modalNameWrap.innerHTML = `<h2 class="product-title">${escapeHtml(product.name)}</h2>`;
    els.modalNameWrap.firstElementChild.addEventListener("dblclick", () => {
      state.clientEditableField = "name";
      renderModal();
    });
  }

  els.modalMainImage.src = product.pictures?.[0] || "https://placehold.co/900x900?text=No+Image";
  els.modalMainImage.alt = product.name;

  els.modalThumbs.innerHTML = "";
  product.pictures.slice(1).forEach((picture, index) => {
    const image = document.createElement("img");
    image.src = picture;
    image.alt = `${product.name} ${index + 2}`;
    els.modalThumbs.appendChild(image);
  });

  els.modalBadges.innerHTML = "";
  if (product.category) els.modalBadges.appendChild(createBadge(product.category, "secondary"));
  els.modalBadges.appendChild(createBadge(product.isOnline ? "Online" : "Offline", product.isOnline ? "primary" : "outline"));
  if (Number(product.stock) === 0) els.modalBadges.appendChild(createBadge("Out of stock", "danger"));
  if (product.specialEventEnabled) els.modalBadges.appendChild(createBadge(product.specialEventName || "Special Event", "primary"));

  if (state.clientEditableField === "description") {
    els.modalDescriptionWrap.innerHTML = `<textarea id="modal-description-input" class="tall">${escapeHtml(product.description)}</textarea>`;
    const textarea = $("modal-description-input");
    textarea.focus();
    textarea.addEventListener("input", (event) => updateSelectedProductField("description", event.target.value));
    textarea.addEventListener("blur", () => {
      state.clientEditableField = null;
      renderModal();
    });
  } else {
    els.modalDescriptionWrap.innerHTML = `<p class="subtle" style="font-size:16px;line-height:1.75;color:#475569;">${escapeHtml(product.description)}</p>`;
    els.modalDescriptionWrap.firstElementChild.addEventListener("dblclick", () => {
      state.clientEditableField = "description";
      renderModal();
    });
  }

  const pricingParts = [];
  pricingParts.push(`<p class="subtle">Pricing</p>`);
  if (product.specialEventEnabled && Number(product.discountValue) > 0) {
    if (state.clientEditableField === "basePrice") {
      pricingParts.push(`<div class="modal-pricing-edit"><input id="modal-price-input" type="number" step="0.01" min="0" value="${escapeAttribute(product.basePrice)}"></div>`);
    } else {
      pricingParts.push(`<p class="price-line-through modal-price-trigger">${formatMoney(price.base)}</p>`);
    }
    pricingParts.push(`<p class="price-main">${formatMoney(price.discounted)}</p>`);
  } else if (state.clientEditableField === "basePrice") {
    pricingParts.push(`<div class="modal-pricing-edit"><input id="modal-price-input" type="number" step="0.01" min="0" value="${escapeAttribute(product.basePrice)}"></div>`);
  } else {
    pricingParts.push(`<p class="price-main modal-price-trigger">${formatMoney(price.base)}</p>`);
  }
  pricingParts.push(`<p class="meta-line">${product.deliveryEnabled ? `Delivery fee: ${formatMoney(product.deliveryFee)} · Total: ${formatMoney(price.total)}` : "Delivery fee not applied"}</p>`);
  pricingParts.push(`<p class="meta-line">Stock remaining: <strong>${Number(product.stock) || 0}</strong></p>`);
  pricingParts.push(`<p class="meta-line">Delivery time: <strong>${escapeHtml(product.deliveryTimeExpectation || "Not specified")}</strong></p>`);
  pricingParts.push(`<p class="meta-line">Visibility: <strong>${product.isOnline ? "Online" : "Offline"}</strong></p>`);
  els.modalPricing.innerHTML = pricingParts.join("");

  const modalPriceInput = $("modal-price-input");
  if (modalPriceInput) {
    modalPriceInput.focus();
    modalPriceInput.addEventListener("input", (event) => updateSelectedProductField("basePrice", event.target.value));
    modalPriceInput.addEventListener("blur", () => {
      state.clientEditableField = null;
      renderModal();
    });
  } else {
    const trigger = els.modalPricing.querySelector(".modal-price-trigger");
    if (trigger) {
      trigger.addEventListener("dblclick", () => {
        state.clientEditableField = "basePrice";
        renderModal();
      });
    }
  }

  els.modalDetails.innerHTML = "";

  const groups = [
    { key: "field1", label: template.clientLabels.field1, values: product.details?.field1 || [], selectedKey: "selectedField1" },
    { key: "field2", label: template.clientLabels.field2, values: product.details?.field2 || [], selectedKey: "selectedField2" },
    { key: "field3", label: template.clientLabels.field3, values: product.details?.field3 || [], selectedKey: null }
  ];

  groups.forEach((group) => {
    if (!group.values.length) return;
    const wrapper = document.createElement("div");
    wrapper.className = "option-group";
    wrapper.innerHTML = `<label>${escapeHtml(group.label)}</label>`;
    const row = document.createElement("div");
    row.className = group.key === "field3" ? "badge-row" : "option-buttons";

    group.values.forEach((value) => {
      if (group.key === "field3") {
        row.appendChild(createBadge(value, "secondary"));
      } else {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `option-pill ${state[group.selectedKey] === value ? "active" : ""}`;
        button.textContent = value;
        button.addEventListener("click", () => {
          state[group.selectedKey] = value;
          renderModal();
        });
        row.appendChild(button);
      }
    });

    wrapper.appendChild(row);
    els.modalDetails.appendChild(wrapper);
  });

  els.choiceSnapshot.innerHTML = `Current choice snapshot: ${escapeHtml(state.selectedField1 || "No first option selected")} · ${escapeHtml(state.selectedField2 || "No second option selected")}<br>These options are shown from the product JSON data added in the CMS form.`;
}

function renderStore() {
  renderStoreToolbar();
  renderStoreGrid();
  if (state.selectedProductId) renderModal();
}

function render() {
  renderForm();
  renderStore();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function wireEvents() {
  els.tabButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
  });

  els.form.addEventListener("submit", handleAddProduct);
  els.resetForm.addEventListener("click", resetForm);

  els.name.addEventListener("dblclick", () => {
    state.adminEditableField = "name";
    renderForm();
    els.name.focus();
  });
  els.name.addEventListener("blur", () => {
    if (state.adminEditableField === "name") {
      state.adminEditableField = null;
      renderForm();
    }
  });
  els.name.addEventListener("input", (event) => {
    state.form.name = event.target.value;
  });

  els.description.addEventListener("dblclick", () => {
    state.adminEditableField = "description";
    renderForm();
    els.description.focus();
  });
  els.description.addEventListener("blur", () => {
    if (state.adminEditableField === "description") {
      state.adminEditableField = null;
      renderForm();
    }
  });
  els.description.addEventListener("input", (event) => {
    state.form.description = event.target.value;
  });

  els.category.addEventListener("change", (event) => updateFormField("category", event.target.value));
  els.basePrice.addEventListener("input", (event) => updateFormField("basePrice", event.target.value));
  els.stock.addEventListener("input", (event) => updateFormField("stock", event.target.value));
  els.deliveryTimeExpectation.addEventListener("input", (event) => updateFormField("deliveryTimeExpectation", event.target.value));
  els.visibilityToggle.addEventListener("click", () => updateFormField("isOnline", !state.form.isOnline));
  els.deliveryEnabled.addEventListener("change", (event) => updateFormField("deliveryEnabled", event.target.checked));
  els.deliveryFee.addEventListener("input", (event) => updateFormField("deliveryFee", event.target.value));
  els.specialEventEnabled.addEventListener("change", (event) => updateFormField("specialEventEnabled", event.target.checked));
  els.specialEventName.addEventListener("input", (event) => updateFormField("specialEventName", event.target.value));
  els.discountType.addEventListener("change", (event) => updateFormField("discountType", event.target.value));
  els.discountValue.addEventListener("input", (event) => updateFormField("discountValue", event.target.value));
  els.addPictureField.addEventListener("click", addPictureField);
  els.detail1.addEventListener("input", (event) => updateFormField("details.field1", event.target.value));
  els.detail2.addEventListener("input", (event) => updateFormField("details.field2", event.target.value));
  els.detail3.addEventListener("input", (event) => updateFormField("details.field3", event.target.value));
  els.importFromAdmin.addEventListener("click", () => els.jsonFileInput.click());
  els.jsonFileInput.addEventListener("change", (event) => {
    importBundleFromFile(event.target.files?.[0]);
    event.target.value = "";
  });

  els.search.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderStore();
  });
  els.toggleSelectVisible.addEventListener("click", toggleSelectAllVisible);
  els.exportSelected.addEventListener("click", exportSelectedProducts);
  els.toggleImportPanel.addEventListener("click", () => {
    state.showImportPanel = !state.showImportPanel;
    renderStoreToolbar();
  });
  els.importText.addEventListener("input", (event) => {
    state.importText = event.target.value;
  });
  els.importNow.addEventListener("click", importBundleFromText);
  els.uploadJson.addEventListener("click", () => els.jsonFileInput.click());

  els.modalClose.addEventListener("click", closeModal);
  els.modalBackdrop.addEventListener("click", (event) => {
    if (event.target === els.modalBackdrop) closeModal();
  });
}

wireEvents();
render();
