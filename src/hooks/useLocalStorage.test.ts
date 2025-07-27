import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';
import { beforeEach, describe, expect, test } from 'vitest';

describe('useLocalStorage', () => {
  const key = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  test('возвращает defaultValue, если в localStorage ничего нет', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'));
    const [value] = result.current;
    expect(value).toBe('default');
  });

  test('берёт значение из localStorage, если оно есть', () => {
    localStorage.setItem(key, 'stored-value');
    const { result } = renderHook(() => useLocalStorage(key, 'default'));
    const [value] = result.current;
    expect(value).toBe('stored-value');
  });

  test('обновляет localStorage при изменении значения', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem(key)).toBe('new-value');
  });
  test('возвращает defaultValue, если getItem выбрасывает ошибку', () => {
    const key = 'broken-key';

    const originalGetItem = localStorage.getItem;
    localStorage.getItem = () => {
      throw new Error('getItem failed');
    };

    const { result } = renderHook(() => useLocalStorage(key, 'fallback'));
    const [value] = result.current;

    expect(value).toBe('fallback');

    localStorage.getItem = originalGetItem;
  });
});
