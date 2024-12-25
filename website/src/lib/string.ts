import md5 from 'md5';
import { nanoid } from 'nanoid';

// 检查字符串是否是以某些字符开头,支持传入除外列表
// 如 startsWith('abc', ['a']) === true
// 但是 startsWith('abc', ['a'], ['ab']) === false
export function startsWithMulti(
  str: string,
  checkList: string[],
  excludeList: string[] = []
) {
  const inList = (list: string[]) => {
    return list.some((item) => {
      return str.startsWith(item);
    });
  };
  return inList(checkList) && !inList(excludeList);
}

// 获取随机字符串，可指定长度
export function getRandomString(length = 8) {
  return md5(Math.random().toString(36)).substring(0, length);
}

// 连字符转驼峰
export function hyphen2Camel(str: string) {
  const re = /-(\w)/g;
  return str.replace(re, (_$0, $1) => {
    return $1.toUpperCase();
  });
}

// 首字母改为大写
export function upperCaseFirst(str: string) {
  if (!str) {
    return '';
  }
  return str[0]!.toUpperCase() + str.slice(1, str.length);
}

// 字节加单位
export function bytesToSize(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024, // or 1024
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

// 仿windows重命名，如果有重复项，自动添加序号。ABC，ABC(1)，ABC(2)...
export function autoRenameWithIndex(newName: string, localNames: string[]) {
  const reg = /([\w\W]*)\((\d+)\)$/;
  const r1 = reg.exec(newName);
  const pureName1 = r1?.[1] || newName;
  let maxIndex = 0;
  localNames.forEach((t) => {
    const r2 = reg.exec(t);
    const pureName2 = r2?.[1] || t;
    let index2 = 0;
    if (pureName2 === pureName1) {
      index2 = Number(r2?.[2] || 0) + 1;
    }
    if (index2 > maxIndex) {
      maxIndex = index2;
    }
  });
  const index1 = maxIndex + 1;
  return index1 > 1 ? `${pureName1}(${index1 - 1})` : pureName1;
}

export function shortId() {
  return nanoid(6);
}

// 检查文本是否包含任何关键词
//
// @param text 要检查的文本
// @param keywords 关键词过滤器，每个关键词占一行
// @returns 如果文本包含任何关键词，则返回 true，否则返回 false
export function checkTextContainsKeywords(text: string, keywords: string) {
  const filters = keywords
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean);
  if (filters.length === 0) {
    return false;
  }
  return filters.some((t) => text.includes(t));
}

export function getFileExtension(fileName: string) {
  // 使用lastIndexOf() 获取最后一个"."的位置
  const dotIndex = fileName.lastIndexOf('.');

  // 如果没有找到"."，则返回空字符串
  if (dotIndex === -1) {
    return '';
  }

  // 从最后一个"."之后截取字符串
  return fileName.substring(dotIndex + 1);
}

export function checkIsImageUrl(url: string) {
  const checkList = [
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.bmp',
    '.webp',
    '.svg',
    '.ico',
    '.tiff',
    '.tif',
  ];
  return checkList.some((t) => url.endsWith(t));
}

// 将一个字符串以逗号分割，再随机取出一项
export function getRandomItemSplitByComma(str: string) {
  return str.split(',').sort(() => Math.random() - 0.5)[0];
}

/**
 * Fix relative links in the tag
 * @param src - The src attribute of the tag
 * @param pageUrl - The url of the page
 * @returns The fixed src attribute
 */
export function fixRelativeLinks(src: string, pageUrl: string) {
  const baseUrl = new URL(pageUrl).origin;
  if (src.startsWith('#')) {
    return new URL(src, pageUrl).href;
  }
  // Check if src is a valid URL
  try {
    new URL(src, baseUrl);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return src;
  }
  try {
    // Check if src is already an absolute path
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src; // src is already an absolute path, return as is
    }

    // Extract the base part of href and calculate the absolute path based on src and base
    return new URL(src, pageUrl).href;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return src;
  }
}
