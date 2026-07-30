# ChatGPT 柔和深色背景

这是一个适用于 Microsoft Edge 的轻量扩展，用来把 `chatgpt.com`
原本接近纯黑的深色背景修改为更柔和的：

```text
rgb(36, 36, 36)
#242424
```

扩展只向 `chatgpt.com` 注入一份 CSS，不收集数据，不发送网络请求，
也不需要后台进程。

## 文件结构

```text
ChatGPT-Theme/
├── manifest.json
├── README.md
└── styles/
    └── chatgpt-theme.css
```

## 在 Microsoft Edge 中安装

1. 打开本仓库的 GitHub 页面。
2. 点击绿色的 **Code** 按钮，再点击 **Download ZIP**。
3. 下载完成后，右键 ZIP 文件并选择 **全部解压缩**。
4. 在 Edge 地址栏输入 `edge://extensions/` 并回车。
5. 打开页面左侧的 **开发人员模式**。
6. 点击 **加载解压缩的扩展**。
7. 选择刚才解压得到的 `ChatGPT-Theme-main` 文件夹。应当选择其中直接包含
   `manifest.json` 的那一层文件夹。
8. 打开或返回 `https://chatgpt.com/`。
9. 刷新 ChatGPT 页面，背景就会变成 `rgb(36, 36, 36)`。

## 更新扩展

1. 下载仓库的最新 ZIP 并重新解压。
2. 用新文件替换原来的扩展文件夹。
3. 打开 `edge://extensions/`。
4. 在“ChatGPT 柔和深色背景”扩展卡片中点击 **重新加载**。
5. 刷新 `chatgpt.com`。

## 暂时停用或删除

打开 `edge://extensions/`，找到“ChatGPT 柔和深色背景”：

- 关闭开关：暂时停用。
- 点击 **删除**：从 Edge 中移除。

## 常见问题

### 安装后颜色没有变化

依次检查：

1. 当前网址是否以 `https://chatgpt.com/` 开头。
2. 扩展是否已经启用。
3. 是否在安装扩展后刷新了 ChatGPT 页面。
4. 加载的文件夹内是否直接包含 `manifest.json`。

如果 ChatGPT 页面长时间没有刷新，可以按 `Ctrl+Shift+R` 强制刷新。

### 会影响其他网站吗？

不会。扩展只匹配 `chatgpt.com`，不会在其他网站运行。

### 如何修改成其他颜色？

打开 `styles/chatgpt-theme.css`，修改这一行：

```css
--chatgpt-theme-background: rgb(36, 36, 36);
```

保存后，在 `edge://extensions/` 中重新加载扩展，再刷新 ChatGPT 页面。
