import { describe, it, expect } from 'vitest';
import {
  validateDate,
  isDateInPast,
  isDateInFuture,
  isValidDate
} from './dateValidator';

describe('日期驗證工具測試', () => {
  describe('isValidDate', () => {
    it('應該在有效日期格式時返回true', () => {
      expect(isValidDate('2024/05/22')).toBe(true);
      expect(isValidDate('1999/12/31')).toBe(true);
    });

    it('應該在格式無效時返回false', () => {
      expect(isValidDate('2024-05-22')).toBe(false); // 錯誤格式
      expect(isValidDate('2024/5/2')).toBe(false); // 格式錯誤：不滿兩位數
    });

    it('應該在日期無效時返回false', () => {
      expect(isValidDate('2024/02/30')).toBe(false); // 非存在日期
      expect(isValidDate('2024/13/01')).toBe(false); // 錯誤月份
    });
  });

  describe('validateDate', () => {
    it('應該驗證正確的日期格式', () => {
      expect(validateDate('2025/05/22').isValid).toBe(true);
      expect(validateDate('2025/01/01').isValid).toBe(true);
      expect(validateDate('2025/12/31').isValid).toBe(true);
    });

    it('應該拒絕錯誤的日期格式', () => {
      expect(validateDate('05/22/2025').isValid).toBe(false); // 美式日期
      expect(validateDate('2025-05-22').isValid).toBe(false); // 連字符號格式
      expect(validateDate('20250522').isValid).toBe(false); // 沒有分隔符
      expect(validateDate('2025.05.22').isValid).toBe(false); // 點分隔符
    });

    it('應該拒絕無效的日期值', () => {
      expect(validateDate('2025/00/22').isValid).toBe(false); // 無效月份
      expect(validateDate('2025/13/22').isValid).toBe(false); // 無效月份
      expect(validateDate('2025/05/00').isValid).toBe(false); // 無效日期
      expect(validateDate('2025/05/32').isValid).toBe(false); // 無效日期
      expect(validateDate('2025/02/30').isValid).toBe(false); // 二月無效日期
    });

    it('應該正確檢查閏年', () => {
      // 閏年 2/29 有效
      expect(validateDate('2024/02/29').isValid).toBe(true);
      // 非閏年 2/29 無效
      expect(validateDate('2025/02/29').isValid).toBe(false);
      // 世紀年非閏年
      expect(validateDate('2100/02/29').isValid).toBe(false);
      // 400倍數世紀年是閏年
      expect(validateDate('2000/02/29').isValid).toBe(true);
    });
  });

  describe('isDateInPast 和 isDateInFuture', () => {
    it('應該正確判斷過去日期', () => {
      // 假設現在是 2025/05/22
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}/${String(yesterday.getMonth() + 1).padStart(2, '0')}/${String(yesterday.getDate()).padStart(2, '0')}`;

      expect(isDateInPast(yesterdayStr)).toBe(true);
    });

    it('應該正確判斷未來日期', () => {
      // 假設現在是 2025/05/22
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowStr = `${tomorrow.getFullYear()}/${String(tomorrow.getMonth() + 1).padStart(2, '0')}/${String(tomorrow.getDate()).padStart(2, '0')}`;

      expect(isDateInFuture(tomorrowStr)).toBe(true);
    });
  });
});
