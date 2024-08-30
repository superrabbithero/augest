<!--
title:在edge WebView2中使用selenium测试
date:2024-08-30 05:39:14
tags: -selenium
-->

### 前言
在一个C#项目中嵌入了Edge WebView2作为界面，使用selenium进行自动化测试

### 使用
1. 首先设置WebView2启用的端口号
```cmd
setx WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS "--remote-debugging-port=9222"
```
其中9222为端口号，如果遇到占用冲突可另外自定义9223等  
2. 配置driver  
```python
# 创建 EdgeDriver 实例
options = webdriver.EdgeOptions()
options.debugger_address = "127.0.0.1:9222"  # 指定调试端口

# 创建一个 Chrome WebDriver 实例（如果使用 Edge，请将 webdriver.Chrome() 替换为 webdriver.Edge()）
driver = webdriver.Edge(options=options)
```
3. 可以通过`http://127.0.0.1:9222/json`来检查webView2是否正确启动