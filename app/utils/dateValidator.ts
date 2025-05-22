/**
 * 日期格式驗證工具函數
 */
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// 載入自定義格式解析插件，以支持嚴格格式驗證
dayjs.extend(customParseFormat);

/**
 * 驗證日期字符串是否為有效的 yyyy/MM/dd 格式
 * @param dateString 需要驗證的日期字符串
 * @returns 是否為有效日期
 */
export function isValidDate(dateString: string): boolean {
  return dayjs(dateString, 'YYYY/MM/DD', true).isValid();
}

/**
 * 驗證日期是否符合 yyyy/MM/dd 格式
 * @param dateString 需要驗證的日期字符串
 * @returns 驗證結果對象，包含是否有效及錯誤訊息
 */
export function validateDate(dateString: string): {
  isValid: boolean;
  error?: string;
} {
  if (!dateString) {
    return {
      isValid: false,
      error: '日期不能為空'
    };
  }

  // 使用 isValidDate 函數檢查日期有效性
  const isValid = isValidDate(dateString);

  if (!isValid) {
    // 檢查格式問題
    if (!/^\d{4}\/\d{2}\/\d{2}$/.test(dateString)) {
      return {
        isValid: false,
        error: `日期格式不符合 yyyy/MM/dd: ${dateString}`
      };
    }

    // 如果格式正確但日期無效，返回一般錯誤
    return {
      isValid: false,
      error: `無效的日期: ${dateString}`
    };
  }

  return { isValid: true };
}

/**
 * 檢查日期是否在過去
 * @param dateString 格式為 yyyy/MM/dd 的日期字符串
 * @returns 是否在過去
 */
export function isDateInPast(dateString: string): boolean {
  if (!isValidDate(dateString)) return false;
  return dayjs(dateString, 'YYYY/MM/DD').isBefore(dayjs().startOf('day'));
}

/**
 * 檢查日期是否在未來
 * @param dateString 格式為 yyyy/MM/dd 的日期字符串
 * @returns 是否在未來
 */
export function isDateInFuture(dateString: string): boolean {
  if (!isValidDate(dateString)) return false;
  return dayjs(dateString, 'YYYY/MM/DD').isAfter(dayjs().startOf('day'));
}
