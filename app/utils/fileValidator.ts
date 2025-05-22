/**
 * 文件驗證工具函數
 */
import fs from 'fs';
import path from 'path';

/**
 * 檢查文件是否存在
 * @param filePath 文件路徑，相對於項目根目錄
 * @returns 是否存在
 */
export function fileExists(filePath: string): boolean {
  // 處理路徑前綴，確保從根目錄開始
  const normalizedPath = filePath.startsWith('/')
    ? path.join(process.cwd(), filePath)
    : path.join(process.cwd(), `/${filePath}`);

  return fs.existsSync(normalizedPath);
}

/**
 * 檢查圖片是否存在
 * @param imagePath 圖片路徑，相對於 public 目錄
 * @returns 檢查結果對象，包含是否有效及錯誤訊息
 */
export function validateImage(imagePath: string): {
  isValid: boolean;
  error?: string;
} {
  // 處理路徑前綴
  const normalizedPath = imagePath.startsWith('/')
    ? path.join(process.cwd(), 'public', imagePath)
    : path.join(process.cwd(), 'public', `/${imagePath}`);

  if (!fs.existsSync(normalizedPath)) {
    return {
      isValid: false,
      error: `圖片不存在: ${imagePath}`
    };
  }

  // 檢查副檔名是否為常見圖片格式
  const extension = path.extname(normalizedPath).toLowerCase();
  const validExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.svg',
    '.avif'
  ];

  if (!validExtensions.includes(extension)) {
    return {
      isValid: false,
      error: `無效的圖片格式: ${extension}`
    };
  }

  return { isValid: true };
}
