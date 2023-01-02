import { Stack } from '@mui/material';
import { useState, Ref, forwardRef, useImperativeHandle } from 'react';
import { ToastItem, ToastItemProps } from './ToastItem';

// 此处声明要暴露的pushOne方法
export interface IToastContainer {
  pushOne: (newToast: ToastItemProps) => {};
}

// 外部需要使用 toastContainerObject.pushOne来调用,因此不得不生成ref
// 尽管通常需要将ref挂载内部的某个组件上
// 但不挂也是可以的
export const ToastContainer = forwardRef((props: {}, ref: Ref<any>) => {
  const [toasts, setToasts] = useState<ToastItemProps[]>([]);

  function pushOne(newToast: ToastItemProps) {
    setToasts(toasts.concat(newToast));
  }

  function removeByUUID(uuid: string) {
    setToasts(toasts.filter(toast => toast.uuid !== uuid));
  }

  // 此处将要暴露的pushOne方法关联到ref上,react就是麻烦
  useImperativeHandle(ref, () => ({
    pushOne,
  }));

  return (
    <Stack sx={{ position: 'fixed', left: 'auto', right: '24px', top: '24px' }}>
      {[...toasts].reverse().map((toast, index) => (
        <ToastItem key={toast.uuid} {...toast} onClose={() => removeByUUID(toast.uuid)} />
      ))}
    </Stack>
  );
});
