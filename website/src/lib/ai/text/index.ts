import { TextGenerateService } from './defines';
import { pollinationsaiTextGenerateService } from './pollinationsai';

export async function getTextGenerateService(): Promise<TextGenerateService> {
  return pollinationsaiTextGenerateService;
}
