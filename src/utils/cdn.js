/**
 * CDN配置和优化工具
 * 支持多CDN提供商、智能路由、缓存优化等功能
 */

// CDN配置
const CDN_CONFIG = {
    // 主CDN (Cloudflare)
    primary: {
        name: 'cloudflare',
        baseUrl: 'https://cdn.vexrobotics.com',
        regions: ['global'],
        priority: 1
    },
    
    // 备用CDN (AWS CloudFront)
    secondary: {
        name: 'cloudfront',
        baseUrl: 'https://d1234567890.cloudfront.net',
        regions: ['us', 'eu', 'ap'],
        priority: 2
    },
    
    // 中国大陆CDN (阿里云)
    china: {
        name: 'aliyun',
        baseUrl: 'https://vex-robotics.oss-cn-beijing.aliyuncs.com',
        regions: ['cn'],
        priority: 1
    }
};

// 资源类型配置
const RESOURCE_CONFIG = {
    images: {
        extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
        cacheTTL: 86400 * 30, // 30天
        compression: true,
        lazyLoad: true
    },
    videos: {
        extensions: ['.mp4', '.webm', '.ogg'],
        cacheTTL: 86400 * 7, // 7天
        compression: true,
        lazyLoad: true
    },
    scripts: {
        extensions: ['.js', '.mjs'],
        cacheTTL: 86400 * 7, // 7天
        compression: true,
        minify: true
    },
    styles: {
        extensions: ['.css'],
        cacheTTL: 86400 * 7, // 7天
        compression: true,
        minify: true
    },
    fonts: {
        extensions: ['.woff', '.woff2', '.ttf', '.otf'],
        cacheTTL: 86400 * 365, // 1年
        compression: false
    },
    documents: {
        extensions: ['.pdf', '.doc', '.docx', '.ppt', '.pptx'],
        cacheTTL: 86400 * 30, // 30天
        compression: true
    }
};

class CDNManager {
    constructor() {
        this.currentCDN = null;
        this.userRegion = null;
        this.performanceData = new Map();
        this.init();
    }
    
    async init() {
        await this.detectUserRegion();
        await this.selectOptimalCDN();
        this.setupPerformanceMonitoring();
        this.preloadCriticalResources();
    }
    
    // 检测用户地理位置
    async detectUserRegion() {
        try {
            // 尝试通过IP地理位置API检测
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            if (data.country_code === 'CN') {
                this.userRegion = 'cn';
            } else if (['US', 'CA', 'MX'].includes(data.country_code)) {
                this.userRegion = 'us';
            } else if (['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI'].includes(data.country_code)) {
                this.userRegion = 'eu';
            } else if (['JP', 'KR', 'SG', 'AU', 'IN', 'TH', 'MY', 'ID', 'PH', 'VN'].includes(data.country_code)) {
                this.userRegion = 'ap';
            } else {
                this.userRegion = 'global';
            }
            
            console.log(`检测到用户区域: ${this.userRegion} (${data.country})`);
        } catch (error) {
            console.warn('无法检测用户区域，使用默认配置:', error);
            this.userRegion = 'global';
        }
    }
    
    // 选择最优CDN
    async selectOptimalCDN() {
        const availableCDNs = Object.values(CDN_CONFIG).filter(cdn => 
            cdn.regions.includes(this.userRegion) || cdn.regions.includes('global')
        );
        
        // 按优先级排序
        availableCDNs.sort((a, b) => a.priority - b.priority);
        
        // 测试CDN性能
        let bestCDN = availableCDNs[0];
        let bestLatency = Infinity;
        
        for (const cdn of availableCDNs.slice(0, 2)) { // 只测试前2个CDN
            try {
                const latency = await this.testCDNLatency(cdn);
                if (latency < bestLatency) {
                    bestLatency = latency;
                    bestCDN = cdn;
                }
            } catch (error) {
                console.warn(`CDN ${cdn.name} 测试失败:`, error);
            }
        }
        
        this.currentCDN = bestCDN;
        console.log(`选择CDN: ${bestCDN.name} (延迟: ${bestLatency}ms)`);
    }
    
    // 测试CDN延迟
    async testCDNLatency(cdn) {
        const startTime = performance.now();
        
        try {
            // 测试一个小文件的加载时间
            const testUrl = `${cdn.baseUrl}/ping.txt?t=${Date.now()}`;
            const response = await fetch(testUrl, {
                method: 'HEAD',
                cache: 'no-cache'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const endTime = performance.now();
            return endTime - startTime;
        } catch (error) {
            throw new Error(`CDN测试失败: ${error.message}`);
        }
    }
    
    // 获取资源URL
    getResourceUrl(path, options = {}) {
        if (!this.currentCDN) {
            return path; // 回退到原始路径
        }
        
        const {
            version = null,
            format = null,
            quality = null,
            width = null,
            height = null
        } = options;
        
        let url = `${this.currentCDN.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
        
        // 添加查询参数
        const params = new URLSearchParams();
        
        if (version) params.append('v', version);
        if (format) params.append('f', format);
        if (quality) params.append('q', quality);
        if (width) params.append('w', width);
        if (height) params.append('h', height);
        
        const queryString = params.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
        
        return url;
    }
    
    // 获取优化的图片URL
    getOptimizedImageUrl(path, options = {}) {
        const {
            width = null,
            height = null,
            quality = 85,
            format = 'auto'
        } = options;
        
        return this.getResourceUrl(path, {
            format,
            quality,
            width,
            height
        });
    }
    
    // 预加载关键资源
    preloadCriticalResources() {
        const criticalResources = [
            '/css/main.css',
            '/js/main.js',
            '/fonts/inter-var.woff2'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = this.getResourceUrl(resource);
            
            // 设置资源类型
            if (resource.endsWith('.css')) {
                link.as = 'style';
            } else if (resource.endsWith('.js')) {
                link.as = 'script';
            } else if (resource.match(/\.(woff|woff2|ttf|otf)$/)) {
                link.as = 'font';
                link.crossOrigin = 'anonymous';
            } else if (resource.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
                link.as = 'image';
            }
            
            document.head.appendChild(link);
        });
    }
    
    // 设置性能监控
    setupPerformanceMonitoring() {
        // 监控资源加载性能
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.name.includes(this.currentCDN.baseUrl)) {
                        this.recordPerformanceData(entry);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
        }
        
        // 定期发送性能数据
        setInterval(() => {
            this.sendPerformanceData();
        }, 60000); // 每分钟发送一次
    }
    
    // 记录性能数据
    recordPerformanceData(entry) {
        const resourceType = this.getResourceType(entry.name);
        
        if (!this.performanceData.has(resourceType)) {
            this.performanceData.set(resourceType, []);
        }
        
        this.performanceData.get(resourceType).push({
            url: entry.name,
            duration: entry.duration,
            size: entry.transferSize,
            timestamp: Date.now()
        });
        
        // 保持最近100条记录
        const data = this.performanceData.get(resourceType);
        if (data.length > 100) {
            data.splice(0, data.length - 100);
        }
    }
    
    // 获取资源类型
    getResourceType(url) {
        const extension = url.split('.').pop().toLowerCase();
        
        for (const [type, config] of Object.entries(RESOURCE_CONFIG)) {
            if (config.extensions.some(ext => ext.slice(1) === extension)) {
                return type;
            }
        }
        
        return 'other';
    }
    
    // 发送性能数据
    async sendPerformanceData() {
        if (this.performanceData.size === 0) return;
        
        try {
            const data = {};
            this.performanceData.forEach((entries, type) => {
                if (entries.length > 0) {
                    data[type] = {
                        count: entries.length,
                        avgDuration: entries.reduce((sum, e) => sum + e.duration, 0) / entries.length,
                        avgSize: entries.reduce((sum, e) => sum + e.size, 0) / entries.length,
                        cdn: this.currentCDN.name,
                        region: this.userRegion
                    };
                }
            });
            
            // 发送到分析服务
            await fetch('/api/analytics/performance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    timestamp: Date.now(),
                    data
                })
            });
            
            // 清空已发送的数据
            this.performanceData.clear();
        } catch (error) {
            console.warn('发送性能数据失败:', error);
        }
    }
    
    // 切换CDN
    async switchCDN(cdnName) {
        const cdn = Object.values(CDN_CONFIG).find(c => c.name === cdnName);
        if (!cdn) {
            throw new Error(`未找到CDN: ${cdnName}`);
        }
        
        this.currentCDN = cdn;
        console.log(`切换到CDN: ${cdnName}`);
    }
    
    // 获取性能统计
    getPerformanceStats() {
        const stats = {};
        
        this.performanceData.forEach((entries, type) => {
            if (entries.length > 0) {
                const durations = entries.map(e => e.duration);
                const sizes = entries.map(e => e.size);
                
                stats[type] = {
                    count: entries.length,
                    avgDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
                    minDuration: Math.min(...durations),
                    maxDuration: Math.max(...durations),
                    avgSize: sizes.reduce((a, b) => a + b, 0) / sizes.length,
                    totalSize: sizes.reduce((a, b) => a + b, 0)
                };
            }
        });
        
        return {
            cdn: this.currentCDN?.name,
            region: this.userRegion,
            stats
        };
    }
}

// 图片懒加载
class LazyImageLoader {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                {
                    rootMargin: '50px 0px',
                    threshold: 0.01
                }
            );
            
            this.observeImages();
        } else {
            // 回退方案：立即加载所有图片
            this.loadAllImages();
        }
    }
    
    observeImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => this.observer.observe(img));
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;
        
        // 创建新图片对象预加载
        const newImg = new Image();
        newImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        };
        
        newImg.onerror = () => {
            img.classList.add('error');
            console.warn('图片加载失败:', src);
        };
        
        newImg.src = src;
    }
    
    loadAllImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => this.loadImage(img));
    }
    
    // 添加新图片到观察列表
    observe(img) {
        if (this.observer && img.dataset.src) {
            this.observer.observe(img);
        } else {
            this.loadImage(img);
        }
    }
}

// 资源预取
class ResourcePrefetcher {
    constructor() {
        this.prefetchedUrls = new Set();
    }
    
    // 预取资源
    prefetch(url, priority = 'low') {
        if (this.prefetchedUrls.has(url)) return;
        
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        
        if (priority === 'high') {
            link.rel = 'preload';
        }
        
        document.head.appendChild(link);
        this.prefetchedUrls.add(url);
    }
    
    // 预取页面
    prefetchPage(url) {
        this.prefetch(url, 'low');
    }
    
    // 预取关键资源
    prefetchCritical(urls) {
        urls.forEach(url => this.prefetch(url, 'high'));
    }
}

// 创建全局实例
const cdnManager = new CDNManager();
const lazyImageLoader = new LazyImageLoader();
const resourcePrefetcher = new ResourcePrefetcher();

// 导出
export {
    CDNManager,
    LazyImageLoader,
    ResourcePrefetcher,
    cdnManager,
    lazyImageLoader,
    resourcePrefetcher,
    CDN_CONFIG,
    RESOURCE_CONFIG
};

export default cdnManager;