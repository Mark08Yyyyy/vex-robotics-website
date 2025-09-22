# VEX机器人社团官方网站

🤖 现代化、响应式的VEX机器人社团展示平台

## ✨ 项目特色

### 🎨 设计风格
- **苹果官网风格**：极简主义界面，大量留白设计
- **流畅动画**：页面滚动渐入效果、悬停交互动画
- **深色模式**：支持自动切换深色/浅色主题
- **响应式设计**：完美适配手机、平板、电脑等所有设备

### 🔐 权限管理
- **三级权限体系**：管理员/成员/访客分级管理
- **安全认证**：本地存储用户会话，权限验证
- **角色控制**：不同角色访问不同功能模块

### 📝 内容管理
- **图文上传**：支持批量上传照片、编辑文字内容
- **内容分类**：按活动、成员、成果等维度分类管理
- **草稿预览**：编辑时可预览效果，支持定时发布
- **媒体库**：统一管理所有图片、视频等媒体资源

### 🌐 云端部署
- **免本地部署**：基于Vercel云服务，无需自建服务器
- **全球访问**：CDN加速，确保全球实时访问
- **自动备份**：云端数据同步，内容永久保存

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/vex-robotics-club/website.git
cd website/frontend

# 启动本地服务器
npm run dev
# 或者使用Python
python3 -m http.server 8000

# 访问网站
open http://localhost:8000
```

### 演示账号

| 角色 | 用户名 | 密码 | 权限说明 |
|------|--------|------|----------|
| 👑 管理员 | `admin` | `admin123` | 完全访问权限，可管理所有内容 |
| 👥 成员 | `member` | `member123` | 内容编辑权限，可发布文章和管理媒体 |
| 👤 访客 | `guest` | `guest123` | 浏览和留言权限 |

## 📁 项目结构

```
frontend/
├── index.html          # 主页面
├── admin.html          # 管理后台
├── login.html          # 登录页面
├── package.json        # 项目配置
├── vercel.json         # Vercel部署配置
└── README.md           # 项目说明
```

## 🛠️ 技术栈

- **前端框架**：原生HTML5 + CSS3 + JavaScript ES6+
- **UI框架**：Tailwind CSS（通过CDN引入）
- **部署平台**：Vercel / Netlify
- **版本控制**：Git + GitHub
- **开发工具**：现代浏览器开发者工具

## 🌐 部署指南

### Vercel部署（推荐）

1. **连接GitHub**
   ```bash
   # 推送代码到GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Vercel配置**
   - 访问 [vercel.com](https://vercel.com)
   - 导入GitHub仓库
   - 选择 `frontend` 目录作为根目录
   - 自动检测并部署

3. **自定义域名**（可选）
   - 在Vercel控制台添加自定义域名
   - 配置DNS记录指向Vercel

### Netlify部署

1. **拖拽部署**
   - 访问 [netlify.com](https://netlify.com)
   - 直接拖拽 `frontend` 文件夹到部署区域

2. **Git集成**
   - 连接GitHub仓库
   - 设置构建目录为 `frontend`
   - 自动部署

## 📱 功能模块

### 🏠 主页面 (`index.html`)
- Hero区域：社团介绍和核心价值展示
- 关于我们：社团历史、使命和愿景
- 活动展示：最新活动和竞赛成果
- 团队成员：核心成员介绍
- 联系我们：联系方式和加入方式

### 🔐 登录系统 (`login.html`)
- 角色选择：管理员/成员/访客
- 用户认证：用户名密码验证
- 注册申请：新用户注册流程
- 权限控制：基于角色的访问控制

### 📊 管理后台 (`admin.html`)
- 仪表盘：数据统计和快速操作
- 内容管理：文章发布、编辑、分类
- 媒体库：图片视频批量上传管理
- 成员管理：团队成员信息维护
- 活动管理：活动创建和报名管理
- 留言管理：用户留言审核和回复
- 系统设置：网站基础配置

## 🎯 使用指南

### 管理员操作
1. 使用管理员账号登录
2. 进入管理后台
3. 发布文章、上传图片
4. 管理用户权限
5. 审核留言评论

### 成员操作
1. 使用成员账号登录
2. 访问内容管理功能
3. 发布活动报道
4. 上传活动照片
5. 更新个人信息

### 访客操作
1. 浏览网站内容
2. 查看活动信息
3. 留言评论
4. 申请加入社团

## 🔧 自定义配置

### 主题颜色
在CSS中修改主题色：
```css
:root {
  --primary-color: #007AFF;  /* 主色调 */
  --secondary-color: #5856D6; /* 辅助色 */
}
```

### 社团信息
在HTML中更新社团信息：
- 社团名称
- 联系方式
- 社交媒体链接
- 活动时间地点

## 📈 SEO优化

- ✅ 语义化HTML结构
- ✅ Meta标签优化
- ✅ Open Graph标签
- ✅ 响应式设计
- ✅ 快速加载速度
- ✅ 移动端友好

## 🔒 安全特性

- **XSS防护**：内容安全策略
- **CSRF防护**：请求验证
- **权限验证**：角色基础访问控制
- **数据验证**：输入内容过滤
- **HTTPS强制**：安全传输协议

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

## 📞 联系我们

- **官网**：https://vexrobotics.club
- **邮箱**：contact@vexrobotics.club
- **GitHub**：https://github.com/vex-robotics-club
- **微信群**：扫描二维码加入

---

**VEX机器人社团** - 让创新成为习惯，让技术改变世界 🚀