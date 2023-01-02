import { Alert, AlertColor, AlertTitle, Snackbar, SnackbarOrigin } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';

// 本身需要集成
// 1. SnackBar的位置,显示时间等属性
// 2. Alert的 级别,色彩等属性
export interface ToastItemProps {
  uuid: string; // 用于在关闭时识别是哪个,使用index识别会混乱
  severity: AlertColor;
  content: string;
  title?: string;
  variant?: 'standard' | 'filled' | 'outlined';
  autoHideDuration?: number | null;
}
export function ToastItem({
  severity,
  content,
  title,
  variant = 'filled',
  autoHideDuration = 3000,
  onClose,
}: ToastItemProps & {
  onClose: () => void;
}) {
  const [open, setOpen] = useState(true);
  const closeOnTimeoutOnly = (event: SyntheticEvent<any, Event> | Event, reason: string) => {
    // 不知道为什么,在新的snackbar出现时,总会对前一个snackbar发出clickaway的事件
    // 因此要求snackbar本身对clickout不作响应
    if (reason === 'timeout') {
      setOpen(false);
    }
  };
  const manualClose = () => {
    setOpen(false);
  };

  // close只会关闭视图,并不会删除配置,因此要通知外部,删除配置
  useEffect(() => {
    if (!open) {
      onClose();
    }
  }, [open]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={closeOnTimeoutOnly}
      sx={{ position: 'unset' }}
    >
      {/* click的检测,交给Alert,Alert的关闭动作也是关闭snack */}
      <Alert variant={variant} severity={severity} onClose={manualClose}>
        <AlertTitle>{title}</AlertTitle>
        {content}
      </Alert>
    </Snackbar>
  );
}
