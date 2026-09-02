import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { msgBus } from '@/micro/messageBus';

interface NoticeItem {
  type: string;
  message: any;
  time: string;
  source?: string;
  sessionKeys?: string;
  timestamp: number;
  read: boolean;
}

export const useNoticeStore = defineStore('notice', () => {
  const notices = ref<NoticeItem[]>([]);

  // 未读消息数
  const unreadCount = computed(() => notices.value.filter((n) => !n.read).length);

  // 是否有未读消息（用于图标闪烁）
  const hasUnread = computed(() => unreadCount.value > 0);

  // 新增消息
  const addNotice = (notice: Partial<NoticeItem>) => {
    notices.value.unshift({
      type: notice.type ?? '',
      message: notice.message ?? '',
      time: notice.time ?? new Date().toLocaleString(),
      source: notice.source,
      sessionKeys: notice.sessionKeys,
      timestamp: notice.timestamp ?? Date.now(),
      read: false
    });
  };

  // 全部已读
  const readAll = () => {
    notices.value.forEach((n) => (n.read = true));
  };

  // 单条已读
  const readOne = (index: number) => {
    if (notices.value[index]) {
      notices.value[index].read = true;
    }
  };

  // 监听消息总线，收到推送时写入 store（集中管理，供多模块共享）
  msgBus.on('ws:system/sysNotice', (data: any) => {
    if (typeof data === 'string') {
      addNotice({ type: 'system/sysNotice', message: data });
    } else {
      addNotice({
        type: data?.type ?? 'system/sysNotice',
        message: data?.message ?? JSON.stringify(data),
        source: data?.source,
        sessionKeys: data?.sessionKeys,
        timestamp: data?.timestamp
      });
    }
  });

  return {
    notices,
    unreadCount,
    hasUnread,
    addNotice,
    readAll,
    readOne
  };
});
