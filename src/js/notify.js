import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
export function setNoticeMsg() {
  notice({
    text: 'No data for search',
    delay: 2000,
  });
}
