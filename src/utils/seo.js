/**
 * SEO优化工具
 * 包含元标签管理、结构化数据、性能优化等功能
 */

// SEO配置
const SEO_CONFIG = {
    site: {
        name: 'VEX机器人社团',
        description: '专业的VEX机器人竞赛团队，致力于培养学生的工程思维和创新能力',
        url: 'https://vexrobotics.com',
        logo: '/images/logo.png',
        language: 'zh-CN',
        locale: 'zh_CN',
        type: 'website'
    },
    social: {
        twitter: '@vexrobotics',
        facebook: 'vexrobotics',
        instagram: 'vexrobotics',
        youtube: 'vexrobotics'
    },
    contact: {
        email: 'contact@vexrobotics.com',
        phone: '+86-123-4567-8900',
        address: '北京市海淀区中关村大街1号'
    },
    analytics: {
        googleAnalytics: 'G-XXXXXXXXXX',
        baiduAnalytics: 'xxxxxxxxxxxxxxxx'
    }
};

class SEOManager {
    constructor() {
        this.currentPage = null;
        this.structuredData = [];
        this.init();
    }
    
    init() {
        this.setupBasicMeta();
        this.setupAnalytics();
        this.setupStructuredData();
        this.optimizeImages();
        this.setupSitemap();
    }
    
    // 设置基础元标签
    setupBasicMeta() {
        // 基础meta标签
        this.setMeta('charset', 'UTF-8');
        this.setMeta('viewport', 'width=device-width, initial-scale=1.0');
        this.setMeta('description', SEO_CONFIG.site.description);
        this.setMeta('keywords', 'VEX机器人,机器人竞赛,STEM教育,工程教育,创新教育');
        this.setMeta('author', SEO_CONFIG.site.name);
        this.setMeta('robots', 'index, follow');
        this.setMeta('language', SEO_CONFIG.site.language);
        
        // Open Graph标签
        this.setMeta('og:type', SEO_CONFIG.site.type);
        this.setMeta('og:site_name', SEO_CONFIG.site.name);
        this.setMeta('og:url', SEO_CONFIG.site.url);
        this.setMeta('og:title', SEO_CONFIG.site.name);
        this.setMeta('og:description', SEO_CONFIG.site.description);
        this.setMeta('og:image', SEO_CONFIG.site.url + SEO_CONFIG.site.logo);
        this.setMeta('og:locale', SEO_CONFIG.site.locale);
        
        // Twitter Card标签
        this.setMeta('twitter:card', 'summary_large_image');
        this.setMeta('twitter:site', SEO_CONFIG.social.twitter);
        this.setMeta('twitter:title', SEO_CONFIG.site.name);
        this.setMeta('twitter:description', SEO_CONFIG.site.description);
        this.setMeta('twitter:image', SEO_CONFIG.site.url + SEO_CONFIG.site.logo);
        
        // 移动端优化
        this.setMeta('mobile-web-app-capable', 'yes');
        this.setMeta('apple-mobile-web-app-capable', 'yes');
        this.setMeta('apple-mobile-web-app-status-bar-style', 'default');
        this.setMeta('apple-mobile-web-app-title', SEO_CONFIG.site.name);
        
        // 主题颜色
        this.setMeta('theme-color', '#007AFF');
        this.setMeta('msapplication-TileColor', '#007AFF');
        
        // 图标链接
        this.setLink('icon', '/favicon.ico');
        this.setLink('apple-touch-icon', '/images/apple-touch-icon.png');
        this.setLink('manifest', '/manifest.json');
    }
    
    // 设置页面特定的SEO信息
    setPageSEO(pageData) {
        const {
            title,
            description,
            keywords,
            image,
            url,
            type = 'website',
            publishedTime,
            modifiedTime,
            author,
            section
        } = pageData;
        
        this.currentPage = pageData;
        
        // 更新标题
        document.title = title ? `${title} - ${SEO_CONFIG.site.name}` : SEO_CONFIG.site.name;
        
        // 更新描述
        if (description) {
            this.setMeta('description', description);
            this.setMeta('og:description', description);
            this.setMeta('twitter:description', description);
        }
        
        // 更新关键词
        if (keywords) {
            this.setMeta('keywords', keywords);
        }
        
        // 更新URL
        if (url) {
            this.setMeta('og:url', SEO_CONFIG.site.url + url);
            this.setLink('canonical', SEO_CONFIG.site.url + url);
        }
        
        // 更新图片
        if (image) {
            const imageUrl = image.startsWith('http') ? image : SEO_CONFIG.site.url + image;
            this.setMeta('og:image', imageUrl);
            this.setMeta('twitter:image', imageUrl);
        }
        
        // 更新类型
        this.setMeta('og:type', type);
        
        // 文章特定标签
        if (type === 'article') {
            if (publishedTime) {
                this.setMeta('article:published_time', publishedTime);
            }
            if (modifiedTime) {
                this.setMeta('article:modified_time', modifiedTime);
            }
            if (author) {
                this.setMeta('article:author', author);
            }
            if (section) {
                this.setMeta('article:section', section);
            }
        }
        
        // 更新结构化数据
        this.updateStructuredData(pageData);
    }
    
    // 设置meta标签
    setMeta(name, content) {
        let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        
        if (!meta) {
            meta = document.createElement('meta');
            if (name.startsWith('og:') || name.startsWith('article:')) {
                meta.setAttribute('property', name);
            } else {
                meta.setAttribute('name', name);
            }
            document.head.appendChild(meta);
        }
        
        meta.setAttribute('content', content);
    }
    
    // 设置link标签
    setLink(rel, href, attributes = {}) {
        let link = document.querySelector(`link[rel="${rel}"]`);
        
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', rel);
            document.head.appendChild(link);
        }
        
        link.setAttribute('href', href);
        
        // 设置额外属性
        Object.entries(attributes).forEach(([key, value]) => {
            link.setAttribute(key, value);
        });
    }
    
    // 设置分析工具
    setupAnalytics() {
        // Google Analytics
        if (SEO_CONFIG.analytics.googleAnalytics) {
            this.loadGoogleAnalytics(SEO_CONFIG.analytics.googleAnalytics);
        }
        
        // 百度统计
        if (SEO_CONFIG.analytics.baiduAnalytics) {
            this.loadBaiduAnalytics(SEO_CONFIG.analytics.baiduAnalytics);
        }
    }
    
    // 加载Google Analytics
    loadGoogleAnalytics(trackingId) {
        // gtag脚本
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
        document.head.appendChild(gtagScript);
        
        // gtag配置
        const configScript = document.createElement('script');
        configScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}');
        `;
        document.head.appendChild(configScript);
    }
    
    // 加载百度统计
    loadBaiduAnalytics(siteId) {
        const script = document.createElement('script');
        script.innerHTML = `
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?${siteId}";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        `;
        document.head.appendChild(script);
    }
    
    // 设置结构化数据
    setupStructuredData() {
        // 组织信息
        this.addStructuredData({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': SEO_CONFIG.site.name,
            'description': SEO_CONFIG.site.description,
            'url': SEO_CONFIG.site.url,
            'logo': SEO_CONFIG.site.url + SEO_CONFIG.site.logo,
            'contactPoint': {
                '@type': 'ContactPoint',
                'telephone': SEO_CONFIG.contact.phone,
                'contactType': 'customer service',
                'email': SEO_CONFIG.contact.email
            },
            'address': {
                '@type': 'PostalAddress',
                'addressLocality': '北京',
                'addressRegion': '北京市',
                'addressCountry': 'CN',
                'streetAddress': SEO_CONFIG.contact.address
            },
            'sameAs': [
                `https://twitter.com/${SEO_CONFIG.social.twitter.replace('@', '')}`,
                `https://facebook.com/${SEO_CONFIG.social.facebook}`,
                `https://instagram.com/${SEO_CONFIG.social.instagram}`,
                `https://youtube.com/c/${SEO_CONFIG.social.youtube}`
            ]
        });
        
        // 网站信息
        this.addStructuredData({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': SEO_CONFIG.site.name,
            'description': SEO_CONFIG.site.description,
            'url': SEO_CONFIG.site.url,
            'potentialAction': {
                '@type': 'SearchAction',
                'target': SEO_CONFIG.site.url + '/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
            }
        });
    }
    
    // 添加结构化数据
    addStructuredData(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
        
        this.structuredData.push(data);
    }
    
    // 更新页面结构化数据
    updateStructuredData(pageData) {
        const { title, description, image, url, type, publishedTime, author } = pageData;
        
        if (type === 'article') {
            this.addStructuredData({
                '@context': 'https://schema.org',
                '@type': 'Article',
                'headline': title,
                'description': description,
                'image': image ? (image.startsWith('http') ? image : SEO_CONFIG.site.url + image) : null,
                'url': SEO_CONFIG.site.url + url,
                'datePublished': publishedTime,
                'author': {
                    '@type': 'Person',
                    'name': author || SEO_CONFIG.site.name
                },
                'publisher': {
                    '@type': 'Organization',
                    'name': SEO_CONFIG.site.name,
                    'logo': {
                        '@type': 'ImageObject',
                        'url': SEO_CONFIG.site.url + SEO_CONFIG.site.logo
                    }
                }
            });
        }
    }
    
    // 优化图片
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // 添加alt属性（如果没有）
            if (!img.alt) {
                const src = img.src || img.dataset.src;
                if (src) {
                    const filename = src.split('/').pop().split('.')[0];
                    img.alt = filename.replace(/[-_]/g, ' ');
                }
            }
            
            // 添加loading="lazy"（如果支持）
            if ('loading' in HTMLImageElement.prototype && !img.loading) {
                img.loading = 'lazy';
            }
            
            // 添加decoding="async"
            if (!img.decoding) {
                img.decoding = 'async';
            }
        });
    }
    
    // 生成站点地图
    setupSitemap() {
        const pages = [
            { url: '/', priority: 1.0, changefreq: 'daily' },
            { url: '/about', priority: 0.8, changefreq: 'monthly' },
            { url: '/activities', priority: 0.9, changefreq: 'weekly' },
            { url: '/team', priority: 0.7, changefreq: 'monthly' },
            { url: '/contact', priority: 0.6, changefreq: 'monthly' },
            { url: '/resources', priority: 0.8, changefreq: 'weekly' },
            { url: '/events', priority: 0.9, changefreq: 'weekly' }
        ];
        
        this.generateSitemap(pages);
    }
    
    // 生成XML站点地图
    generateSitemap(pages) {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
    <url>
        <loc>${SEO_CONFIG.site.url}${page.url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('')}
</urlset>`;
        
        // 存储站点地图（实际项目中应该保存到服务器）
        console.log('Generated sitemap:', sitemap);
        
        return sitemap;
    }
    
    // 生成robots.txt
    generateRobotsTxt() {
        const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SEO_CONFIG.site.url}/sitemap.xml`;
        
        console.log('Generated robots.txt:', robotsTxt);
        return robotsTxt;
    }
    
    // 页面性能优化
    optimizePerformance() {
        // 预连接到外部域名
        this.preconnect([
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://www.google-analytics.com',
            'https://hm.baidu.com'
        ]);
        
        // DNS预取
        this.dnsPrefetch([
            'https://cdn.jsdelivr.net',
            'https://unpkg.com'
        ]);
        
        // 关键资源预加载
        this.preloadCriticalResources();
    }
    
    // 预连接
    preconnect(urls) {
        urls.forEach(url => {
            this.setLink('preconnect', url, { crossorigin: 'anonymous' });
        });
    }
    
    // DNS预取
    dnsPrefetch(urls) {
        urls.forEach(url => {
            this.setLink('dns-prefetch', url);
        });
    }
    
    // 预加载关键资源
    preloadCriticalResources() {
        const criticalResources = [
            { href: '/css/critical.css', as: 'style' },
            { href: '/js/critical.js', as: 'script' },
            { href: '/fonts/main.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
        ];
        
        criticalResources.forEach(resource => {
            this.setLink('preload', resource.href, {
                as: resource.as,
                type: resource.type,
                crossorigin: resource.crossorigin
            });
        });
    }
    
    // 跟踪页面浏览
    trackPageView(url, title) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('config', SEO_CONFIG.analytics.googleAnalytics, {
                page_path: url,
                page_title: title
            });
        }
        
        // 百度统计
        if (typeof _hmt !== 'undefined') {
            _hmt.push(['_trackPageview', url]);
        }
    }
    
    // 跟踪事件
    trackEvent(action, category, label, value) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
        
        // 百度统计
        if (typeof _hmt !== 'undefined') {
            _hmt.push(['_trackEvent', category, action, label, value]);
        }
    }
    
    // 获取SEO分数
    getSEOScore() {
        const checks = {
            title: !!document.title && document.title.length > 0 && document.title.length <= 60,
            description: !!document.querySelector('meta[name="description"]')?.content && 
                        document.querySelector('meta[name="description"]').content.length <= 160,
            h1: document.querySelectorAll('h1').length === 1,
            images: Array.from(document.querySelectorAll('img')).every(img => img.alt),
            internalLinks: document.querySelectorAll('a[href^="/"], a[href^="#"]').length > 0,
            structuredData: this.structuredData.length > 0,
            canonical: !!document.querySelector('link[rel="canonical"]'),
            openGraph: !!document.querySelector('meta[property="og:title"]'),
            twitterCard: !!document.querySelector('meta[name="twitter:card"]'),
            viewport: !!document.querySelector('meta[name="viewport"]')
        };
        
        const passedChecks = Object.values(checks).filter(Boolean).length;
        const totalChecks = Object.keys(checks).length;
        const score = Math.round((passedChecks / totalChecks) * 100);
        
        return {
            score,
            checks,
            recommendations: this.getSEORecommendations(checks)
        };
    }
    
    // 获取SEO建议
    getSEORecommendations(checks) {
        const recommendations = [];
        
        if (!checks.title) {
            recommendations.push('添加页面标题，长度控制在60字符以内');
        }
        
        if (!checks.description) {
            recommendations.push('添加页面描述，长度控制在160字符以内');
        }
        
        if (!checks.h1) {
            recommendations.push('确保页面有且仅有一个H1标签');
        }
        
        if (!checks.images) {
            recommendations.push('为所有图片添加alt属性');
        }
        
        if (!checks.canonical) {
            recommendations.push('添加canonical链接');
        }
        
        if (!checks.openGraph) {
            recommendations.push('添加Open Graph标签');
        }
        
        if (!checks.structuredData) {
            recommendations.push('添加结构化数据');
        }
        
        return recommendations;
    }
}

// 创建全局实例
const seoManager = new SEOManager();

// 导出
export {
    SEOManager,
    seoManager,
    SEO_CONFIG
};

export default seoManager;