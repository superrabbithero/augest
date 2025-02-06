// toast.js
import { inject } from 'vue';

export function useToast() {
  const toast = inject('$toast');
  if (!toast) {
    console.warn('Toast plugin is not installed');
  }
  return toast;
}
