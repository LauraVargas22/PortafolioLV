export const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export const renderTagList = (items = []) =>
  items
    .map((item) => `<span class="tag">${escapeHtml(item)}</span>`)
    .join('');

export const renderBulletList = (items = []) =>
  items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
