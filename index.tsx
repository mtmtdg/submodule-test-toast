import { AlertColor, SnackbarOrigin } from '@mui/material';
import { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { IToastContainer, ToastContainer } from './ToastContainer';

const toastContainerDiv = document.createElement('div');
document.body.appendChild(toastContainerDiv);
const containerRoot = createRoot(toastContainerDiv);
const containerRef = createRef<IToastContainer>();
containerRoot.render(<ToastContainer ref={containerRef} />);

interface ToastConfig {
  autoHideDuration?: number | null /* null表示不关闭 */;
  anchorOrigin?: SnackbarOrigin;
}

function info(content: string, title?: string, config?: ToastConfig) {
  pushOne('info', content, title, config);
}

function success(content: string, title?: string, config?: ToastConfig) {
  pushOne('success', content, title, config);
}

function pushOne(severity: AlertColor, content: string, title?: string, config?: ToastConfig) {
  containerRef.current?.pushOne({ uuid: uuid(), severity, content, title, ...config });
}

export const ToastService = {
  info,
  success,
};

function uuid() {
  let uuidValue = '',
    k,
    randomValue;
  for (k = 0; k < 32; k++) {
    randomValue = (Math.random() * 16) | 0;

    if (k === 8 || k === 12 || k === 16 || k === 20) {
      uuidValue += '-';
    }
    uuidValue += (k === 12 ? 4 : k === 16 ? (randomValue & 3) | 8 : randomValue).toString(16);
  }
  return uuidValue;
}
