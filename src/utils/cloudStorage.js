/**
 * 云存储服务配置和工具函数
 * 支持 AWS S3 和 Cloudinary 两种云存储服务
 */

// 云存储配置
const CLOUD_CONFIG = {
    // AWS S3配置
    aws: {
        accessKeyId: 'your-access-key', // 在生产环境中应从环境变量获取
        secretAccessKey: 'your-secret-key', // 在生产环境中应从环境变量获取
        region: 'us-east-1',
        bucket: 'vex-robotics-files'
    },
    
    // Cloudinary配置
    cloudinary: {
        cloudName: 'your-cloud-name', // 在生产环境中应从环境变量获取
        apiKey: 'your-api-key', // 在生产环境中应从环境变量获取
        apiSecret: 'your-api-secret' // 在生产环境中应从环境变量获取
    },
    
    // 当前使用的服务
    provider: 'cloudinary'
};

/**
 * 文件上传到云存储
 * @param {File} file - 要上传的文件
 * @param {Object} options - 上传选项
 * @returns {Promise<Object>} 上传结果
 */
export async function uploadFile(file, options = {}) {
    const { folder = 'general', tags = [], transformation = {} } = options;
    
    try {
        if (CLOUD_CONFIG.provider === 'cloudinary') {
            return await uploadToCloudinary(file, { folder, tags, transformation });
        } else if (CLOUD_CONFIG.provider === 'aws') {
            return await uploadToS3(file, { folder });
        } else {
            throw new Error('未配置有效的云存储服务');
        }
    } catch (error) {
        console.error('文件上传失败:', error);
        throw error;
    }
}

/**
 * 上传到 Cloudinary
 * @param {File} file - 文件对象
 * @param {Object} options - 上传选项
 * @returns {Promise<Object>} 上传结果
 */
async function uploadToCloudinary(file, options) {
    const { folder, tags, transformation } = options;
    const formData = new FormData();
    
    formData.append('file', file);
    formData.append('upload_preset', CLOUD_CONFIG.cloudinary.uploadPreset);
    formData.append('folder', folder);
    
    if (tags.length > 0) {
        formData.append('tags', tags.join(','));
    }
    
    if (Object.keys(transformation).length > 0) {
        formData.append('transformation', JSON.stringify(transformation));
    }
    
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_CONFIG.cloudinary.cloudName}/auto/upload`,
        {
            method: 'POST',
            body: formData
        }
    );
    
    if (!response.ok) {
        throw new Error(`Cloudinary 上传失败: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        provider: 'cloudinary'
    };
}

/**
 * 上传到 AWS S3
 * @param {File} file - 文件对象
 * @param {Object} options - 上传选项
 * @returns {Promise<Object>} 上传结果
 */
async function uploadToS3(file, options) {
    const { folder } = options;
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    
    // 这里需要使用 AWS SDK 或者预签名 URL
    // 为了简化，这里提供一个基本的实现框架
    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', fileName);
    
    // 实际实现中需要获取预签名 URL 或使用 AWS SDK
    const uploadUrl = await getS3PresignedUrl(fileName, file.type);
    
    const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        }
    });
    
    if (!response.ok) {
        throw new Error(`S3 上传失败: ${response.statusText}`);
    }
    
    const url = `https://${CLOUD_CONFIG.aws.bucket}.s3.${CLOUD_CONFIG.aws.region}.amazonaws.com/${fileName}`;
    
    return {
        url,
        key: fileName,
        bucket: CLOUD_CONFIG.aws.bucket,
        provider: 'aws'
    };
}

/**
 * 获取 S3 预签名 URL（需要后端支持）
 * @param {string} fileName - 文件名
 * @param {string} contentType - 文件类型
 * @returns {Promise<string>} 预签名 URL
 */
async function getS3PresignedUrl(fileName, contentType) {
    // 这里需要调用后端 API 获取预签名 URL
    const response = await fetch('/api/s3/presigned-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fileName,
            contentType
        })
    });
    
    if (!response.ok) {
        throw new Error('获取预签名 URL 失败');
    }
    
    const { uploadUrl } = await response.json();
    return uploadUrl;
}

/**
 * 删除云存储文件
 * @param {string} publicId - 文件公共 ID 或 key
 * @returns {Promise<boolean>} 删除结果
 */
export async function deleteFile(publicId) {
    try {
        if (CLOUD_CONFIG.provider === 'cloudinary') {
            return await deleteFromCloudinary(publicId);
        } else if (CLOUD_CONFIG.provider === 'aws') {
            return await deleteFromS3(publicId);
        }
        return false;
    } catch (error) {
        console.error('文件删除失败:', error);
        return false;
    }
}

/**
 * 从 Cloudinary 删除文件
 * @param {string} publicId - 文件公共 ID
 * @returns {Promise<boolean>} 删除结果
 */
async function deleteFromCloudinary(publicId) {
    // 需要后端 API 支持，因为需要签名
    const response = await fetch('/api/cloudinary/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publicId })
    });
    
    return response.ok;
}

/**
 * 从 S3 删除文件
 * @param {string} key - 文件 key
 * @returns {Promise<boolean>} 删除结果
 */
async function deleteFromS3(key) {
    // 需要后端 API 支持
    const response = await fetch('/api/s3/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key })
    });
    
    return response.ok;
}

/**
 * 生成优化的图片 URL
 * @param {string} url - 原始图片 URL
 * @param {Object} options - 优化选项
 * @returns {string} 优化后的 URL
 */
export function getOptimizedImageUrl(url, options = {}) {
    const { width, height, quality = 'auto', format = 'auto' } = options;
    
    if (CLOUD_CONFIG.provider === 'cloudinary' && url.includes('cloudinary.com')) {
        const transformations = [];
        
        if (width) transformations.push(`w_${width}`);
        if (height) transformations.push(`h_${height}`);
        transformations.push(`q_${quality}`);
        transformations.push(`f_${format}`);
        
        const transformation = transformations.join(',');
        return url.replace('/upload/', `/upload/${transformation}/`);
    }
    
    return url;
}

/**
 * 验证文件类型和大小
 * @param {File} file - 文件对象
 * @param {Object} constraints - 约束条件
 * @returns {Object} 验证结果
 */
export function validateFile(file, constraints = {}) {
    const {
        maxSize = 10 * 1024 * 1024, // 10MB
        allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
    } = constraints;
    
    const errors = [];
    
    if (file.size > maxSize) {
        errors.push(`文件大小不能超过 ${Math.round(maxSize / 1024 / 1024)}MB`);
    }
    
    if (!allowedTypes.includes(file.type)) {
        errors.push(`不支持的文件类型: ${file.type}`);
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * 批量上传文件
 * @param {FileList} files - 文件列表
 * @param {Object} options - 上传选项
 * @returns {Promise<Array>} 上传结果数组
 */
export async function uploadMultipleFiles(files, options = {}) {
    const results = [];
    const { concurrency = 3 } = options;
    
    // 分批上传，避免并发过多
    for (let i = 0; i < files.length; i += concurrency) {
        const batch = Array.from(files).slice(i, i + concurrency);
        const batchPromises = batch.map(file => uploadFile(file, options));
        
        try {
            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);
        } catch (error) {
            console.error(`批次 ${Math.floor(i / concurrency) + 1} 上传失败:`, error);
            // 继续处理其他批次
        }
    }
    
    return results;
}

export default {
    uploadFile,
    deleteFile,
    getOptimizedImageUrl,
    validateFile,
    uploadMultipleFiles,
    config: CLOUD_CONFIG
};