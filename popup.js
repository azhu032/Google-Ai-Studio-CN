document.addEventListener('DOMContentLoaded', () => {
  const translateSwitch = document.getElementById('translateSwitch');
  const statusText = document.getElementById('statusText');

  // 从存储中获取初始状态
  chrome.storage.sync.get(['enabled'], (result) => {
    translateSwitch.checked = !!result.enabled;
    updateLabel(result.enabled);
  });

  // 监听开关切换
  translateSwitch.addEventListener('change', () => {
    const isEnabled = translateSwitch.checked;
    chrome.storage.sync.set({ enabled: isEnabled });
    updateLabel(isEnabled);
  });

  function updateLabel(isEnabled) {
    statusText.textContent = isEnabled ? '已开启' : '已关闭';
  }
});
