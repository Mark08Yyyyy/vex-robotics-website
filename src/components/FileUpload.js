/**
 * 文件上传组件
 * 支持拖拽上传、预览、进度显示等功能
 */

import { uploadFile, validateFile, getOptimizedImageUrl } from '../utils/cloudStorage.js';

export class FileUpload {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            multiple: false,
            accept: 'image/*',
            maxSize: 10 * 1024 * 1024, // 10MB
            allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            folder: 'uploads',
            showPreview: true,
            showProgress: true,
            onUploadStart: null,
            onUploadProgress: null,
            onUploadComplete: null,
            onUploadError: null,
            ...options
        };
        
        this.files = [];
        this.uploadedFiles = [];
        
        this.init();
    }
    
    init() {
        this.createUploadArea();
        this.bindEvents();
    }
    
    createUploadArea() {
        this.container.innerHTML = `
            <div class="file-upload-area">
                <div class="upload-zone" id="upload-zone">
                    <div class="upload-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7,10 12,15 17,10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </div>
                    <div class="upload-text">
                        <p class="upload-title">点击上传或拖拽文件到此处</p>
                        <p class="upload-subtitle">支持 ${this.options.allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} 格式</p>
                        <p class="upload-size">最大文件大小: ${Math.round(this.options.maxSize / 1024 / 1024)}MB</p>
                    </div>
                    <input type="file" id="file-input" ${this.options.multiple ? 'multiple' : ''} accept="${this.options.accept}" style="display: none;">
                </div>
                
                <div class="file-list" id="file-list" style="display: none;"></div>
                
                <div class="upload-actions" id="upload-actions" style="display: none;">
                    <button class="btn btn-primary" id="upload-btn">开始上传</button>
                    <button class="btn btn-secondary" id="clear-btn">清空列表</button>
                </div>
            </div>
        `;
        
        this.addStyles();
    }
    
    addStyles() {
        if (document.getElementById('file-upload-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'file-upload-styles';
        styles.textContent = `
            .file-upload-area {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
            }
            
            .upload-zone {
                border: 2px dashed #d1d5db;
                border-radius: 12px;
                padding: 40px 20px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                background: #f9fafb;
            }
            
            .upload-zone:hover {
                border-color: #007AFF;
                background: #f0f9ff;
            }
            
            .upload-zone.dragover {
                border-color: #007AFF;
                background: #eff6ff;
                transform: scale(1.02);
            }
            
            .upload-icon {
                color: #6b7280;
                margin-bottom: 16px;
            }
            
            .upload-zone:hover .upload-icon {
                color: #007AFF;
            }
            
            .upload-title {
                font-size: 18px;
                font-weight: 600;
                color: #374151;
                margin-bottom: 8px;
            }
            
            .upload-subtitle {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 4px;
            }
            
            .upload-size {
                font-size: 12px;
                color: #9ca3af;
            }
            
            .file-list {
                margin-top: 20px;
            }
            
            .file-item {
                display: flex;
                align-items: center;
                padding: 12px;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                margin-bottom: 8px;
                background: white;
            }
            
            .file-preview {
                width: 48px;
                height: 48px;
                border-radius: 6px;
                object-fit: cover;
                margin-right: 12px;
                background: #f3f4f6;
            }
            
            .file-info {
                flex: 1;
            }
            
            .file-name {
                font-weight: 500;
                color: #374151;
                margin-bottom: 4px;
            }
            
            .file-size {
                font-size: 12px;
                color: #6b7280;
            }
            
            .file-progress {
                width: 100%;
                height: 4px;
                background: #e5e7eb;
                border-radius: 2px;
                margin-top: 8px;
                overflow: hidden;
            }
            
            .file-progress-bar {
                height: 100%;
                background: #007AFF;
                border-radius: 2px;
                transition: width 0.3s ease;
                width: 0%;
            }
            
            .file-status {
                font-size: 12px;
                margin-top: 4px;
            }
            
            .file-status.uploading {
                color: #007AFF;
            }
            
            .file-status.success {
                color: #10b981;
            }
            
            .file-status.error {
                color: #ef4444;
            }
            
            .file-remove {
                color: #ef4444;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            
            .file-remove:hover {
                background: #fee2e2;
            }
            
            .upload-actions {
                margin-top: 20px;
                display: flex;
                gap: 12px;
                justify-content: center;
            }
            
            .btn {
                padding: 10px 20px;
                border-radius: 8px;
                border: none;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .btn-primary {
                background: #007AFF;
                color: white;
            }
            
            .btn-primary:hover {
                background: #0056b3;
            }
            
            .btn-secondary {
                background: #6b7280;
                color: white;
            }
            
            .btn-secondary:hover {
                background: #4b5563;
            }
            
            .dark .upload-zone {
                background: #1f2937;
                border-color: #374151;
            }
            
            .dark .upload-zone:hover {
                background: #111827;
            }
            
            .dark .file-item {
                background: #1f2937;
                border-color: #374151;
            }
            
            .dark .upload-title {
                color: #f9fafb;
            }
            
            .dark .file-name {
                color: #f9fafb;
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    bindEvents() {
        const uploadZone = this.container.querySelector('#upload-zone');
        const fileInput = this.container.querySelector('#file-input');
        const uploadBtn = this.container.querySelector('#upload-btn');
        const clearBtn = this.container.querySelector('#clear-btn');
        
        // 点击上传区域
        uploadZone.addEventListener('click', () => {
            fileInput.click();
        });
        
        // 文件选择
        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
        
        // 拖拽事件
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });
        
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('dragover');
        });
        
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });
        
        // 上传按钮
        uploadBtn.addEventListener('click', () => {
            this.uploadFiles();
        });
        
        // 清空按钮
        clearBtn.addEventListener('click', () => {
            this.clearFiles();
        });
    }
    
    handleFiles(files) {
        const fileArray = Array.from(files);
        
        fileArray.forEach(file => {
            const validation = validateFile(file, {
                maxSize: this.options.maxSize,
                allowedTypes: this.options.allowedTypes
            });
            
            if (validation.valid) {
                this.files.push({
                    file,
                    id: Date.now() + Math.random(),
                    status: 'pending',
                    progress: 0
                });
            } else {
                alert(`文件 ${file.name} 验证失败:\n${validation.errors.join('\n')}`);
            }
        });
        
        this.renderFileList();
        this.showActions();
    }
    
    renderFileList() {
        const fileList = this.container.querySelector('#file-list');
        
        if (this.files.length === 0) {
            fileList.style.display = 'none';
            return;
        }
        
        fileList.style.display = 'block';
        fileList.innerHTML = this.files.map(fileItem => {
            const isImage = fileItem.file.type.startsWith('image/');
            const previewSrc = isImage ? URL.createObjectURL(fileItem.file) : '';
            
            return `
                <div class="file-item" data-id="${fileItem.id}">
                    ${isImage ? 
                        `<img src="${previewSrc}" alt="Preview" class="file-preview">` :
                        `<div class="file-preview" style="display: flex; align-items: center; justify-content: center; color: #6b7280;">📄</div>`
                    }
                    <div class="file-info">
                        <div class="file-name">${fileItem.file.name}</div>
                        <div class="file-size">${this.formatFileSize(fileItem.file.size)}</div>
                        ${this.options.showProgress ? `
                            <div class="file-progress">
                                <div class="file-progress-bar" style="width: ${fileItem.progress}%"></div>
                            </div>
                            <div class="file-status ${fileItem.status}">${this.getStatusText(fileItem.status)}</div>
                        ` : ''}
                    </div>
                    <div class="file-remove" onclick="fileUpload.removeFile('${fileItem.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </div>
            `;
        }).join('');
        
        // 设置全局引用以便删除文件
        window.fileUpload = this;
    }
    
    showActions() {
        const actions = this.container.querySelector('#upload-actions');
        actions.style.display = this.files.length > 0 ? 'flex' : 'none';
    }
    
    async uploadFiles() {
        const pendingFiles = this.files.filter(f => f.status === 'pending');
        
        if (pendingFiles.length === 0) {
            alert('没有待上传的文件');
            return;
        }
        
        for (const fileItem of pendingFiles) {
            try {
                fileItem.status = 'uploading';
                this.updateFileStatus(fileItem.id, 'uploading', 0);
                
                if (this.options.onUploadStart) {
                    this.options.onUploadStart(fileItem);
                }
                
                // 模拟上传进度
                const progressInterval = setInterval(() => {
                    if (fileItem.progress < 90) {
                        fileItem.progress += Math.random() * 20;
                        this.updateFileStatus(fileItem.id, 'uploading', fileItem.progress);
                        
                        if (this.options.onUploadProgress) {
                            this.options.onUploadProgress(fileItem, fileItem.progress);
                        }
                    }
                }, 200);
                
                const result = await uploadFile(fileItem.file, {
                    folder: this.options.folder,
                    tags: ['user-upload']
                });
                
                clearInterval(progressInterval);
                
                fileItem.status = 'success';
                fileItem.progress = 100;
                fileItem.result = result;
                
                this.uploadedFiles.push(fileItem);
                this.updateFileStatus(fileItem.id, 'success', 100);
                
                if (this.options.onUploadComplete) {
                    this.options.onUploadComplete(fileItem, result);
                }
                
            } catch (error) {
                fileItem.status = 'error';
                fileItem.error = error.message;
                this.updateFileStatus(fileItem.id, 'error', fileItem.progress);
                
                if (this.options.onUploadError) {
                    this.options.onUploadError(fileItem, error);
                }
            }
        }
    }
    
    updateFileStatus(fileId, status, progress) {
        const fileElement = this.container.querySelector(`[data-id="${fileId}"]`);
        if (!fileElement) return;
        
        const progressBar = fileElement.querySelector('.file-progress-bar');
        const statusElement = fileElement.querySelector('.file-status');
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        if (statusElement) {
            statusElement.className = `file-status ${status}`;
            statusElement.textContent = this.getStatusText(status);
        }
    }
    
    removeFile(fileId) {
        this.files = this.files.filter(f => f.id !== fileId);
        this.renderFileList();
        this.showActions();
    }
    
    clearFiles() {
        this.files = [];
        this.renderFileList();
        this.showActions();
    }
    
    getStatusText(status) {
        const statusMap = {
            pending: '等待上传',
            uploading: '上传中...',
            success: '上传成功',
            error: '上传失败'
        };
        return statusMap[status] || status;
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    getUploadedFiles() {
        return this.uploadedFiles;
    }
    
    reset() {
        this.files = [];
        this.uploadedFiles = [];
        this.renderFileList();
        this.showActions();
    }
}

export default FileUpload;