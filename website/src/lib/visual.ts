export function scrollToBottom(el: HTMLElement) {
  el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
}

export function scrollToTop(el: HTMLElement) {
  el.scrollTo({ top: 0, behavior: 'smooth' });
}
